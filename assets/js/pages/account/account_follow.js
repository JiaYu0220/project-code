import { userId, isLogin, currentURL } from '../../utils/config';
import { handleClickStartCourseBtn } from '../course/startCourse';
import { showAlertSwal } from '../../utils/swal';

import axios from 'axios';

// 我的收藏

let pageId = 1;
let followArray = [];
let followTotalPages = 0;
let courseData = [];
const regex = /\/[^/]+\.html/;
// 修改連結網址
const newURL = regex.test(currentURL)
  ? currentURL.replace(regex, '/course_intro.html')
  : currentURL + 'course_intro.html';

// 收藏列表容器
const followList = document.querySelector('#followList');

// 點擊 開始上課 -> 加入購物車、優惠券
if (followList) {
  handleClickStartCourseBtn(followList);
}

document.addEventListener('DOMContentLoaded', async function () {
  // 取得收藏列表 + 課程資料
  async function fetchData() {
    try {
      // 取得收藏列表
      let usersResponse = await axios.get(`${_url}/users/${userId}`);
      followArray = usersResponse.data.followList;
      // 計算總頁數
      followTotalPages = Math.ceil(followArray.length / 6);

      let courseCards = '';
      if (followArray.length != 0) {
        // 取得課程資料
        let apiString = `${_url}/courses?_expand=teacher&_page=${pageId}&_limit=6`;
        followArray.forEach((item) => {
          apiString += `&id=${item}`;
        });

        let coursesResponse = await axios.get(`${apiString}`);
        courseData = coursesResponse.data;

        courseData.forEach((courseItem) => {
          courseCards += `<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 following"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${
          courseItem.id
        }"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${
          courseItem.name
        }
        </h5>
        <p class="teacher-card-name">${courseItem.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${courseItem.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${courseItem.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${courseItem.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${courseItem.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${courseItem.id}"
        data-bs-target="#loginModal"
        ${isLogin ? '' : 'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${newURL}?courseId=${courseItem.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div></div>`;
        });
        followList.innerHTML = courseCards;
        renderFollowPagination();
        switchPage();
        setButtonListeners();
      } else {
        courseCards = `<p class="text-center fs-5">目前沒有收藏任何課程</p>`;
        followList.innerHTML = courseCards;
        renderFollowPagination();
      }
    } catch (error) {
      showAlertSwal('發生錯誤，請稍後再試');
    }
  }
  fetchData();

  // 渲染分頁按鈕
  function renderFollowPagination() {
    // render 分頁按鈕
    // 取得 ul
    const followPaginationWrapper = document.querySelector('.followPagination');

    let followPagination = '';
    if (followTotalPages) {
      // 上一頁按鈕
      const prevPage = `<li class="page-item prevButton ${
        pageId == 1 ? 'disabled' : ''
      }"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;
      followPagination += prevPage;

      // 頁數按鈕
      for (let i = 1; i <= followTotalPages; i++) {
        let pageItem = `<li class="page-item ${
          i === pageId ? 'active' : ''
        } pageButton">
                          <a class="page-link" href="#">
                            ${i}
                          </a>
                        </li>`;
        followPagination += pageItem;
      }

      // 下一頁按鈕
      const nextPage = `<li class="page-item nextButton ${
        pageId == followTotalPages ? 'disabled' : ''
      }">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;
      followPagination += nextPage;
    }
    followPaginationWrapper.innerHTML = followPagination;
  }

  // 切換頁數
  function switchPage() {
    const prevButton = document.querySelector('.prevButton');
    const nextButton = document.querySelector('.nextButton');
    let pageButtons = document.querySelectorAll('.pageButton');

    prevButton.addEventListener('click', function () {
      if (pageId > 1) {
        pageId--;
        renderFollowPagination();
        fetchData();
      }
    });

    nextButton.addEventListener('click', function () {
      if (followTotalPages > pageId) {
        pageId++;
        renderFollowPagination();
        fetchData();
      }
    });

    pageButtons.forEach((pageButton) => {
      pageButton.addEventListener('click', () => {
        pageId = Number(pageButton.innerText);

        fetchData();
        renderFollowPagination();
      });
    });
  }

  // 監聽 follow 愛心按鈕
  function setButtonListeners() {
    let followButtons = document.querySelectorAll('.following');

    followButtons.forEach((followBtn) => {
      followBtn.addEventListener('click', (e) => {
        unFollow(e);
      });
    });
  }

  // 取消收藏
  async function unFollow(e) {
    let buttonId = e.target.dataset.buttonid;
    let editfollowList = followArray.filter((item) => item != buttonId);

    Swal.fire({
      title: '確定要取消收藏?',
      showDenyButton: true,
      confirmButtonColor: '#115BC9',
      confirmButtonText: '取消收藏',
      denyButtonText: `我再想想`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已取消收藏',
          showConfirmButton: false,
          timer: 1500,
        });

        axios
          .patch(`${_url}/users/${userId}`, {
            followList: editfollowList,
          })
          .then(async (res) => {
            // 重新取得數據
            await fetchData();

            if (courseData.length == 0) {
              pageId--;
              fetchData();
            }
          });
      }
    });
  }
});
