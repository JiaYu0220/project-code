import{u as w,a as d,b as v}from"./main-64c8deac.js";import{b as r,s as q}from"./swal-5831e0de.js";import{g as S}from"./helper-ae07f62d.js";const k={minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd"};function I(){$.datepicker.setDefaults($.datepicker.regional["zh-TW"])}function T(t,e){$(t).datepicker("option","beforeShowDay",function(n){const a=$.datepicker.formatDate("yy/mm/dd",n);return e.indexOf(a)===-1?[!1]:[!0]}),$(t).datepicker("show")}function L(){let t="";o.forEach((e,n)=>{t+=`
    <li class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2" data-cart="${n}">
    <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
    ${e.courseName}
    </h3>
    <div class="row justify-content-between">
      <!-- 左 -->
      <div class="col-4 col-sm-3 d-flex flex-column align-items-start">
        <div class="text-center">
          <div>
            <div>
              <img
                class="img-fluid rounded-circle mb-2"
                src="${e.teacherImg}"
                alt="teacher"
                width="90px"
                height="90px"
              />
            </div>
            <h5 class="fs-7 fs-md-6 mb-2">${e.teacherName}</h5>
          </div>
          <ul>
            <li class="fs-sm fs-sm-7" title="已購買但尚未預約">
              先前未預約：<span class="text-secondary2">${e.notAppointedNum}</span> 堂
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
          <button type="button" class="btn btn-primary text-white btn-sm me-1 btn-addAppointment" ${e.quantity==1?"disabled":""}>增加預約</button>
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
          <p class="fs-sm fs-md-7 js-remainNum">剩餘 ${e.quantity-e.appointmentNum} 堂</p>
          <p class="fs-sm fs-md-7">
          預約截止日 <time datetime="${e.dueDate}">${e.dueDate}</time>
          </p>
        </div>
      </div>
    </div>
  </li>`}),b.innerHTML=t}function C(){const e=`
    <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
        <p class="fw-bold w-150px">第 ${o[c].appointmentNum} 堂 (50 分鐘)</p>
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
    </li>`;f.insertAdjacentHTML("beforeend",e)}function E(){const t=f.querySelectorAll("li"),e=t.length;t[e-1].remove()}function O(){const t=f.nextElementSibling.querySelector(".js-remainNum");t.innerText=`剩餘 ${o[c].quantity-o[c].appointmentNum} 堂`}function P(t,e){let n=`
  <option value="" disabled="" selected="" hidden="">${e!==void 0?"時間":"無預約時間"}</option>`;e!==void 0&&(n+=e.map(a=>`<option value="${a}">${a}</option>`).join("")),t.innerHTML=n}let o=[],h=[],j=[];const b=document.querySelector(".js-cartList");let p,c,m=[],y=[],N,f;B();async function B(){try{await Promise.all([_(),H()]),L(),M(),D()}catch{r("發生錯誤，請稍後再試")}}async function _(){try{const t=`https://project-code-json.onrender.com/myCarts?userId=${w}&status=appointment&_expand=course`,{data:e}=await d.get(t);if(e!==void 0){const n=e.map(s=>`https://project-code-json.onrender.com/courses/${s.courseId}?_expand=teacher`),a=await Promise.all(n.map(s=>d.get(s)));e.forEach((s,i)=>{s.course=a[i].data}),K(e)}}catch{r("發生錯誤，請稍後再試")}}async function H(){try{const t=`https://project-code-json.onrender.com/user_courses?userId=${w}`,{data:e}=await d.get(t);y=e[0].attendTime,m=e[0].purchased,N=e[0].id}catch{r("發生錯誤，請稍後再試")}}async function M(){try{const t=o.map(n=>G(n.courseId));h=(await Promise.all(t)).map(n=>n.teacher.openTime),j=h.map(n=>n.map(a=>a.date))}catch{r("發生錯誤，請稍後再試")}}async function G(t){try{const e=`https://project-code-json.onrender.com/courses/${t}?_expand=teacher`,{data:n}=await d.get(e);return n}catch{r("發生錯誤，請稍後再試")}}function K(t){o=t.map(e=>{var i,l,u,x;const n=m.find(A=>A.courseId==e.courseId),a=n?n.total-n.used:0;return{courseId:e.courseId,courseName:e.course.name,teacherName:(l=(i=e.course)==null?void 0:i.teacher)==null?void 0:l.name,teacherImg:(x=(u=e.course)==null?void 0:u.teacher)==null?void 0:x.avatar,quantity:e.quantity,myCartId:e.id,appointmentNum:1,appointment:[],dueDate:e.dueDate,notAppointedNum:a}})}b.addEventListener("click",t=>{const{target:e}=t;if(p=e.closest("[data-cart]"),p)switch(f=p.querySelector(".js-appointmentList"),c=p.dataset.cart,Array.from(e.classList).find(a=>["btn-reduceAppointment","btn-addAppointment","hasDatepicker"].includes(a))){case"btn-reduceAppointment":g("reduce");break;case"btn-addAppointment":g("add");break;case"hasDatepicker":T(".hasDatepicker",j[c]);break}});function g(t){R(),O(),t==="reduce"?(o[c].appointmentNum--,E()):(o[c].appointmentNum++,C(),D())}function R(){const t=p.querySelector(".btn-addAppointment"),e=p.querySelector(".btn-reduceAppointment");t.disabled=!1,e.disabled=!1,o[c].appointmentNum==o[c].quantity&&(t.disabled=!0),o[c].appointmentNum==1&&(e.disabled=!0)}function D(){$(function(){I(),$("[name='appointmentDate']").datepicker({...k,showOn:"none",onSelect:async function(t){this.setAttribute("value",t);const e=this.closest("[data-cart]").dataset.cart,n=this.nextElementSibling;let a;const s=h[e].find(i=>i.date===t);s&&(a=s.time.filter(i=>!s.useTime.includes(i))),P(n,a)}})})}const U=document.querySelector(".js-confirmBtn");U.addEventListener("click",async()=>{try{if((await q("確定完成預約嗎?","之後可至會員中心修改預約時間或預約剩餘堂數")).isConfirmed){const e=b.querySelectorAll(".js-appointment");let n=!1;e.forEach(a=>{a.value===""&&(n=!0)}),n?r("預約欄位請勿空白","請至少預約一堂，沒有要預約的堂數可先刪除"):(z(),J(),await r("預約成功！","已發送預約給教師，需等待教師進行確認，如教師拒絕或是未在24小時內確認，系統將系統將自動歸還自動歸還課堂數給您。","success"),location.href="cart3.html")}}catch{r("發生錯誤，請稍後再試")}});async function z(){try{const t=o.map(n=>`https://project-code-json.onrender.com/myCarts/${n.myCartId}`),e={status:"finish"};await Promise.all(t.map(n=>d.patch(n,e,v)))}catch{r("發生錯誤，請稍後再試")}}function J(){document.querySelectorAll(".js-appointmentList").forEach((e,n)=>{e.querySelectorAll("li").forEach(s=>{const i=s.querySelector("[name='appointmentDate']"),l=s.querySelector("[name='appointmentTime']"),u={date:i.value,time:l.value};o[n].appointment.push(u)})}),sessionStorage.setItem("appointment",JSON.stringify(o)),W()}async function W(){try{o.forEach(n=>{n.appointment.forEach(s=>{const i={uid:S(4),courseId:Number(n.courseId),date:s.date,time:s.time,isCheck:!1};y.push(i)});const a=m.find(s=>s.courseId==n.courseId);a?(a.total+=Number(n.quantity),a.used+=Number(n.appointmentNum)):m.push({courseId:Number(n.courseId),total:Number(n.quantity),used:Number(n.appointmentNum)})});const t=`https://project-code-json.onrender.com/user_courses/${N}`,e={purchased:m,attendTime:y};await d.patch(t,e,v)}catch{r("發生錯誤，請稍後再試")}}
