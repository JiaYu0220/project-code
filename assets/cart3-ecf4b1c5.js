import"./main-64c8deac.js";const m=JSON.parse(sessionStorage.getItem("appointment")),n=document.querySelector(".js-cartList");i();function i(){let t="";m.forEach(e=>{let s="";e.appointment.forEach((a,l)=>{s+=`<li
        class="d-flex flex-wrap align-items-center column-gap-4 row-gap-2 mb-5 mb-md-7"
      >
        <p class="fw-bold">第 ${l+1} 堂 (50 分鐘)：</p>
        <div class="d-flex gap-2 flex-wrap">
          <p
            class="fs-sm fs-sm-7 d-flex align-items-center me-3"
          >
            <span class="material-symbols-outlined me-1">
              event </span
            >${a.date}
          </p>
          <p
            class="fs-sm fs-sm-7 d-flex align-items-center"
          >
            <span class="material-symbols-outlined me-1">
              schedule </span
            >${a.time} 開始
          </p>
        </div>
      </li>`}),t+=`<li
        class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 ps-xl-11 pe-xl-13 mb-1 mb-md-2"
      >
        <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2 text-center">
          ${e.courseName}
        </h3>
        <div class="d-flex justify-content-center gap-4 gap-lg-8 gap-xl-10">
          <!-- 左 -->
          <div
            class=" d-flex flex-column align-items-start"
          >
            <div class="text-center">
              <div>
              <!-- card.teacherImg -->
                <img
                  class="img-fluid rounded-circle mb-2"
                  src="${e.teacherImg}"
                  alt="teacher"
                  width="90px"
                  height="90px"
                />
              </div>
              <h5 class="fs-7 fs-md-6 mb-4">${e.teacherName}</h5>
              <button
              type="button"
              class="btn btn-secondary2 text-nowrap"
              data-bs-toggle="offcanvas"
              data-bs-target="#message-mike"
              aria-controls="message-mike"
              aria-current="page"
              data-bs-toggle="offcanvas"
              data-bs-target="#message-list"
              aria-controls="#message-list"
          >
              聯絡老師
          </button>
            </div>
          </div>
          <!-- 右 -->
          <div
            class=" d-flex flex-column justify-content-center"
          >
            <ul class="border-bottom px-2">
              ${s}
            </ul>
            <p class="fs-sm fs-md-6 text-start px-2 py-4">
              共購買 ${e.quantity} 堂，目前已預約 ${e.appointmentNum} 堂，尚有 <span class="text-primary fw-bold">${e.quantity-e.appointmentNum}</span> 堂未預約
            </p>
          </div>
        </div>
        <div class="fs-sm fs-md-7 text-primary text-end">
        預約截止日 <time datetime="${e.dueDate}">${e.dueDate}</time>
        </div>
      </li>`}),n.innerHTML=t}
