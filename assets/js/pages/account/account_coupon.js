import { userId } from '../../utils/config';
import { showAlertSwal } from '../../utils/swal';
import axios from 'axios';

const couponPageArrow = document.querySelectorAll('.js-couponPageArrow');

let myCoupons = [];
let couponCurrentPage = 1;
let couponLastPage;
getCoupons();

// 確認有無過期，過期的改為 canUse: false 不顯示
async function checkDueDate() {
  let today = new Date().getTime();
  for (const coupon of myCoupons) {
    if (new Date(coupon.dueDate).getTime() < today) {
      try {
        await axios.patch(
          `${_url}/myCoupons/${coupon.id}`,
          {
            canUse: false,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        getCoupons();
      } catch (error) {
        showAlertSwal('發生錯誤，請稍後再試');
      }
    } else {
      renderCoupons();
      renderCouponPagination();
    }
  }
}
// 取得 coupons
async function getCoupons() {
  try {
    const couponUrl = `${_url}/myCoupons?_expand=coupon&canUse=true&userId=${userId}&_page=${couponCurrentPage}&_limit=6_sort=dueDate&_order=asc`;
    const res = await axios.get(couponUrl);
    if (res.data.length) {
      // 展開老師資料
      const couponUrls = res.data.map((myCoupon) =>
        myCoupon.coupon.teacherId === null
          ? `${_url}/coupons/${myCoupon.couponId}`
          : `${_url}/coupons/${myCoupon.couponId}?_expand=teacher`
      );
      const responses = await Promise.all(
        couponUrls.map((couponUrl) => axios.get(couponUrl))
      );
      res.data.forEach((item, index) => {
        item.coupon = responses[index].data;
      });

      myCoupons = res.data;

      // 計算頁數
      const myCouponsNum = parseInt(res.headers.get('X-Total-Count'));
      couponLastPage = Math.ceil(myCouponsNum / 6);
      checkDueDate();
    } else {
      renderCoupons();
    }
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

//渲染 Coupons
function renderCoupons() {
  // 選取 優惠券ul
  const couponGroup = document.querySelector('.js-couponGroup');

  let couponListHtml = '';
  myCoupons.length
    ? myCoupons.forEach((myCoupon) => {
        couponListHtml += `
            <li class="col drop-shadow">
              <div class="card border-x-wave h-100">
                <div class="row g-0 h-100">
                  <div class="col-3 d-flex align-items-center p-4 ${
                    myCoupon.coupon.type === 'allCourse'
                      ? 'bg-primary'
                      : 'bg-gray-300'
                  }">
                  <img
                    class="img-fluid w-100 rounded-circle img-thumbnail border-0"
                    src="${
                      myCoupon.coupon.type === 'allCourse'
                        ? 'https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/logo-img.svg'
                        : myCoupon.coupon.teacher.avatar
                    }"
                    alt="teacher"
                  />
                  </div>
                  <div class="col-6">
                    <div class="card-body h-100 d-flex flex-column">
                      <h5 class="card-title fs-7 fs-sm-5 mb-2 mb-sm-4 truncate-lines-2">
                        ${myCoupon.coupon.title}
                      </h5>
                      <p class="card-text fs-sm fs-sm-7 mb-3 flex-grow-1">
                        ${myCoupon.coupon.info}
                      </p>
                      <p class="card-text">
                        <small
                          class="text-body-secondary d-flex align-items-center gap-1">
                          <span class="material-symbols-outlined">
                            update </span>
                          <time datetime="${new Date(
                            myCoupon.dueDate
                          ).toLocaleDateString('en-CA')}">${new Date(
          myCoupon.dueDate
        ).toLocaleDateString('en-CA')}</time>
                          失效
                        </small>
                      </p>
                    </div>
                  </div>
                  <div class="col-3 d-flex align-items-center pe-4">
                    <a
                      href="${
                        myCoupon.coupon.type === 'allCourse'
                          ? 'course.html'
                          : `course_intro.html?courseId=${myCoupon.coupon.courseId}`
                      }"
                      class="btn btn-secondary2 px-1 px-sm-4 w-100"
                      >${
                        myCoupon.coupon.type === 'allCourse'
                          ? '立即選購'
                          : '課程介紹'
                      }</a
                    >
                  </div>
                </div>
              </div>
            </li>`;
      })
    : (couponListHtml += `<p class="text-center fs-5">目前沒有優惠券<p>`);

  couponGroup.innerHTML = couponListHtml;
}

// 渲染 Coupons 分頁
function renderCouponPagination() {
  couponPageArrow.forEach((arrow, index, arrowGroup) => {
    // 要有分頁
    if (couponLastPage > 1) {
      arrow.classList.remove('d-none');

      // 幫上一頁、下一頁加 disabled
      if (couponCurrentPage === 1) {
        arrowGroup[0].classList.add('disabled');
      } else {
        arrowGroup[0].classList.remove('disabled');
      }
      if (couponCurrentPage === couponLastPage) {
        arrowGroup[1].classList.add('disabled');
      } else {
        arrowGroup[1].classList.remove('disabled');
      }
    } else {
      // coupons 太少不需要分頁
      arrow.classList.add('d-none');
    }
  });
}
// 上一頁、下一頁點擊事件
couponPageArrow.forEach((arrow, index) => {
  arrow.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('.js-couponPageArrow');
    if (!target.classList.contains('disabled')) {
      index === 1 ? couponCurrentPage++ : Math.max(1, couponCurrentPage--);

      getCoupons();
    }
  });
});

export { getCoupons, renderCoupons };
