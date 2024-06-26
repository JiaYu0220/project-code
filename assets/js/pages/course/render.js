import { currentPageCourses, isLoading, data, lastPage } from './api.js';
import { pagination } from './pagination.js';
import { handleClickStartCourseBtn } from './startCourse.js';
import { userId, isLogin, currentURL } from '../../utils/config.js';
import { handleLoginModal } from '../layout/header.js';
import {
  showConfirmSwal,
  showAlertSwal,
  showToastSwal,
} from '../../utils/swal';
import axios from 'axios';

const courseList = document.querySelector('#courseList');
const newURL = currentURL.replace('course', 'course_intro');

// 點擊 開始上課 -> 加入購物車、優惠券
if (courseList) {
  handleClickStartCourseBtn(courseList);
}

function inputDisable() {
  const inputs = document.querySelectorAll('input');
  if (isLoading) {
    inputs.forEach((input) => {
      input.disabled = true;
    });
  } else {
    inputs.forEach((input) => {
      input.disabled = false;
    });
  }
}

// let followBtns;
/*** 渲染課程 ***/
function renderCourses() {
  getFollowList();

  let courseHtml = '';
  /* loading動畫 */
  isLoading
    ? (courseHtml += `
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `)
    : currentPageCourses.length !== 0
    ? /* 卡片渲染 */
      currentPageCourses.forEach(async (item) => {
        courseHtml += `
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn ${
                    followList.includes(item.id) ? 'following' : 'not-follow'
                  }"
                  data-bs-target="#loginModal"
                  ${isLogin ? '' : 'data-bs-toggle="modal"'}
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold ${
                      followList.includes(item.id) ? 'fw-bold' : ''
                    }" data-buttonId="${item.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${item.teacher?.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${item.teacher?.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${item.teacher?.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" />
                    <span class="fw-bold me-1"> ${item.teacher?.rate} </span>
                    講師評等
                  </li>
                  <li>${item.teacher?.total_students} 位學生</li>
                  <li>${item.teacher?.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${
                      item.teacher?.links_codepen
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${
                      item.teacher?.links_github
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${
                      item.teacher?.links_linkedin
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-codepen"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!--  課程區塊 -->
              <div class="flex-grow-1">
                <!-- 課程名稱 -->
                <h3 class="card-title fs-6 fs-sm-4 ">
                  ${item.name}
                </h3>
                <!-- 優質標籤 -->
                ${
                  Array.isArray(item.badges) // 防止 item.badges 是空值而出錯
                    ? `<ul class="d-flex gap-2 mb-2">
                  ${item.badges
                    .map(
                      (badge) =>
                        `<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${badge}</li>`
                    )
                    .join('')}</ul>`
                    : ''
                }
  
                <!-- 課程tag -->
                ${
                  Array.isArray(item.tags)
                    ? `<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${item.tags
                    .map(
                      (tag) =>
                        `<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${tag}
                  </li>`
                    )
                    .join('')}
                </ul>`
                    : ''
                }
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />
                    <span class="fw-bold fs-sm fs-md-7 ms-1">${item.rate}</span>
                    ・
                    <span class="fs-sm fs-md-7 me-2">${
                      item.commentNum
                    } 個評論</span>
                  </a>
                  <p class="text-gray-300">| ${item.level}</p>
                </div>
                <!-- 課程介紹 -->
                <p
                  class="fs-sm fs-sm-7 fs-md-6 text-justify truncate-lines-2 truncate-md-lines-4"
                >${item.info}
                </p>
                <hr />
                <!-- 課程篩選tag -->
                <div>
                  <h4
                    class="text-secondary2 fs-7 fs-sm-6 fs-md-5 mb-2 mb-sm-3"
                  >
                    你可以跟我學
                  </h4>
                  ${
                    Array.isArray(item.categories)
                      ? `
                    <ul class="d-flex flex-wrap gap-1 gap-md-2 mb-0">
                      ${item.categories
                        .map(
                          (category) => `
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${category}
                            </span>
                          </li>`
                        )
                        .join('')}
                    </ul>`
                      : ''
                  }
                </div>
                <hr />
                <!-- 收合內容 -->
                <div class="collapse" id="collapseCourse${item.id}">
                  <!-- 你將獲得 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      你將獲得
                    </h4>
                    ${
                      Array.isArray(item.mainPoints)
                        ? `<ul>
                          ${item.mainPoints
                            .map(
                              (mainPoint) => `
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${mainPoint}
                        </li>`
                            )
                            .join('')}`
                        : ''
                    }
                    </ul>
  
                  </div>
                  <hr />
                  <!-- 評價 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      精選評價
                    </h4>
                    <p
                      class="fs-sm fs-sm-7 fs-md-6 text-justify mb-1 mb-md-2"
                    >
                     ${item.comment?.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px rounded-circle"
                        src="${item.comment?.user?.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${
                          item.comment?.user?.name
                        }</p>
                        <p>${new Date(item.comment?.date).toLocaleDateString(
                          'en-CA'
                        )}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <!-- 瀏覽更多 -->
                <button
                  class="btn btn-gray fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4 float-end readMore"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourse${item.id}"
                  aria-expanded="false"
                  aria-controls="collapseCourse${item.id}"
                ></button>
              </div>
            </div>
            <!--  按鈕區塊 -->
            <div
              class="card-footer card-md-horizontal min-w-lg-250px w-lg-250px min-w-md-200px w-md-200px gap-2 gap-sm-6 p-4 p-md-8"
            >
              <!-- 價格 -->
              <div
                class="d-flex justify-content-center flex-md-column flex-lg-row gap-2 gap-sm-4"
              >
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${item.price * (0.5).toLocaleString()}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${item.price.toLocaleString()}
                  </span>
                  <br />${item.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${item.id}"
                data-bs-target="#loginModal"
                ${isLogin ? '' : 'data-bs-toggle="modal"'}
              >
                立即上課
              </button>
              <a
                href="${newURL}?courseId=${item.id}"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `;
      })
    : (courseHtml += `
      <div class="d-flex flex-column justify-content-center text-center h-100 px-10">
        <p class="fs-3 mb-4">沒有符合條件的課程</p>
        <p class="fs-6">
          看起來目前沒有符合您需求的課程，請嘗試修改您的搜尋詞彙或篩選條件。
        </p>
      </div>`);
  courseList.innerHTML = courseHtml;

  let followBtns = document.querySelectorAll('.follow-btn');
  followBtns.forEach((followBtn) => {
    followBtn.addEventListener('click', function () {
      if (followBtns && isLogin) {
        if (followBtn.classList.contains('following')) {
          toggleFollowCourse(followBtn, true);
        } else {
          toggleFollowCourse(followBtn, false);
        }
      } else {
        handleLoginModal();
      }
    });
  });
}

/*** 渲染 Pagination ***/
function renderPagination() {
  /* 頁數 */
  const pageNum = [...Array(lastPage)].map((_, index) => {
    return `<li class="page-item ${
      data.page === index + 1 ? 'active' : ''
    }" aria-current="page">
  <a class="page-link" href="#" data-page="${index + 1}">${index + 1}</a>
</li>`;
  });

  /* 上一頁 */
  const pagePrev = `<li class="page-item ${data.page === 1 ? 'disabled' : ''} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`;

  /* 下一頁 */
  const pageNext = `<li class="page-item ${
    data.page === lastPage ? 'disabled' : ''
  }">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;

  pagination.innerHTML = pagePrev + pageNum.join('') + pageNext;
}

// 收藏
let followList = [];

async function getFollowList() {
  if (isLogin) {
    let res = await axios.get(`${_url}/users/${userId}`);
    followList = res.data.followList;
  }
}

// 收藏/取消收藏
function toggleFollowCourse(followBtn, following) {
  let heartEl = followBtn.querySelector('i.fa-regular.fa-heart');
  let buttonId = Number(heartEl.dataset.buttonid);
  showConfirmSwal(
    following ? '確定要取消收藏課程?' : '確定要收藏課程?',
    '',
    following ? '取消收藏' : '確認',
    following ? '我再想想' : '取消'
  )
    .then(async (result) => {
      if (result.isConfirmed) {
        showToastSwal(
          following ? '已取消收藏' : '成功收藏',
          following ? '' : '可至會員中心「我的收藏」中查看'
        );

        followBtn.classList.toggle('not-follow');
        followBtn.classList.toggle('following');
        heartEl.classList.toggle('fw-bold');

        if (following) {
          let editfollowList = followList.filter((item) => item != buttonId);
          axios
            .patch(`${_url}/users/${userId}`, {
              followList: editfollowList,
            })
            .catch((err) => {
              showAlertSwal('發生錯誤，請稍後再試');
            });
        } else {
          // 確定收藏
          followList.push(buttonId);

          await axios.patch(`${_url}/users/${userId}`, { followList });
        }
      }
    })
    .catch((err) => {
      showAlertSwal('發生錯誤，請稍後再試');
    });
}

export { inputDisable, renderCourses, renderPagination };
