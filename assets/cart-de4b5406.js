import{d as w,s as l,a as f,e as g,u as A,b as S,g as J,r as X}from"./main-56a0edac.js";import{p as L}from"./helper-ae07f62d.js";const Y=document.querySelector("#OriginalPrice"),Z=document.querySelector("#CourseDiscount"),ee=document.querySelector("#WebDiscount"),te=document.querySelector("#TotalPrice"),p={originalTotal:0,courseDiscount:0,webDiscount:0,totalPrice:0};function $(){U(),B(),V(),T()}function ne(){U(),T()}function k(){B(),V(),T()}function U(){p.originalTotal=i.reduce((t,e)=>t+=e.quantity*e.course.price,0),Y.textContent=p.originalTotal.toLocaleString()}function B(){p.courseDiscount=a.reduce((t,e,n)=>n<a.length-1?t+e.discountPrice:t,0),Z.textContent=p.courseDiscount.toLocaleString()}function V(){p.webDiscount=a[a.length-1].discountPrice,ee.textContent=p.webDiscount.toLocaleString()}function T(){p.totalPrice=p.originalTotal-p.courseDiscount-p.webDiscount,te.textContent=p.totalPrice.toLocaleString()}let a=[];const x=document.querySelector("#coupon"),P=document.querySelector(".js-useCouponBtn");let y=[],b=[];const oe={myCouponId:"",originPrice:"",courseId:"",type:"",title:"",discount:0,minSpending:"",discountCourseNum:"",discountPrice:0};function D(){a=Array.from({length:i.length+1},()=>oe)}x.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),Q())});P.addEventListener("click",t=>{t.preventDefault(),Q()});async function N(){try{for(const t of a)if(t.myCouponId){const e=`https://project-code-json.onrender.com/myCoupons/${t.myCouponId}`,n={canUse:!1};await f.patch(e,n,g)}}catch{l("發生錯誤，請稍後再試")}}async function se(){try{const t=`https://project-code-json.onrender.com/myCoupons?_expand=coupon&userId=${A}&_sort=couponId&_order=asc`,{data:e}=await f.get(t);y=e,ce()}catch{l("發生錯誤，請稍後再試")}}async function ce(){const t=[];y.forEach(e=>{let n=new Date().getTime();new Date(e.dueDate).getTime()<n&&(e.canUse=!1,t.push(e))}),t.length>0&&(await Promise.all(t.map(async e=>{try{await f.patch(`https://project-code-json.onrender.com/myCoupons/${e.id}`,{canUse:!1},g)}catch{l("發生錯誤，請稍後再試")}})),y=y.filter(e=>e.canUse===!0)),_()}function _(){b=[],y.forEach(t=>{if(t.coupon.type==="allCourse"){const{courseId:e,type:n,title:o,minSpending:s,discountCourseNum:c,discount:r}=t.coupon,u={myCouponId:t.id,originPrice:null,courseId:e,type:n,title:o,discount:r,minSpending:s,discountCourseNum:c};b.push(u)}}),i.forEach(t=>{y.forEach(e=>{if(e.coupon.type==="course"&&t.courseId==e.coupon.courseId){const{courseId:n,type:o,title:s,discount:c,minSpending:r,discountCourseNum:u}=e.coupon,d=t.course.price;if(n==t.courseId){const m={myCouponId:e.id,originPrice:d,courseId:n,type:o,title:s,discount:c,minSpending:r,discountCourseNum:u};b.push(m)}}})}),le()}function Q(){const t=b.filter(e=>e.title===x.value)[0];if(t!==void 0){const e=L(document.querySelector("#OriginalPrice").textContent),n=document.querySelectorAll("li[data-course]"),{minSpending:o,discountCourseNum:s,courseId:c}=t;if(w("已使用優惠券"),o<=e)if(t.type==="course")n.forEach((r,u)=>{const d=r.dataset.course;if(c==d){const m=r.querySelector("input[name='count']");s===null||Number(s)<=Number(m.value)?a[u].myCouponId==""?(x.value="",M(u,t)):l("每個課程只能使用一張優惠券",""):l("未符合使用條件",`須購買指定課程達 ${s} 堂課`)}});else{const r=a.length-1;a[r].myCouponId==""?(x.value="",M(r,t)):l("每個課程只能使用一張優惠券","")}else l("未符合使用條件",`折價前的消費總額須達 NT$ ${o}`)}else l("沒有匹配的優惠券","")}function H(t){j(t),C(),k()}function re(t,e){const n=L(document.querySelector("#OriginalPrice").textContent);a.forEach((o,s)=>{const{minSpending:c,discountCourseNum:r,courseId:u,myCouponId:d}=o;c<=n?u==t?r===null||r<=e?o.discountPrice=I(o):j(s):s==a.length-1&&d!==""&&(o.discountPrice=I(o)):j(s)}),C()}function j(t){a[t]={myCouponId:"",originPrice:0,courseId:"",type:"",title:"",discount:"",minSpending:0,discountCourseNum:0,discountPrice:0}}function M(t,e){a[t]={...e,discountPrice:I(e)},C(),k()}function I(t){const{type:e,discount:n}=t;if(e==="course"){const{originPrice:o,discountCourseNum:s}=t;return Math.round(Number(o)*(1-Number(n))*Number(s))}else{const o=L(document.querySelector("#OriginalPrice").textContent);return Math.round(o*(1-Number(n)))}}function W(t){a=a.filter(e=>e.courseId!=t)}const F=document.querySelector(".js-cartList"),ae=document.querySelector(".js-nextCartList");function K(){let t="";i.length?i.forEach((e,n)=>{var o,s,c,r,u,d,m,v;t+=`
          <li data-course="${e.courseId}">
            <div
              class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
            >
              <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                ${(o=e.course)==null?void 0:o.name}
              </h3>
              <div class="row justify-content-between">
                <!-- 老師區塊 -->
                <div
                  class="col-4 col-sm-3 d-flex flex-column align-items-start"
                >
                  <div class="text-center">
                    <div>
                      <img
                        class="img-fluid rounded-circle mb-2"
                        src="${(c=(s=e.course)==null?void 0:s.teacher)==null?void 0:c.avatar}"
                        alt="teacher"
                        width="90px"
                        height="90px"
                      />
                    </div>
                    <h5 class="fs-7 fs-md-6">
                      ${(u=(r=e.course)==null?void 0:r.teacher)==null?void 0:u.name}
                    </h5>
                  </div>
                </div>
  
                <div class="col-8 col-sm-9 order">
                  <!-- 堂數 -->
                  <form class="mb-3 mb-md-5" action="#">
                    <div
                      class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                    >
                      <label for="hour${n}"
                        >單堂時長 (分鐘)
                        <select
                          class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                          name="hour"
                          id="hour${n}"
                          disabled
                        >
                          <option value="${(d=e.course)==null?void 0:d.duration}" selected>
                            ${(m=e.course)==null?void 0:m.duration}
                          </option>
                        </select>
                      </label>
  
                      <label class="w-150px" for="count${n}"
                        >堂數 (堂)
                        <div class="input-group w-fit mt-2">
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-start-2 border-2 py-0 fw-bold fs-4 w-45px js-decrement"
                          >
                            -
                          </button>
                          <input
                            class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                            type="text"
                            name="count"
                            id="count${n}"
                            value="${e.quantity}"
                            inputmode="numeric"
                          />
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-end-2 border-2 py-0 fw-bold fs-4 w-45px js-increment"
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                  </form>
  
                  <!-- 價格 -->
                  <div class="d-flex justify-content-between mb-3">
                    <div class="d-flex gap-3">
                      <h4 class="fs-5 fs-md-4 fw-bold">
                        NT$
                        <span class="OriginalCoursePrice">
                        ${(v=e.course)==null?void 0:v.price.toLocaleString()}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-4">
                  <p class="fs-sm fs-md-7">
                    預約截止日
                    <time datetime="${e.dueDate}">
                    ${e.dueDate}</time
                    >
                  </p>
                  <a
                    class="text-decoration-underline js-nextPurchaseBtn"
                    role="button"
                    href="#"
                    >下次再買</a
                  >
                  <a
                    class="text-decoration-underline delete-order"
                    role="button"
                    href="#"
                    >刪除</a
                  >
                </div>
              </div>
            </div>
          <div class="d-flex align-items-center js-usedCoupon"></div>
        </li>`}):t=`
      <div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
        <p class="fs-4 mb-10">購物車內沒有商品</p>
        <a href="./course.html"
          class="btn btn-secondary2 rounded-2 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
        >
          繼續選購
        </a>
      </div>
      `,F.innerHTML=t,ie()}function ie(){const t=document.querySelector("#payWay");i.length?(t.querySelectorAll("button").forEach(e=>{e.disabled=!1}),P.disabled=!1):(t.querySelectorAll("button").forEach(e=>{e.disabled=!0}),P.disabled=!0)}function R(){let t="";h.length?h.forEach((e,n)=>{var o,s,c,r,u,d,m,v;t+=`
      <li data-course="${e.courseId}">
              <div
                class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
              >
                <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                  ${(o=e.course)==null?void 0:o.name}
                </h3>
                <div class="row justify-content-between">
                  <!-- 老師區塊 -->
                  <div
                    class="col-4 col-sm-3 d-flex flex-column align-items-start"
                  >
                    <div class="text-center">
                      <div>
                        <img
                          class="img-fluid rounded-circle mb-2"
                          src="${(c=(s=e.course)==null?void 0:s.teacher)==null?void 0:c.avatar}"
                          alt="teacher"
                          width="90px"
                          height="90px"
                        />
                      </div>
                      <h5 class="fs-7 fs-md-6">${(u=(r=e.course)==null?void 0:r.teacher)==null?void 0:u.name}</h5>
                    </div>
                  </div>
  
                  <div class="col-8 col-sm-9">
                    <!-- 堂數 -->
                    <form class="mb-3 mb-md-5" action="#">
                      <div
                        class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                      >
                        <label for="nextHour${n}"
                          >單堂時長 (分鐘)
                          <select
                            class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                            name="nextHour"
                            id="nextHour${n}"
                            disabled
                          >
                            <option value="${(d=e.course)==null?void 0:d.duration}" selected>${(m=e.course)==null?void 0:m.duration}</option>
                          </select>
                        </label>
  
                        <label class="w-150px" for="nextCount${n}"
                          >堂數 (堂)
                          <div class="w-fit mt-2">
                            <input
                              class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                              type="text"
                              name="nextCount"
                              id="nextCount${n}"
                              value="${e.quantity}"
                              inputmode="numeric"
                              pattern="[0-9]"
                              disabled
                            />
                          </div>
                        </label>
                      </div>
                    </form>
  
                    <!-- 價格 -->
                    <div class="d-flex justify-content-between mb-3">
                      <div class="d-flex gap-3">
                        <h4 class="fs-5 fs-md-4 fw-bold">
                          NT$ <span class="OriginalCoursePrice">${(v=e.course)==null?void 0:v.price.toLocaleString()}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end gap-4">
                    <p class="fs-sm fs-md-7">
                      預約截止日
                      <time datetime="${e.dueDate}">${e.dueDate}</time>
                    </p>
                    <a class="text-decoration-underline js-mainPurchaseBtn" role="button" href="#">移至購物車</a>
                    <a class="text-decoration-underline delete-order" role="button" href="#"
                      >刪除</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):t+=`<div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
      <p class="fs-4 mb-10">沒有商品</p>
    </div>`,ae.innerHTML=t}function ue(){const t=`
      <div class="d-flex justify-content-center py-10">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;F.innerHTML=t}function le(){const t=document.querySelector("#couponOption");let e="";b.length&&b.forEach(n=>{e+=`<option value="${n.title}"></option>`}),t.innerHTML=e}function C(){document.querySelectorAll(".js-usedCoupon").forEach((e,n)=>{a[n].myCouponId===""?e.innerHTML="":e.innerHTML=`<button type="button" class="btn btn-close fs-sm js-delCoupon" data-index="${n}"></button>
        <p>
          已套用 <span class="fw-bold text-secondary2">${a[n].title}</span
          ><i class="fa-solid fa-arrow-right mx-1"></i
          ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${a[n].discountPrice}</span> 元</span>
        </p>`})}function de(t){const e=t.getAttribute("data-bs-target"),n=document.querySelector(e),o=document.querySelector("#TotalPrice").innerText;let s=new Date;s.setDate(s.getDate()+5),s.setHours(23,59,59,999),s=s.toLocaleDateString("en-CA"),n.querySelector(".js-paymentPrice").innerHTML=`NT$ ${o}`,n.querySelector(".js-dueDate").innerHTML=`${s} 23:59:59`}const pe=document.querySelector("#purchaseTabContent");document.querySelector("#mainPurchase");let i=[],h=[];fe();async function fe(){ue(),await me(),K(),i.length&&(ne(),D(),se()),R()}async function me(){try{const t=`https://project-code-json.onrender.com/myCarts?userId=${A}&status=purchase&_expand=course`,{data:e}=await f.get(t);if(e!==void 0){const n=e.map(s=>`https://project-code-json.onrender.com/courses/${s.courseId}?_expand=teacher`),o=await Promise.all(n.map(s=>f.get(s)));e.forEach((s,c)=>{s.course=o[c].data}),he(e)}}catch{l("發生錯誤，請稍後再試")}}function he(t){let e=new Date;e.setDate(e.getDate()+365),e.setHours(23,59,59,999);const n=e.toLocaleDateString("en-CA");t.forEach(o=>{o.dueDate=n}),i=t.filter(o=>!o.isNextPurchase),h=t.filter(o=>o.isNextPurchase)}pe.addEventListener("click",t=>{const e=t.target,n=e.closest("li"),o={"delete-order":z,"js-nextPurchaseBtn":be,"js-mainPurchaseBtn":Ce,"js-increment":xe,"js-decrement":we,"js-delCoupon":H};if(n){const s=Array.from(e.classList).find(c=>o[c]);if(s){t.preventDefault();const c=o[s];if(s==="js-delCoupon")c(e.dataset.index);else{const r=n.dataset.course,u=n.querySelector("input[name='count']");c(r,u)}}}else e.classList.contains("js-delCoupon")&&H(e.dataset.index)});async function z(t){(await S("確定要刪除嗎?")).isConfirmed&&(w("已刪除課程"),ye(t),W(t),D(),C(),$())}async function ye(t){try{let e;i=i.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),h=h.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),E(),await f.delete(`https://project-code-json.onrender.com/myCarts/${e}`)}catch(e){e.response.data.includes("TypeError: Cannot read property 'toString' of null")||l("發生錯誤，請稍後再試")}}async function be(t){(await S("確定要下次再買該課程嗎?")).isConfirmed&&(w("已移至下次再買"),ge(t),W(t),D(),C(),$())}async function ge(t){try{let e;i=i.filter(n=>(n.courseId==t&&(e=n.id,h.push(n)),n.courseId!=t)),E(),await f.patch(`https://project-code-json.onrender.com/myCarts/${e}`,{isNextPurchase:!0},g)}catch{l("發生錯誤，請稍後再試")}}async function Ce(t){(await S("確定將該課程移至購物車嗎?")).isConfirmed&&(w("已移置購買項目"),ve(t),D(),C(),$())}async function ve(t){try{let e;h=h.filter(n=>(n.courseId==t&&(e=n.id,i.push(n)),n.courseId!=t)),E(),await f.patch(`https://project-code-json.onrender.com/myCarts/${e}`,{isNextPurchase:!1},g)}catch{l("發生錯誤，請稍後再試")}}async function E(){K(),i.length&&_(),R(),await J(),X()}function xe(t,e){e.value=e.value*1+1,q(t,e.value)}function we(t,e){parseInt(e.value)===1?z(t):(e.value=e.value*1-1,q(t,e.value))}document.addEventListener("change",t=>{t.target.name==="count"&&G(t.target)});document.addEventListener("keydown",t=>{t.target.name==="count"&&t.key==="Enter"&&(t.preventDefault(),G(t.target))});function G(t){const e=t.closest("[data-course]").dataset.course;t.value.match(/[^0-9]|^0$/g)&&(t.value=t.defaultValue),q(e,t.value)}function q(t,e){$e(t,e),re(t,e),$()}function $e(t,e){let n;i.forEach(o=>{o.courseId==t&&(n=o.id,o.quantity=e)}),De(n,e)}async function De(t,e){try{const n=`https://project-code-json.onrender.com/myCarts/${t}`,o={quantity:e};await f.patch(n,o,g)}catch{l("發生錯誤，請稍後再試")}}const Pe=document.querySelectorAll(".js-paymentInfoBtn"),je=document.querySelectorAll(".js-payBtn");Pe.forEach(t=>{t.addEventListener("click",e=>de(e.target))});je.forEach(t=>{t.addEventListener("click",async e=>{if(e.preventDefault(),e.target.type==="submit"){const n=e.target.closest("form");n.checkValidity()?(await N(),await O(),location.href="cart2.html"):n.reportValidity()}else await N(),await O(),location.href="cart2.html"})});async function O(){try{const t=i.map(e=>`https://project-code-json.onrender.com/myCarts/${e.id}`);await Promise.all(t.map((e,n)=>{const o={status:"appointment",dueDate:i[n].dueDate};return f.patch(e,o,g)}))}catch{l("發生錯誤，請稍後再試")}}
