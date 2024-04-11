import axios from 'axios';
import { myCarts } from './cart';
import { renderUsedCoupon, renderCouponOption } from './render';
import { calculateDiscount } from './calculate';
import { userId } from '../../utils/config';
import { showAlertSwal, showToastSwal } from '../../utils/swal';
import { priceToNumber } from '../../utils/helper';
import { headers } from '../../utils/config';

let usedCouponData = [];

// 取得 使用優惠券input
const couponInput = document.querySelector('#coupon');
// 取得 使用優惠券按鈕
const useCouponBtn = document.querySelector('.js-useCouponBtn');

let myCoupons = [];
let cartCoupons = [];
const usedCouponInitObj = {
  myCouponId: '',
  originPrice: '',
  courseId: '',
  type: '',
  title: '',
  discount: 0,
  minSpending: '',
  discountCourseNum: '',
  discountPrice: 0,
};
function couponInit() {
  // 已使用 coupon 的id、標題和價格
  usedCouponData = Array.from(
    { length: myCarts.length + 1 },
    () => usedCouponInitObj
  );
}

// 防止 couponInput 按 enter 的預設行為，並使用優惠券
couponInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleToUseCoupon();
  }
});

// 按下使用優惠券按鈕
useCouponBtn.addEventListener('click', (e) => {
  e.preventDefault();
  handleToUseCoupon();
});

// 付款時把使用的優惠券 canUse 改成 false
async function patchMyCoupon() {
  try {
    // 各課程的優惠券欄位跑迴圈
    for (const item of usedCouponData) {
      // 該課程有用到優惠券才需要呼叫 api
      if (item.myCouponId) {
        const usedUrl = `${_url}/myCoupons/${item.myCouponId}`;
        const patchData = {
          canUse: false,
        };
        await axios.patch(usedUrl, patchData, headers);
      }
    }
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 取得 coupons
async function getCoupons() {
  try {
    // 取得 cartCoupons
    const userUrl = `${_url}/myCoupons?_expand=coupon&userId=${userId}&_sort=couponId&_order=asc`;
    const { data } = await axios.get(userUrl);

    myCoupons = data;

    // 確認有無過期
    checkDueDate();

    // console.log("cartCoupons", cartCoupons);
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 確認有無過期，過期的改為 canUse: false 不顯示
async function checkDueDate() {
  const expiredCoupons = [];
  // 標記過期優惠券
  myCoupons.forEach((coupon) => {
    let today = new Date().getTime();
    if (new Date(coupon.dueDate).getTime() < today) {
      coupon.canUse = false;
      expiredCoupons.push(coupon);
    }
  });

  // 如果有過期優惠券就發送 patch 請求
  if (expiredCoupons.length > 0) {
    await Promise.all(
      expiredCoupons.map(async (coupon) => {
        try {
          await axios.patch(
            `${_url}/myCoupons/${coupon.id}`,
            {
              canUse: false,
            },
            headers
          );
        } catch (error) {
          showAlertSwal('發生錯誤，請稍後再試');
        }
      })
    );
    // 移除過期的優惠券
    myCoupons = myCoupons.filter((coupon) => coupon.canUse === true);
  }
  // 將 coupon 整理成想要的格式、並取得要顯示的優惠券
  getCartCouponsData();
}

// 取得、更新購物車課程的優惠券資訊
function getCartCouponsData() {
  // 先清空之前的資料
  cartCoupons = [];
  // 篩選出任何課程都能使用的優惠券
  myCoupons.forEach((myCoupon) => {
    if (myCoupon.coupon.type === 'allCourse') {
      const {
        courseId,
        type,
        title,
        minSpending,
        discountCourseNum,
        discount,
      } = myCoupon.coupon;
      const obj = {
        myCouponId: myCoupon.id,
        originPrice: null,
        courseId,
        type,
        title,
        discount,
        minSpending,
        discountCourseNum,
      };
      cartCoupons.push(obj);
    }
  });
  // 篩選出在購物車的課程的優惠券
  myCarts.forEach((cart) => {
    myCoupons.forEach((myCoupon) => {
      if (
        myCoupon.coupon.type === 'course' &&
        cart.courseId == myCoupon.coupon.courseId
      ) {
        const {
          courseId,
          type,
          title,
          discount,
          minSpending,
          discountCourseNum,
        } = myCoupon.coupon;
        const originPrice = cart.course.price;
        if (courseId == cart.courseId) {
          const obj = {
            myCouponId: myCoupon.id,
            originPrice,
            courseId,
            type,
            title,
            discount,
            minSpending,
            discountCourseNum,
          };
          cartCoupons.push(obj);
        }
      }
    });
  });
  // 渲染優惠券選項
  renderCouponOption();
}

// 使用優惠券
function handleToUseCoupon() {
  // 取出輸入的優惠券資訊
  const chooseCoupon = cartCoupons.filter(
    (item) => item.title === couponInput.value
  )[0];
  // 有此優惠券並可使用
  if (chooseCoupon !== undefined) {
    // 取得總金額(已去掉 , )
    const originalTotalPrice = priceToNumber(
      document.querySelector('#OriginalPrice').textContent
    );
    // 購物商品的 li
    const listItem = document.querySelectorAll('li[data-course]');
    // 輸入的優惠券資訊：折扣、低銷、折抵課堂數
    const { minSpending, discountCourseNum, courseId } = chooseCoupon;

    showToastSwal('已使用優惠券');

    // 判斷是否符合條件-低消
    if (minSpending <= originalTotalPrice) {
      //  若是指定課程優惠券
      if (chooseCoupon.type === 'course') {
        listItem.forEach((li, cartIndex) => {
          const cartCourseId = li.dataset.course;

          // 找到指定課程優惠券是哪個欄位的
          if (courseId == cartCourseId) {
            // 要購買的課程數量
            const courseNum = li.querySelector("input[name='count']");
            // 判斷是否符合條件-購買課程數量
            if (
              discountCourseNum === null ||
              Number(discountCourseNum) <= Number(courseNum.value)
            ) {
              // 若該課程還沒使用優惠券 -> 代表可以用優惠券
              if (usedCouponData[cartIndex].myCouponId == '') {
                //將輸入優惠券的 input 清空
                couponInput.value = '';
                // 紀錄已使用的優惠券資訊
                updateUsedCoupon(cartIndex, chooseCoupon);
              } else {
                showAlertSwal('每個課程只能使用一張優惠券', '');
              }
            } else {
              showAlertSwal(
                '未符合使用條件',
                `須購買指定課程達 ${discountCourseNum} 堂課`
              );
            }
          }
        });
      }
      // 若用全課程都能使用的優惠券
      else {
        const lastIndex = usedCouponData.length - 1;
        // 若該課程還沒使用優惠券 -> 代表可以用優惠券
        if (usedCouponData[lastIndex].myCouponId == '') {
          //將輸入優惠券的 input 清空
          couponInput.value = '';
          // 紀錄已使用的優惠券資訊
          updateUsedCoupon(lastIndex, chooseCoupon);
        } else {
          showAlertSwal('每個課程只能使用一張優惠券', '');
        }
      }
    } else {
      showAlertSwal(
        '未符合使用條件',
        `折價前的消費總額須達 NT$ ${minSpending}`
      );
    }
  } else {
    showAlertSwal('沒有匹配的優惠券', '');
  }
}

function handleCouponDelBtn(index) {
  clearUsedCoupon(index);
  renderUsedCoupon();
  calculateDiscount();
}

// 重新確認優惠券資格
function reCheckCoupon(cartCourseId, quantity) {
  // 取得總金額(已去掉 , )
  const originalTotalPrice = priceToNumber(
    document.querySelector('#OriginalPrice').textContent
  );

  usedCouponData.forEach((coupon, index) => {
    // 使用的優惠券資訊：折扣、低銷、折抵課堂數
    const { minSpending, discountCourseNum, courseId, myCouponId } = coupon;
    // 判斷是否符合條件-低消
    if (minSpending <= originalTotalPrice) {
      // 若是有使用指定課程優惠券，就找到欄位
      if (courseId == cartCourseId) {
        // 判斷是否符合條件 - 購買課程數量;
        if (discountCourseNum === null || discountCourseNum <= quantity) {
          // 更新特定課程優惠券的折價
          // updateUsedCoupon(index, coupon);
          coupon.discountPrice = calculateDiscountPrice(coupon);
        } else {
          clearUsedCoupon(index);
        }
      }
      // 若是有使用全課程優惠券
      else if (index == usedCouponData.length - 1 && myCouponId !== '') {
        // 更新全優惠券的折價
        coupon.discountPrice = calculateDiscountPrice(coupon);
      }
    } else {
      clearUsedCoupon(index);
    }
  });
  renderUsedCoupon();
}

// 將該欄位的優惠券資訊清空
function clearUsedCoupon(index) {
  usedCouponData[index] = {
    myCouponId: '',
    originPrice: 0,
    courseId: '',
    type: '',
    title: '',
    discount: '',
    minSpending: 0, // 總消費低消
    discountCourseNum: 0, // 最低購買量
    discountPrice: 0,
  };
}

// 寫入使用優惠券資訊
function updateUsedCoupon(index, coupon) {
  usedCouponData[index] = {
    ...coupon,
    discountPrice: calculateDiscountPrice(coupon),
  };
  renderUsedCoupon();
  calculateDiscount();
}

// 使用優惠券的折抵金額計算
function calculateDiscountPrice(coupon) {
  const { type, discount } = coupon;
  // 使用指定課程優惠券的折價
  if (type === 'course') {
    const { originPrice, discountCourseNum } = coupon;
    return Math.round(
      Number(originPrice) * (1 - Number(discount)) * Number(discountCourseNum)
    );
  }
  // 使用全部課程優惠券的折價
  else {
    // 取得總金額(已去掉 , )
    const originPrice = priceToNumber(
      document.querySelector('#OriginalPrice').textContent
    );
    return Math.round(originPrice * (1 - Number(discount)));
  }
}

// 刪除購買項目課程時將優惠券欄位刪除
function delUsedCoupon(courseId) {
  // 刪除使用的優惠券
  usedCouponData = usedCouponData.filter(
    (coupon) => coupon.courseId != courseId
  );
}

export {
  couponInit,
  getCartCouponsData,
  getCoupons,
  delUsedCoupon,
  patchMyCoupon,
  useCouponBtn,
  reCheckCoupon,
  usedCouponData,
  handleCouponDelBtn,
  cartCoupons,
};
