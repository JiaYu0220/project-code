import axios from 'axios';
import { getCartLength, renderCartNum } from '../layout/header';
import {
  renderCart,
  renderLoading,
  renderNextPurchaseCart,
  renderUsedCoupon,
} from './render';
import {
  couponInit,
  getCoupons,
  delUsedCoupon,
  reCheckCoupon,
  handleCouponDelBtn,
  getCartCouponsData,
} from './coupon';
import { calculatePriceAndDiscount, calculatePrice } from './calculate';
import {
  showConfirmSwal,
  showAlertSwal,
  showToastSwal,
} from '../../utils/swal';
import { priceToNumber } from '../../utils/helper';
import { userId, headers } from '../../utils/config';

const purchaseTabContent = document.querySelector('#purchaseTabContent');
const cartContainer = document.querySelector('#mainPurchase');
let myCarts = [];
let nextPurchaseCarts = [];

/***** 初始化、取資料 *****/

init();
async function init() {
  renderLoading(); // 渲染loading
  await getMyCart(); // 取得我的購物車資料
  renderCart();
  if (myCarts.length) {
    calculatePrice();
    couponInit();
    getCoupons();
  }
  renderNextPurchaseCart();
}

// 取得購買項目和下次購買的課程
async function getMyCart() {
  try {
    // 取得課程
    const api = `${_url}/myCarts?userId=${userId}&status=purchase&_expand=course`;
    const { data } = await axios.get(api);
    if (data !== undefined) {
      // 取得各課程的老師資料
      const courseUrls = data.map(
        (item) => `${_url}/courses/${item.courseId}?_expand=teacher`
      );

      const responses = await Promise.all(
        courseUrls.map((courseUrl) => axios.get(courseUrl))
      );

      data.forEach((item, index) => {
        item.course = responses[index].data;
      });
      handleData(data);
    }
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

function handleData(data) {
  // 到期日(一年後)的 23:59:59 過期
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 365);
  dueDate.setHours(23, 59, 59, 999);
  const formattedDueDate = dueDate.toLocaleDateString('en-CA');
  data.forEach((item) => {
    item.dueDate = formattedDueDate;
  });

  // 購買項目
  myCarts = data.filter((item) => !item.isNextPurchase);
  // 下次再買項目
  nextPurchaseCarts = data.filter((item) => item.isNextPurchase);
}

// 購物車卡片的按鈕監聽
purchaseTabContent.addEventListener('click', (e) => {
  const target = e.target;
  const listItem = target.closest('li');

  const actions = {
    'delete-order': deleteOrder, // 刪除按鈕
    'js-nextPurchaseBtn': nextPurchaseOrder, // 下次再買按鈕
    'js-mainPurchaseBtn': mainPurchaseOrder, // 移至購買項目按鈕
    'js-increment': incrementValue, // 增加數量按鈕
    'js-decrement': decrementValue, // 減少數量按鈕
    'js-delCoupon': handleCouponDelBtn, // 清除使用的優惠券按鈕
  };
  // 課程卡片
  if (listItem) {
    const actionKey = Array.from(target.classList).find(
      (classList) => actions[classList]
    );

    if (actionKey) {
      e.preventDefault();
      const action = actions[actionKey];

      if (actionKey === 'js-delCoupon') {
        action(target.dataset.index);
      } else {
        const courseId = listItem.dataset.course;
        const countInput = listItem.querySelector("input[name='count']");
        action(courseId, countInput);
      }
    }
  }
  // 全站優惠券
  else if (target.classList.contains('js-delCoupon')) {
    handleCouponDelBtn(target.dataset.index);
  }
});

/*** 刪除 ***/

// 刪除購物車內的課程
async function deleteOrder(courseId) {
  const res = await showConfirmSwal('確定要刪除嗎?');
  if (res.isConfirmed) {
    showToastSwal('已刪除課程');
    deleteCart(courseId); // 刪除購物車資料
    delUsedCoupon(courseId); // 刪除使用的優惠券資料
    couponInit(); // 清除所有使用的優惠券
    renderUsedCoupon();
    calculatePriceAndDiscount(); // 計算總額
  }
}

// 刪除購物車課程
async function deleteCart(id) {
  try {
    let myCartId;
    myCarts = myCarts.filter((item) => {
      if (item.courseId == id) {
        myCartId = item.id;
      }
      return item.courseId != id;
    });
    nextPurchaseCarts = nextPurchaseCarts.filter((item) => {
      if (item.courseId == id) {
        myCartId = item.id;
      }
      return item.courseId != id;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    // coupons 的 id 1 和 2 也會一起被刪掉，不知道為什麼，所以先改成用 patch
    // await axios.patch(
    //   `${_url}/myCarts/${myCartId}`,
    //   { userId: "", courseId: "", quantity: "" },
    //   headers
    // );
    await axios.delete(`${_url}/myCarts/${myCartId}`);
  } catch (error) {
    if (
      !error.response.data.includes(
        "TypeError: Cannot read property 'toString' of null"
      )
    ) {
      showAlertSwal('發生錯誤，請稍後再試');
    }
    // coupons 的 id 1 和 2 的 courseId 和 teacherId 改成 null，json-server 要把他們一起刪掉時會報錯，就不會被一起刪掉，只有購物車項目會被刪
  }
}

/*** 移至 下次再買 或 購買清單 ***/

// 移至下次再買 功能
async function nextPurchaseOrder(courseId) {
  const res = await showConfirmSwal('確定要下次再買該課程嗎?');
  if (res.isConfirmed) {
    showToastSwal('已移至下次再買');
    toNextPurchase(courseId); // 將課程移置 下次再買
    delUsedCoupon(courseId); // 刪除使用的優惠券資料
    couponInit(); // 清除所有使用的優惠券
    renderUsedCoupon();
    calculatePriceAndDiscount(); // 計算總額
  }
}

// 購買項目 移至 下次購買
async function toNextPurchase(courseId) {
  try {
    let myCartId;
    // 移除購買項目
    myCarts = myCarts.filter((item) => {
      if (item.courseId == courseId) {
        myCartId = item.id; // 取得 id
        nextPurchaseCarts.push(item); // 加進下次再買項目
      }
      return item.courseId != courseId;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { isNextPurchase: true },
      headers
    );
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 移至 購買項目 功能
async function mainPurchaseOrder(courseId) {
  const res = await showConfirmSwal('確定將該課程移至購物車嗎?');
  if (res.isConfirmed) {
    showToastSwal('已移置購買項目');
    toMainPurchase(courseId); // 將課程移置 購買項目
    couponInit(); // 清除所有使用的優惠券
    renderUsedCoupon();
    calculatePriceAndDiscount(); // 計算總額
  }
}

// 下次購買 移至 購買項目
async function toMainPurchase(courseId) {
  try {
    let myCartId;
    // 移除下次再買項目
    nextPurchaseCarts = nextPurchaseCarts.filter((item) => {
      if (item.courseId == courseId) {
        myCartId = item.id;
        // 加進購買項目
        myCarts.push(item);
      }
      return item.courseId != courseId;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { isNextPurchase: false },
      headers
    );
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 依據購物車商品數量來進行渲染購買項目和下次再買項目
async function checkAndRenderMyCart() {
  renderCart(); // 渲染購買項目
  if (myCarts.length) {
    getCartCouponsData(); // 取得課程優惠券、渲染優惠券選項
  }
  renderNextPurchaseCart(); // 渲染下次購買

  // 渲染navbar 購物車數量顯示
  await getCartLength();
  renderCartNum();
}

/*** 購買課程數量 ***/

// 增加數字輸入的值
function incrementValue(courseId, input) {
  input.value = input.value * 1 + 1;
  // 更新數量、重新確認優惠券資格、計算總額
  quantityChange(courseId, input.value);
}

// 減少數字輸入的值
function decrementValue(courseId, input) {
  if (parseInt(input.value) === 1) {
    deleteOrder(courseId);
  } else {
    input.value = input.value * 1 - 1;
    // 更新數量、重新確認優惠券資格、計算總額
    quantityChange(courseId, input.value);
  }
}

// 直接更改數量 "change" 和 "按 enter" 都會觸發
document.addEventListener('change', (e) => {
  if (e.target.name === 'count') {
    handleQuantityInputChange(e.target);
  }
});
document.addEventListener('keydown', (e) => {
  if (e.target.name === 'count' && e.key === 'Enter') {
    e.preventDefault();
    handleQuantityInputChange(e.target);
  }
});

// 直接更改數量
function handleQuantityInputChange(target) {
  const courseId = target.closest('[data-course]').dataset.course;

  // 若是輸入非數字或為0，就變成預設的值，不然就是照輸入的值
  if (target.value.match(/[^0-9]|^0$/g)) {
    target.value = target.defaultValue;
  }
  // 變更數量、重新確認優惠券資格、計算總額
  quantityChange(courseId, target.value);
}

// 變更數量、重新確認優惠券資格、計算總額
function quantityChange(courseId, quantity) {
  updateQuantity(courseId, quantity);
  reCheckCoupon(courseId, quantity); // 重新確認優惠券資格
  calculatePriceAndDiscount();
}

// 更新課程購買數量
function updateQuantity(courseId, quantity) {
  let myCartId;
  myCarts.forEach((cart) => {
    if (cart.courseId == courseId) {
      myCartId = cart.id; // 取得 id
      cart.quantity = quantity; // 更新數量
    }
  });
  // 更新遠端數量
  patchQuantity(myCartId, quantity);
}

// 更新遠端數量
async function patchQuantity(id, quantity) {
  try {
    const api = `${_url}/myCarts/${id}`;
    const patchData = { quantity };
    await axios.patch(api, patchData, headers);
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

export { myCarts, cartContainer, nextPurchaseCarts, headers };
