import{a as m,u as b,c as X,i as ue}from"./main-64c8deac.js";import"./openTime-f6403d24.js";import{g as me}from"./helper-ae07f62d.js";import{h as pe}from"./startCourse-2b1863b9.js";import"./swal-5831e0de.js";let _=[];const fe=document.querySelector("#userName"),he=document.querySelector("#userRole"),ge=document.querySelector("#userImg"),be=document.querySelector("#PreviousWeek"),$e=document.querySelector("#NextWeek"),ve=document.querySelector("#courseTeacherName"),ye=document.querySelector("#courseName"),we=document.querySelector("#dateTime");function xe(){m.get(`https://project-code-json.onrender.com/user_courses?_expand=user&userId=${b.toString()}`).then(function(e){_=e.data[0],ge.setAttribute("src",_.user.avatar),fe.textContent=_.user.name,he.textContent=_.user.role,V()})}function V(){document.querySelectorAll(".calendar-time").forEach(i=>{let t=i.getAttribute("data-num"),a=c(t),s="";if(a.length!==0)for(let n=0;n<a.length;n++)s+=`<li class="c2"><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${a[n].courseId}"
                id="viewCourse">
                ${a[n].time}
                </a></li>`;i.innerHTML=s}),document.querySelectorAll("#viewCourse").forEach(i=>{let t=i.getAttribute("data-course-id");i.addEventListener("click",()=>{p(t)})});function c(i){return _.attendTime.filter(t=>t.date===i)}function p(i){let t=[];m.get(`https://project-code-json.onrender.com/courses/${i.toString()}?_expand=teacher`).then(function(a){t=a.data,ve.textContent=t.teacher.name,ye.textContent=t.name,we.innerHTML=""})}}const Te=document.querySelectorAll("#viewCourse");Te.forEach(e=>{let o=e.getAttribute("data-course-id");e.addEventListener("click",()=>{getCourse(o)})});be.addEventListener("click",V);$e.addEventListener("click",V);xe();const Se=document.querySelector(".days"),De=document.querySelector(".current-date"),Le=document.querySelectorAll(".icons span");let F="",w=new Date().getFullYear(),h=new Date().getMonth(),q="";const je=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],ae=()=>{let o=new Date(w,h,1).getDay(),c=new Date(w,h+1,0).getDate(),p=new Date(w,h,c).getDay(),i=new Date(w,h,0).getDate(),t="";for(let n=o;n>0;n--)t+=`<li class="inactive">${i-n+1}</li>`;for(let n=1;n<=c;n++){let d=n===new Date().getDate()&&h===new Date().getMonth()&&w===new Date().getFullYear()?"active":"",r=`${w}/${String(h+1).padStart(2,"0")}/${String(n).padStart(2,"0")}`;t+=`<li class="${d}" data-day="${r}">${n}</li>`}for(let n=p;n<6;n++)t+=`<li class="inactive">${n-p+1}</li>`;De.innerText=`${je[h]} ${w}`,Se.innerHTML=t;const a=document.querySelectorAll(".days li"),s=n=>{a.forEach(d=>d.classList.remove("active")),n.classList.add("active")};a.forEach(n=>{n.addEventListener("click",d=>{s(d.currentTarget),F=d.target.getAttribute("data-day"),q||(q=document.querySelector(".book-card").getAttribute("data-courseid")),O(q,F)})})};ae();Le.forEach(e=>{e.addEventListener("click",()=>{h=e.id==="prev"?h-1:h+1,(h<0||h>11)&&(w=e.id==="prev"?w-1:w+1,h=h<0?11:0),ae()})});const ke=document.querySelector("#appointment_list"),Ae=document.querySelector("#course-management");let G={},J=[];function K(){m.get(`https://project-code-json.onrender.com/user_courses?userId=${b.toString()}`).then(function(e){G=[...e.data[0].purchased],J=[...e.data[0].attendTime],J.forEach(p=>{p.day=p.date,delete p.date}),o(G),c(J);function o(p){let i="";m.get("https://project-code-json.onrender.com/courses?_expand=teacher").then(function(t){const a=t.data;p.map(l=>{const u=a.find(v=>l.courseId===v.id);return u?{...l,...u}:l}).forEach(l=>{i+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),ke.innerHTML=i;const n=document.querySelectorAll(".book-card"),d=document.querySelector(".book-card");var r=new Date;O(d.getAttribute("data-courseId"),`${r.getFullYear()}/${r.getMonth()+1}/${r.getDate()}`),d.classList.add("active"),n.forEach(l=>{l.addEventListener("click",u=>{n.forEach(v=>{v.classList.remove("active")}),u.currentTarget.classList.add("active"),q=u.currentTarget.getAttribute("data-courseId"),O(q,F)})})}).catch(t=>{console.error(t)})}function c(p){let i="";m.get("https://project-code-json.onrender.com/courses?_expand=teacher").then(function(t){const a=t.data,s=p.map(r=>{const l=a.find(u=>r.courseId===u.id);return l?{...r,...l}:r});s.forEach((r,l)=>{if(r.teacher===void 0)return;let u="";r.isCheck?u=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${r.uid}"
                  >
                    即將上課
                  </button>`:u=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${r.uid}"
                    disabled
                  >
                    等待確認中
                  </button>`,i+=`<li class="course-card shadow w-100 w-xl-75">
                    <div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
                      <div class="course-card-header me-4">
                        <a href="#" class="text-center">
                          <div class="mb-2">
                            <img
                              class="avatar w-120px"
                              src="${r.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${r.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${r.name}
                          </h2>
                        </div>
                        <!-- 課程介紹 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-2 mb-md-4"
                        >
                          <p class="fs-sm fs-sm-7 fs-md-6 text-justify mb-md-0 mb-4">
                            50分鐘 x <span class="text-primary">1堂</span>
                          </p>
                          <div class="d-flex flex-md-row flex-column gap-2">
                            <div class="w-150px">
                              <input
                                class="form-control border-light cursor-pointer jq-appointmentDate${l} ${r.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="${r.day}"
                                autocomplete="off"
                                data-courseId="${r.id}"
                                data-uid="${r.uid}"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${r.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${r.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${r.uid}"
                              id="change"
                            >
                              修改
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--  按鈕區塊 -->
                    <div
                      class="course-card-footer d-flex flex-lg-row justify-content-center gap-2 gap-sm-6 p-4 bg-secondary"
                      id="btnBlock"
                    >
                      <!-- 購買按鈕 -->
                      
                      ${u}
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                        data-course="${r.uid}"
                        data-courseId="${r.id}"
                        id="deleteCourse"
                      >
                        取消預約
                      </a>
                    </div>
                    <div
                      class="collapse course-card-footer p-4 bg-secondary"
                      id="save0"
                    >
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                        data-bs-toggle="collapse"
                        data-bs-target="#save0"
                        aria-expanded="false"
                        aria-controls="save0"
                        id="saveBtn"
                      >
                        儲存
                      </a>
                    </div>
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(r){const l=this;$(l).attr("id","datepicker-"+r),$(l).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){let u="";const v=document.querySelectorAll(`.${l.getAttribute("data-uid")}`)[1],f={...[...a][l.getAttribute("data-courseId")-1].teacher.openTime.find(g=>g.date===l.value)};if(console.log(f),Object.keys(f).length===0)return v.innerHTML="",0;f.time.filter(L=>!f.useTime.includes(L)).forEach(L=>{u+=`<option>${L}</option>`}),v.innerHTML=u}})})}),Ae.innerHTML=i,document.querySelectorAll("#change").forEach(r=>{r.addEventListener("click",l=>{let u=l.currentTarget.getAttribute("data-course"),v=`.${u}`;const x=document.querySelectorAll(v);x.forEach(g=>{g.toggleAttribute("disabled")}),l.currentTarget.classList.add("d-none");let f=document.querySelector(`#ready-${u}`);f||(f=document.querySelector(`#check-${u}`)),f.setAttribute("id",`save-${u}`),f.setAttribute("data-bs-toggle","modal"),f.setAttribute("data-bs-target","#checkModal"),f.removeAttribute("disabled"),f.textContent="儲存",x[0].addEventListener("input",g=>{}),f.addEventListener("click",()=>{const g=s.find(T=>T.uid===u),L=document.querySelector("#checkImg"),D=document.querySelector("#checkTeacherName"),j=document.querySelector("#checkName"),M=document.querySelector("#checkDate"),k=document.querySelector("#checkSubmit");k.setAttribute("data-bs-dismiss","modal"),L.setAttribute("src",`${g.teacher.avatar}`),D.textContent=g.teacher.name,j.textContent=g.name,M.textContent=`${x[0].value} ${x[1].value}`,k.setAttribute("data-uid",`${u}`),k.addEventListener("click",T=>{if(T.preventDefault(),k.getAttribute("data-uid")!==u)return 0;m.get(`https://project-code-json.onrender.com/user_courses/${b}`).then(B=>{const A=[...B.data.attendTime];let S=0;const P=A.find((z,ie)=>z.uid===u?(S=ie,!0):!1);A.splice(S,1),P.date=x[0].value,P.time=x[1].value,P.isCheck=!1,A.push(P),m.patch(`https://project-code-json.onrender.com/user_courses/${b}`,{attendTime:[...A]}).then(z=>{Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500}),K()}).catch(z=>{})})})})})}),document.querySelectorAll("#deleteCourse").forEach(r=>{r.addEventListener("click",l=>{l.preventDefault();const u=l.currentTarget.getAttribute("data-course"),v=l.currentTarget.getAttribute("data-courseId");m.get(`https://project-code-json.onrender.com/user_courses/${b}`).then(x=>{const f=[...x.data.attendTime];let g=0;f.find((D,j)=>D.uid===u?(g=j,!0):!1)&&(f.splice(g,1),m.get(`https://project-code-json.onrender.com/courses/${v}`).then(D=>{const j=D.data.teacherId,M=document.querySelectorAll(`.${u}`);m.get(`https://project-code-json.onrender.com/teachers/${j}`).then(k=>{const T=[...k.data.openTime],B=T.findIndex(S=>S.date===M[0].value),A=T[B].useTime.filter(S=>S!==M[1].value);T[B].useTime=A,m.patch(`https://project-code-json.onrender.com/teachers/${j}`,{opentime:[...T]}).then(S=>{}).catch(S=>{})})}),m.patch(`https://project-code-json.onrender.com/user_courses/${b}`,{attendTime:[...f]}).then(D=>{Swal.fire({icon:"success",title:"取消預約成功",showConfirmButton:!1,timer:1500}),K()}).catch(D=>{}))})})})}).catch(t=>{})}}).catch(e=>{})}K();const qe=document.querySelector("#morning"),Ee=document.querySelector("#afternoon"),Ce=document.querySelector("#evening");let oe="",N="",H="",R="";const _e=document.querySelector("#attendSubmit");let ee=[];_e.addEventListener("click",e=>{Ie(q,F,b,oe)});function O(e=document.querySelector(".book-card").getAttribute("data-courseid"),o){if(e!==""&&o!==""&&b!=="")m.get(`https://project-code-json.onrender.com/courses/${e}?_expand=teacher`).then(function(c){const p=c.data.teacher.openTime.filter(t=>t.date===o);if(p.length>0){let a=function(s){return p[0].useTime.find(n=>n===s)!==void 0};p[0].time.forEach(s=>{switch(Me(s)){case"上午":a(s)?N+=`<li class="btn-time  disable" data-time=${s}>${s}</li>`:N+=`<li class="btn-time" data-time=${s}>${s}</li>`;break;case"中午":a(s)?H+=`<li class="btn-time disable" data-time=${s}>${s}</li>`:H+=`<li class="btn-time" data-time=${s}>${s}</li>`;break;case"晚上":a(s)?R+=`<li class="btn-time disable" data-time=${s} >${s}</li>`:R+=`<li class="btn-time" data-time=${s}>${s}</li>`;break}})}qe.innerHTML=N,N="",Ee.innerHTML=H,H="",Ce.innerHTML=R,R="";const i=document.querySelectorAll(".btn-time");i.forEach(t=>{t.addEventListener("click",a=>{i.forEach(s=>{s.classList.remove("active")}),a.currentTarget.classList.add("active"),oe=a.target.getAttribute("data-time")})})});else return}function Ie(e,o,c,p){const i={uid:me(4),courseId:Number(e),date:o,time:p,isCheck:!1};m.get(`https://project-code-json.onrender.com/user_courses/${c}`).then(t=>{ee=[...t.data.attendTime],m.patch(`https://project-code-json.onrender.com/user_courses/${c}`,{attendTime:[...ee,i]}).then(a=>{Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500})}).catch(a=>{}),m.get(`https://project-code-json.onrender.com/courses/${i.courseId}`).then(a=>{const s=a.data.teacherId;m.get(`https://project-code-json.onrender.com/teachers/${s}`).then(n=>{const d=[...n.data.openTime],r=d.findIndex(l=>l.date===i.date);d[r].useTime.push(i.time),m.patch(`https://project-code-json.onrender.com/teachers/${s}`,{openTime:[...d]}).then(l=>{O(e,o)}).catch(l=>{})}).catch(n=>{})}).catch(a=>{})}).catch(t=>{})}function Me(e){const c=new Date(`2000-01-01 ${e}`).getHours();return c>=0&&c<12?"上午":c>=12&&c<18?"中午":"晚上"}const ce=document.querySelectorAll("#change"),Be=document.querySelectorAll("#saveBtn"),se=document.querySelectorAll("#btnBlock"),ne=document.querySelectorAll("#date"),re=document.querySelectorAll("#time");ce.forEach((e,o)=>{e.addEventListener("click",c=>{ne[o].toggleAttribute("disabled"),re[o].toggleAttribute("disabled"),se[o].classList.toggle("hidden"),e.toggleAttribute("disabled")})});Be.forEach((e,o)=>{e.addEventListener("click",c=>{ne[o].toggleAttribute("disabled"),re[o].toggleAttribute("disabled"),se[o].classList.toggle("hidden"),ce[o].toggleAttribute("disabled")})});const le=document.querySelectorAll(".js-couponPageArrow");let W=[],I=1,Q;Z();async function Pe(){let e=new Date().getTime();for(const o of W)if(new Date(o.dueDate).getTime()<e)try{await m.patch(`https://project-code-json.onrender.com/myCoupons/${o.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),Z()}catch(c){console.log("checkDueDate",c)}else de(),Ne()}async function Z(){try{const e=`https://project-code-json.onrender.com/myCoupons?_expand=coupon&canUse=true&userId=${b}&_page=${I}&_limit=6_sort=dueDate&_order=asc`,o=await m.get(e);if(o.data.length){const c=o.data.map(t=>t.coupon.teacherId===null?`https://project-code-json.onrender.com/coupons/${t.couponId}`:`https://project-code-json.onrender.com/coupons/${t.couponId}?_expand=teacher`),p=await Promise.all(c.map(t=>m.get(t)));o.data.forEach((t,a)=>{t.coupon=p[a].data}),W=o.data;const i=parseInt(o.headers.get("X-Total-Count"));Q=Math.ceil(i/6),Pe()}else de()}catch(e){console.log("getCoupons",e)}}function de(){const e=document.querySelector(".js-couponGroup");let o="";W.length?W.forEach(c=>{o+=`
            <li class="col drop-shadow">
              <div class="card border-x-wave h-100">
                <div class="row g-0 h-100">
                  <div class="col-3 d-flex align-items-center p-4 ${c.coupon.type==="allCourse"?"bg-primary":"bg-gray-300"}">
                  <img
                    class="img-fluid w-100 rounded-circle img-thumbnail border-0"
                    src="${c.coupon.type==="allCourse"?"https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/logo-img.svg":c.coupon.teacher.avatar}"
                    alt="teacher"
                  />
                  </div>
                  <div class="col-6">
                    <div class="card-body h-100 d-flex flex-column">
                      <h5 class="card-title fs-7 fs-sm-5 mb-2 mb-sm-4 truncate-lines-2">
                        ${c.coupon.title}
                      </h5>
                      <p class="card-text fs-sm fs-sm-7 mb-3 flex-grow-1">
                        ${c.coupon.info}
                      </p>
                      <p class="card-text">
                        <small
                          class="text-body-secondary d-flex align-items-center gap-1">
                          <span class="material-symbols-outlined">
                            update </span>
                          <time datetime="${new Date(c.dueDate).toLocaleDateString("en-CA")}">${new Date(c.dueDate).toLocaleDateString("en-CA")}</time>
                          失效
                        </small>
                      </p>
                    </div>
                  </div>
                  <div class="col-3 d-flex align-items-center pe-4">
                    <a
                      href="${c.coupon.type==="allCourse"?"course.html":`course_intro.html?courseId=${c.coupon.courseId}`}"
                      class="btn btn-secondary2 px-1 px-sm-4 w-100"
                      >${c.coupon.type==="allCourse"?"立即選購":"課程介紹"}</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):o+='<p class="text-center fs-5">目前沒有優惠券<p>',e.innerHTML=o}function Ne(){le.forEach((e,o,c)=>{Q>1?(e.classList.remove("d-none"),I===1?c[0].classList.add("disabled"):c[0].classList.remove("disabled"),I===Q?c[1].classList.add("disabled"):c[1].classList.remove("disabled")):e.classList.add("d-none")})}le.forEach((e,o)=>{e.addEventListener("click",c=>{c.preventDefault(),c.target.closest(".js-couponPageArrow").classList.contains("disabled")||(o===1?I++:Math.max(1,I--),Z())})});let y=1,E=[],C=0,U=[];const te=/\/[^/]+\.html/,He=te.test(X)?X.replace(te,"/course_intro.html"):X+"course_intro.html",Y=document.querySelector("#followList");Y&&pe(Y);document.addEventListener("DOMContentLoaded",async function(){async function e(){try{E=(await m.get(`https://project-code-json.onrender.com/users/${b}`)).data.followList,C=Math.ceil(E.length/6);let a="";if(E.length!=0){let s=`https://project-code-json.onrender.com/courses?_expand=teacher&_page=${y}&_limit=6`;E.forEach(d=>{s+=`&id=${d}`}),U=(await m.get(`${s}`)).data,U.forEach(d=>{a+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 following"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${d.id}"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${d.name}
        </h5>
        <p class="teacher-card-name">${d.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${d.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${d.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${d.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${d.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${d.id}"
        data-bs-target="#loginModal"
        ${ue?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${He}?courseId=${d.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div></div>`}),Y.innerHTML=a,o(),c(),p()}else a='<p class="text-center fs-5">目前沒有收藏任何課程</p>',Y.innerHTML=a,o()}catch(t){console.log("錯誤",t)}}e();function o(){const t=document.querySelector(".followPagination");let a="";if(C){const s=`<li class="page-item prevButton ${y==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;a+=s;for(let d=1;d<=C;d++){let r=`<li class="page-item ${d===y?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${d}
                          </a>
                        </li>`;a+=r}const n=`<li class="page-item nextButton ${y==C?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;a+=n}t.innerHTML=a}function c(){const t=document.querySelector(".prevButton"),a=document.querySelector(".nextButton");let s=document.querySelectorAll(".pageButton");t.addEventListener("click",function(){y>1&&(y--,o(),e())}),a.addEventListener("click",function(){C>y&&(y++,o(),e())}),s.forEach(n=>{n.addEventListener("click",()=>{y=Number(n.innerText),e(),o()})})}function p(){document.querySelectorAll(".following").forEach(a=>{a.addEventListener("click",s=>{i(s)})})}async function i(t){let a=t.target.dataset.buttonid;console.log("buttonId",a);let s=E.filter(n=>n!=a);Swal.fire({title:"確定要取消收藏?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消收藏",denyButtonText:"我再想想"}).then(n=>{n.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消收藏",showConfirmButton:!1,timer:1500}),m.patch(`https://project-code-json.onrender.com/users/${b}`,{followList:s}).then(async d=>{await e(),console.log(U),U.length==0&&(y--,e())}))})}});
