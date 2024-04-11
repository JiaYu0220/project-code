import { appointCarts, cartIndex, cartList, appointmentList } from './appoint';

// 渲染已購買的課程
function renderPurchasedCart() {
  let cartHtml = '';
  appointCarts.forEach((cart, index) => {
    cartHtml += `
    <li class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2" data-cart="${index}">
    <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
    ${cart.courseName}
    </h3>
    <div class="row justify-content-between">
      <!-- 左 -->
      <div class="col-4 col-sm-3 d-flex flex-column align-items-start">
        <div class="text-center">
          <div>
            <div>
              <img
                class="img-fluid rounded-circle mb-2"
                src="${cart.teacherImg}"
                alt="teacher"
                width="90px"
                height="90px"
              />
            </div>
            <h5 class="fs-7 fs-md-6 mb-2">${cart.teacherName}</h5>
          </div>
          <ul>
            <li class="fs-sm fs-sm-7" title="已購買但尚未預約">
              先前未預約：<span class="text-secondary2">${
                cart.notAppointedNum
              }</span> 堂
            </li>
          </ul>
        </div>
      </div>
      <!-- 右 -->
      <div class="col-8 col-sm-9">
        <p class="fs-7 fs-md-6 text-primary fw-bold mb-2">
          預約時間：
        </p>
        <div class="mb-2">
          <button type="button" class="btn btn-primary text-white btn-sm me-1 btn-addAppointment" ${
            cart.quantity == 1 ? 'disabled' : ''
          }>增加預約</button>
          <button type="button" class="btn btn-primary text-white btn-sm btn-reduceAppointment" disabled>減少預約</button>
        </div>
        <ul class="js-appointmentList">
          <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
              <p class="fw-bold w-150px">第 1 堂 (50 分鐘)</p>
              <div class="d-flex gap-2 w-300px">
                  <input
                  class="form-control border-primary cursor-pointer fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
                  type="text"
                  name="appointmentDate"
                  placeholder="日期"
                  value=""
                  autocomplete="off"
                  required
                  />
                  <select
                  class="form-select border-primary fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
                  name="appointmentTime"
                  required
                  >
                  <option value="" disabled selected hidden>時間</option>
                  </select>
              </div>
              <p class="fs-sm fs-md-7"
                  ><span class="text-danger">請至少預約一堂</span>，剩餘堂數可在會員中心預約
              </p>
          </li>
        </ul>
        <div class="d-flex justify-content-end align-items-center gap-4 mt-auto">
          <p class="fs-sm fs-md-7 js-remainNum">剩餘 ${
            cart.quantity - cart.appointmentNum
          } 堂</p>
          <p class="fs-sm fs-md-7">
          預約截止日 <time datetime="${cart.dueDate}">${cart.dueDate}</time>
          </p>
        </div>
      </div>
    </div>
  </li>`;
  });
  cartList.innerHTML = cartHtml;
}

// 新增 InputGroup
function addInputGroup() {
  // 第幾堂
  const classNum = appointCarts[cartIndex].appointmentNum;
  // 寫入 html
  const inputGroup = `
    <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
        <p class="fw-bold w-150px">第 ${classNum} 堂 (50 分鐘)</p>
        <div class="d-flex gap-2 w-300px">
        <input
            class="form-control border-primary cursor-pointer fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
            type="text"
            name="appointmentDate"
            value=""
            placeholder="日期"
            autocomplete="off"
            required
        />
        <select
            class="form-select border-primary fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
            name="appointmentTime" required"
        >
            <option value="" disabled selected hidden>時間</option>
        </select>
        </div>
    </li>`;
  appointmentList.insertAdjacentHTML('beforeend', inputGroup);
}

// 刪除 InputGroup
function deleteLastInputGroup() {
  // 所有 li
  const listItems = appointmentList.querySelectorAll('li');
  // li 有幾個
  const length = listItems.length;
  // 刪除最後一個 li
  listItems[length - 1].remove();
}

// 更新剩餘堂數
function updateRemainNum() {
  // 選取剩餘堂數
  const remainNum =
    appointmentList.nextElementSibling.querySelector('.js-remainNum');
  remainNum.innerText = `剩餘 ${
    appointCarts[cartIndex].quantity - appointCarts[cartIndex].appointmentNum
  } 堂`;
}

// 渲染時間選項
function renderTime(target, time) {
  let optionHtml = `
  <option value="" disabled="" selected="" hidden="">${
    time !== undefined ? '時間' : '無預約時間'
  }</option>`;
  if (time !== undefined) {
    optionHtml += time
      .map((item) => `<option value="${item}">${item}</option>`)
      .join('');
  }
  target.innerHTML = optionHtml;
}

export {
  renderPurchasedCart,
  addInputGroup,
  deleteLastInputGroup,
  updateRemainNum,
  renderTime,
};
