import { showConfirmSwal, showAlertSwal } from '../../utils/swal';
import { generateRandomCode } from '../../utils/helper';
import { headers } from '../../utils/config';
import {
  appointCarts,
  cartList,
  purchasedData,
  attendTimeData,
  user_coursesId,
} from './appoint';
import axios from 'axios';

/***** 確定預約 *****/
const confirmBtn = document.querySelector('.js-confirmBtn');

// 按下確定預約按鈕
confirmBtn.addEventListener('click', async () => {
  try {
    const result = await showConfirmSwal(
      '確定完成預約嗎?',
      '之後可至會員中心修改預約時間或預約剩餘堂數'
    );
    // 按下確認
    if (result.isConfirmed) {
      // 檢查是否都有填
      const appointments = cartList.querySelectorAll('.js-appointment');
      let isBlank = false;
      appointments.forEach((item) => {
        if (item.value === '') {
          isBlank = true;
        }
      });
      // 若發現有空白
      if (isBlank) {
        showAlertSwal(
          '預約欄位請勿空白',
          '請至少預約一堂，沒有要預約的堂數可先刪除'
        );
      }
      // 若都有填
      else {
        patchPurchasedCart(); // patch 購物車狀態
        handleAppointmentData(); // 處理預約資料(sessionStorage、patch)
        await showAlertSwal(
          '預約成功！',
          '已發送預約給教師，需等待教師進行確認，如教師拒絕或是未在24小時內確認，系統將系統將自動歸還自動歸還課堂數給您。',
          'success'
        );
        location.href = 'cart3.html';
      }
    }
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
});

// patch 購物車狀態
async function patchPurchasedCart() {
  try {
    const urls = appointCarts.map((item) => `${_url}/myCarts/${item.myCartId}`);
    const patchData = { status: 'finish' };
    await Promise.all(urls.map((url) => axios.patch(url, patchData, headers)));
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}

// 處理預約資料(sessionStorage、patch)
function handleAppointmentData() {
  // 取得每張卡片預約的 ul
  const appointmentLists = document.querySelectorAll('.js-appointmentList');
  appointmentLists.forEach((ul, index) => {
    // 取得預約 ul 內的所有 li
    const appointments = ul.querySelectorAll('li');
    appointments.forEach((appointment) => {
      // 取得 日期
      const date = appointment.querySelector("[name='appointmentDate']");
      // 取得 時間
      const time = appointment.querySelector("[name='appointmentTime']");
      // 將日期和時間加入資料
      const appointmentObj = {
        date: date.value,
        time: time.value,
      };
      appointCarts[index].appointment.push(appointmentObj);
    });
  });
  // 存入 sessionStorage 供下一頁購物明細使用
  sessionStorage.setItem('appointment', JSON.stringify(appointCarts));
  // patch 預約資料到 json
  patchAppointmentData();
}

// patch 預約資料到 json
async function patchAppointmentData() {
  try {
    appointCarts.forEach((cartItem) => {
      // 預約時間
      cartItem.appointment.forEach((timeItem) => {
        const attendTimeObj = {
          uid: generateRandomCode(4),
          courseId: Number(cartItem.courseId),
          date: timeItem.date,
          time: timeItem.time,
          isCheck: false,
        };
        attendTimeData.push(attendTimeObj);
      });

      // 總預約數量
      const foundItem = purchasedData.find(
        (item) => item.courseId == cartItem.courseId
      );
      if (foundItem) {
        // 若已買過該課程
        foundItem.total += Number(cartItem.quantity);
        foundItem.used += Number(cartItem.appointmentNum);
      } else {
        // 若沒買過
        purchasedData.push({
          courseId: Number(cartItem.courseId),
          total: Number(cartItem.quantity),
          used: Number(cartItem.appointmentNum),
        });
      }
    });

    // api
    const api = `${_url}/user_courses/${user_coursesId}`;
    const patchData = { purchased: purchasedData, attendTime: attendTimeData };
    await axios.patch(api, patchData, headers);
  } catch (error) {
    showAlertSwal('發生錯誤，請稍後再試');
  }
}
