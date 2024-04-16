import axios from 'axios';
import { userId } from '../../utils/config';
import { showAlertSwal } from '../../utils/swal';
import {
  datepickerDefault,
  appointmentSetting,
  setAppointDatepicker,
} from '../../components/datepicker';
import {
  renderPurchasedCart,
  addInputGroup,
  deleteLastInputGroup,
  updateRemainNum,
  renderTime,
} from './render';

let appointCarts = [];
let openTime = [];
let openDate = [];
const cartList = document.querySelector('.js-cartList');

// 課程卡片
let cartCard;
// 第幾個購物車項目
let cartIndex;
// 使用者的歷史購買課程數
let purchasedData = [];
// 使用者的歷史預約
let attendTimeData = [];
let user_coursesId;
// 預約課程的父元素 ul
let appointmentList;

/***** 初始 *****/

init();
async function init() {
  try {
    await Promise.all([getPurchasedCart(), getUserCourses()]);
    renderPurchasedCart();
    getAllTeacherOpenTime();
    datepicker();
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 取得已購買的課程
async function getPurchasedCart() {
  try {
    // 取得課程
    const api = `${_url}/myCarts?userId=${userId}&status=appointment&_expand=course`;
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

async function getUserCourses() {
  try {
    const api = `${_url}/user_courses?userId=${userId}`;
    const { data } = await axios.get(api);
    attendTimeData = data[0].attendTime;
    purchasedData = data[0].purchased;
    user_coursesId = data[0].id;
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

async function getAllTeacherOpenTime() {
  try {
    const promiseArr = appointCarts.map((item) =>
      getTeacherOpenTime(item.courseId)
    );
    const res = await Promise.all(promiseArr);
    openTime = res.map((item) => item.teacher.openTime);
    openDate = openTime.map((item) => item.map((time) => time.date));
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 取得 可預約時間
async function getTeacherOpenTime(courseId) {
  try {
    // 取得老師的時間
    const api = `${_url}/courses/${courseId}?_expand=teacher`;
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 整理資料
function handleData(data) {
  appointCarts = data.map((cart) => {
    // 取得未預約堂數
    const purchasedItem = purchasedData.find(
      (item) => item.courseId == cart.courseId
    );
    const notAppointedNum = purchasedItem
      ? purchasedItem.total - purchasedItem.used
      : 0;

    // 渲染用物件
    const obj = {
      courseId: cart.courseId,
      courseName: cart.course.name,
      teacherName: cart.course?.teacher?.name,
      teacherImg: cart.course?.teacher?.avatar,
      quantity: cart.quantity,
      myCartId: cart.id,
      appointmentNum: 1,
      appointment: [],
      dueDate: cart.dueDate,
      notAppointedNum,
    };
    return obj;
  });
}

/***** 卡片點擊監聽 *****/

cartList.addEventListener('click', (e) => {
  const { target } = e;
  // 取得 課程卡片
  cartCard = target.closest('[data-cart]');
  if (cartCard) {
    // 取得 該課程卡片預約的 ul
    appointmentList = cartCard.querySelector('.js-appointmentList');
    // 取得 該課程卡片的 index
    cartIndex = cartCard.dataset.cart;
    const actionKey = Array.from(target.classList).find((className) =>
      ['btn-reduceAppointment', 'btn-addAppointment', 'hasDatepicker'].includes(
        className
      )
    );
    switch (actionKey) {
      // 減少預約按鈕
      case 'btn-reduceAppointment':
        handleAppointmentNum('reduce');
        break;
      // 增加預約按鈕
      case 'btn-addAppointment':
        handleAppointmentNum('add');
        break;
      // 日期 input
      case 'hasDatepicker':
        setAppointDatepicker(e.target, openDate[cartIndex]);
        break;
      default:
        break;
    }
  }
});

function handleAppointmentNum(action) {
  if (action === 'reduce') {
    appointCarts[cartIndex].appointmentNum--;
    // 刪除 InputGroup
    deleteLastInputGroup();
  } else if ('add') {
    appointCarts[cartIndex].appointmentNum++;
    // 新增 InputGroup
    addInputGroup();
    // 幫新增的 InputGroup 加上 datepicker
    datepicker();
  }
  // 幫新增、刪除按鈕加 disabled
  updateAppointmentBtn();
  // 更新剩餘堂數
  updateRemainNum();
}

// 幫新增、刪除按鈕加 disabled
function updateAppointmentBtn() {
  const addBtn = cartCard.querySelector('.btn-addAppointment');
  const reduceBtn = cartCard.querySelector('.btn-reduceAppointment');
  // 若預約堂數已滿就不能再加
  if (
    appointCarts[cartIndex].appointmentNum == appointCarts[cartIndex].quantity
  ) {
    addBtn.disabled = true;
  } else {
    addBtn.disabled = false;
  }
  // 若預約1堂就不能再刪
  if (appointCarts[cartIndex].appointmentNum == 1) {
    reduceBtn.disabled = true;
  } else {
    reduceBtn.disabled = false;
  }
}

/***** 日期、時間選取 *****/

// jquery datepicker
function datepicker() {
  $(function () {
    datepickerDefault();
    $("[name='appointmentDate']").datepicker({
      ...appointmentSetting,
      showOn: 'none',
      // 選擇日期後觸發
      onSelect: async function (dateText) {
        this.setAttribute('value', dateText);

        const index = this.closest('[data-cart]').dataset.cart;
        // 取得 select 後渲染選項
        const select = this.nextElementSibling;
        let time = undefined;
        // 取得 可預約時間
        const day = openTime[index].find((item) => item.date === dateText);
        if (day) {
          // 篩選可以預約(還沒被預約)的時間
          time = day.time.filter((item) => !day.useTime.includes(item));
        }
        renderTime(select, time);
      },
    });
  });
}

export {
  appointCarts,
  cartList,
  cartIndex,
  appointmentList,
  purchasedData,
  attendTimeData,
  user_coursesId,
};
