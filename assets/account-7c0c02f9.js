import{a as m,u as v,s as g,c as X,i as me}from"./main-56a0edac.js";import"./openTime-f6403d24.js";import{g as pe}from"./helper-ae07f62d.js";import{h as fe}from"./startCourse-2965939b.js";let I=[];const he=document.querySelector("#userName"),ge=document.querySelector("#userRole"),be=document.querySelector("#userImg"),$e=document.querySelector("#PreviousWeek"),ve=document.querySelector("#NextWeek"),ye=document.querySelector("#courseTeacherName"),we=document.querySelector("#courseName"),xe=document.querySelector("#dateTime");function Se(){m.get(`https://project-code-json.onrender.com/user_courses?_expand=user&userId=${v.toString()}`).then(function(e){I=e.data[0],be.setAttribute("src",I.user.avatar),he.textContent=I.user.name,ge.textContent=I.user.role,Z()})}function Z(){document.querySelectorAll(".calendar-time").forEach(i=>{let t=i.getAttribute("data-num"),s=o(t),c="";if(s.length!==0)for(let r=0;r<s.length;r++)c+=`<li class="c2"><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${s[r].courseId}"
                id="viewCourse">
                ${s[r].time}
                </a></li>`;i.innerHTML=c}),document.querySelectorAll("#viewCourse").forEach(i=>{let t=i.getAttribute("data-course-id");i.addEventListener("click",()=>{p(t)})});function o(i){return I.attendTime.filter(t=>t.date===i)}function p(i){let t=[];m.get(`https://project-code-json.onrender.com/courses/${i.toString()}?_expand=teacher`).then(function(s){t=s.data,ye.textContent=t.teacher.name,we.textContent=t.name,xe.innerHTML=""})}}const Te=document.querySelectorAll("#viewCourse");Te.forEach(e=>{let a=e.getAttribute("data-course-id");e.addEventListener("click",()=>{getCourse(a)})});$e.addEventListener("click",Z);ve.addEventListener("click",Z);Se();const De=document.querySelector(".days"),Le=document.querySelector(".current-date"),je=document.querySelectorAll(".icons span");let F="",x=new Date().getFullYear(),h=new Date().getMonth(),E="";const ke=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],se=()=>{let a=new Date(x,h,1).getDay(),o=new Date(x,h+1,0).getDate(),p=new Date(x,h,o).getDay(),i=new Date(x,h,0).getDate(),t="";for(let r=a;r>0;r--)t+=`<li class="inactive">${i-r+1}</li>`;for(let r=1;r<=o;r++){let d=r===new Date().getDate()&&h===new Date().getMonth()&&x===new Date().getFullYear()?"active":"",n=`${x}/${String(h+1).padStart(2,"0")}/${String(r).padStart(2,"0")}`;t+=`<li class="${d}" data-day="${n}">${r}</li>`}for(let r=p;r<6;r++)t+=`<li class="inactive">${r-p+1}</li>`;Le.innerText=`${ke[h]} ${x}`,De.innerHTML=t;const s=document.querySelectorAll(".days li"),c=r=>{s.forEach(d=>d.classList.remove("active")),r.classList.add("active")};s.forEach(r=>{r.addEventListener("click",d=>{c(d.currentTarget),F=d.target.getAttribute("data-day"),E||(E=document.querySelector(".book-card").getAttribute("data-courseid")),O(E,F)})})};se();je.forEach(e=>{e.addEventListener("click",()=>{h=e.id==="prev"?h-1:h+1,(h<0||h>11)&&(x=e.id==="prev"?x-1:x+1,h=h<0?11:0),se()})});const Ae=document.querySelector("#appointment_list"),qe=document.querySelector("#course-management");let ee={},J=[];function Q(){m.get(`https://project-code-json.onrender.com/user_courses?userId=${v.toString()}`).then(function(e){ee=[...e.data[0].purchased],J=[...e.data[0].attendTime],J.forEach(p=>{p.day=p.date,delete p.date}),a(ee),o(J);function a(p){let i="";m.get("https://project-code-json.onrender.com/courses?_expand=teacher").then(function(t){const s=t.data;p.map(l=>{const u=s.find(y=>l.courseId===y.id);return u?{...l,...u}:l}).forEach(l=>{i+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),Ae.innerHTML=i;const r=document.querySelectorAll(".book-card"),d=document.querySelector(".book-card");var n=new Date;O(d.getAttribute("data-courseId"),`${n.getFullYear()}/${n.getMonth()+1}/${n.getDate()}`),d.classList.add("active"),r.forEach(l=>{l.addEventListener("click",u=>{r.forEach(y=>{y.classList.remove("active")}),u.currentTarget.classList.add("active"),E=u.currentTarget.getAttribute("data-courseId"),O(E,F)})})}).catch(t=>{g("發生錯誤，請稍後再試")})}function o(p){let i="";m.get("https://project-code-json.onrender.com/courses?_expand=teacher").then(function(t){const s=t.data,c=p.map(n=>{const l=s.find(u=>n.courseId===u.id);return l?{...n,...l}:n});c.forEach((n,l)=>{if(n.teacher===void 0)return;let u="";n.isCheck?u=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${n.uid}"
                  >
                    即將上課
                  </button>`:u=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${n.uid}"
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
                              src="${n.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${n.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${n.name}
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
                                class="form-control border-light cursor-pointer jq-appointmentDate${l} ${n.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="${n.day}"
                                autocomplete="off"
                                data-courseId="${n.id}"
                                data-uid="${n.uid}"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${n.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${n.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${n.uid}"
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
                        data-course="${n.uid}"
                        data-courseId="${n.id}"
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(n){const l=this;$(l).attr("id","datepicker-"+n),$(l).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){let u="";const y=document.querySelectorAll(`.${l.getAttribute("data-uid")}`)[1],f={...[...s][l.getAttribute("data-courseId")-1].teacher.openTime.find(b=>b.date===l.value)};if(Object.keys(f).length===0)return y.innerHTML="",0;f.time.filter(j=>!f.useTime.includes(j)).forEach(j=>{u+=`<option>${j}</option>`}),y.innerHTML=u}})})}),qe.innerHTML=i,document.querySelectorAll("#change").forEach(n=>{n.addEventListener("click",l=>{let u=l.currentTarget.getAttribute("data-course"),y=`.${u}`;const S=document.querySelectorAll(y);S.forEach(b=>{b.toggleAttribute("disabled")}),l.currentTarget.classList.add("d-none");let f=document.querySelector(`#ready-${u}`);f||(f=document.querySelector(`#check-${u}`)),f.setAttribute("id",`save-${u}`),f.setAttribute("data-bs-toggle","modal"),f.setAttribute("data-bs-target","#checkModal"),f.removeAttribute("disabled"),f.textContent="儲存",f.addEventListener("click",()=>{const b=c.find(T=>T.uid===u),j=document.querySelector("#checkImg"),L=document.querySelector("#checkTeacherName"),k=document.querySelector("#checkName"),B=document.querySelector("#checkDate"),A=document.querySelector("#checkSubmit");A.setAttribute("data-bs-dismiss","modal"),j.setAttribute("src",`${b.teacher.avatar}`),L.textContent=b.teacher.name,k.textContent=b.name,B.textContent=`${S[0].value} ${S[1].value}`,A.setAttribute("data-uid",`${u}`),A.addEventListener("click",T=>{if(T.preventDefault(),A.getAttribute("data-uid")!==u)return 0;m.get(`https://project-code-json.onrender.com/user_courses/${v}`).then(P=>{const q=[...P.data.attendTime];let D=0;const N=q.find((z,ue)=>z.uid===u?(D=ue,!0):!1);q.splice(D,1),N.date=S[0].value,N.time=S[1].value,N.isCheck=!1,q.push(N),m.patch(`https://project-code-json.onrender.com/user_courses/${v}`,{attendTime:[...q]}).then(z=>{Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500}),Q()}).catch(z=>{g("發生錯誤，請稍後再試")})})})})})}),document.querySelectorAll("#deleteCourse").forEach(n=>{n.addEventListener("click",l=>{l.preventDefault();const u=l.currentTarget.getAttribute("data-course"),y=l.currentTarget.getAttribute("data-courseId");m.get(`https://project-code-json.onrender.com/user_courses/${v}`).then(S=>{const f=[...S.data.attendTime];let b=0;f.find((L,k)=>L.uid===u?(b=k,!0):!1)&&(f.splice(b,1),m.get(`https://project-code-json.onrender.com/courses/${y}`).then(L=>{const k=L.data.teacherId,B=document.querySelectorAll(`.${u}`);m.get(`https://project-code-json.onrender.com/teachers/${k}`).then(A=>{const T=[...A.data.openTime],P=T.findIndex(D=>D.date===B[0].value),q=T[P].useTime.filter(D=>D!==B[1].value);T[P].useTime=q,m.patch(`https://project-code-json.onrender.com/teachers/${k}`,{opentime:[...T]}).then(D=>{}).catch(D=>{g("發生錯誤，請稍後再試")})})}),m.patch(`https://project-code-json.onrender.com/user_courses/${v}`,{attendTime:[...f]}).then(L=>{Swal.fire({icon:"success",title:"取消預約成功",showConfirmButton:!1,timer:1500}),Q()}).catch(L=>{g("發生錯誤，請稍後再試")}))})})})}).catch(t=>{g("發生錯誤，請稍後再試")})}}).catch(e=>{g("發生錯誤，請稍後再試")})}Q();const Ee=document.querySelector("#morning"),Ce=document.querySelector("#afternoon"),_e=document.querySelector("#evening");let ce="",H="",R="",U="";const Ie=document.querySelector("#attendSubmit");let te=[];Ie.addEventListener("click",e=>{Me(E,F,v,ce)});function O(e=document.querySelector(".book-card").getAttribute("data-courseid"),a){if(e!==""&&a!==""&&v!=="")m.get(`https://project-code-json.onrender.com/courses/${e}?_expand=teacher`).then(function(o){const p=o.data.teacher.openTime.filter(t=>t.date===a);if(p.length>0){let s=function(c){return p[0].useTime.find(r=>r===c)!==void 0};p[0].time.forEach(c=>{switch(Be(c)){case"上午":s(c)?H+=`<li class="btn-time  disable" data-time=${c}>${c}</li>`:H+=`<li class="btn-time" data-time=${c}>${c}</li>`;break;case"中午":s(c)?R+=`<li class="btn-time disable" data-time=${c}>${c}</li>`:R+=`<li class="btn-time" data-time=${c}>${c}</li>`;break;case"晚上":s(c)?U+=`<li class="btn-time disable" data-time=${c} >${c}</li>`:U+=`<li class="btn-time" data-time=${c}>${c}</li>`;break}})}Ee.innerHTML=H,H="",Ce.innerHTML=R,R="",_e.innerHTML=U,U="";const i=document.querySelectorAll(".btn-time");i.forEach(t=>{t.addEventListener("click",s=>{i.forEach(c=>{c.classList.remove("active")}),s.currentTarget.classList.add("active"),ce=s.target.getAttribute("data-time")})})});else return}function Me(e,a,o,p){const i={uid:pe(4),courseId:Number(e),date:a,time:p,isCheck:!1};m.get(`https://project-code-json.onrender.com/user_courses/${o}`).then(t=>{te=[...t.data.attendTime],m.patch(`https://project-code-json.onrender.com/user_courses/${o}`,{attendTime:[...te,i]}).then(s=>{Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500})}).catch(s=>{g("發生錯誤，請稍後再試")}),m.get(`https://project-code-json.onrender.com/courses/${i.courseId}`).then(s=>{const c=s.data.teacherId;m.get(`https://project-code-json.onrender.com/teachers/${c}`).then(r=>{const d=[...r.data.openTime],n=d.findIndex(l=>l.date===i.date);d[n].useTime.push(i.time),m.patch(`https://project-code-json.onrender.com/teachers/${c}`,{openTime:[...d]}).then(l=>{O(e,a)}).catch(l=>{g("發生錯誤，請稍後再試")})}).catch(r=>{g("發生錯誤，請稍後再試")})}).catch(s=>{g("發生錯誤，請稍後再試")})}).catch(t=>{g("發生錯誤，請稍後再試")})}function Be(e){const o=new Date(`2000-01-01 ${e}`).getHours();return o>=0&&o<12?"上午":o>=12&&o<18?"中午":"晚上"}const oe=document.querySelectorAll("#change"),Pe=document.querySelectorAll("#saveBtn"),re=document.querySelectorAll("#btnBlock"),ne=document.querySelectorAll("#date"),le=document.querySelectorAll("#time");oe.forEach((e,a)=>{e.addEventListener("click",o=>{ne[a].toggleAttribute("disabled"),le[a].toggleAttribute("disabled"),re[a].classList.toggle("hidden"),e.toggleAttribute("disabled")})});Pe.forEach((e,a)=>{e.addEventListener("click",o=>{ne[a].toggleAttribute("disabled"),le[a].toggleAttribute("disabled"),re[a].classList.toggle("hidden"),oe[a].toggleAttribute("disabled")})});const de=document.querySelectorAll(".js-couponPageArrow");let W=[],M=1,V;G();async function Ne(){let e=new Date().getTime();for(const a of W)if(new Date(a.dueDate).getTime()<e)try{await m.patch(`https://project-code-json.onrender.com/myCoupons/${a.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),G()}catch{g("發生錯誤，請稍後再試")}else ie(),He()}async function G(){try{const e=`https://project-code-json.onrender.com/myCoupons?_expand=coupon&canUse=true&userId=${v}&_page=${M}&_limit=6_sort=dueDate&_order=asc`,a=await m.get(e);if(a.data.length){const o=a.data.map(t=>t.coupon.teacherId===null?`https://project-code-json.onrender.com/coupons/${t.couponId}`:`https://project-code-json.onrender.com/coupons/${t.couponId}?_expand=teacher`),p=await Promise.all(o.map(t=>m.get(t)));a.data.forEach((t,s)=>{t.coupon=p[s].data}),W=a.data;const i=parseInt(a.headers.get("X-Total-Count"));V=Math.ceil(i/6),Ne()}else ie()}catch{g("發生錯誤，請稍後再試")}}function ie(){const e=document.querySelector(".js-couponGroup");let a="";W.length?W.forEach(o=>{a+=`
            <li class="col drop-shadow">
              <div class="card border-x-wave h-100">
                <div class="row g-0 h-100">
                  <div class="col-3 d-flex align-items-center p-4 ${o.coupon.type==="allCourse"?"bg-primary":"bg-gray-300"}">
                  <img
                    class="img-fluid w-100 rounded-circle img-thumbnail border-0"
                    src="${o.coupon.type==="allCourse"?"https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/logo-img.svg":o.coupon.teacher.avatar}"
                    alt="teacher"
                  />
                  </div>
                  <div class="col-6">
                    <div class="card-body h-100 d-flex flex-column">
                      <h5 class="card-title fs-7 fs-sm-5 mb-2 mb-sm-4 truncate-lines-2">
                        ${o.coupon.title}
                      </h5>
                      <p class="card-text fs-sm fs-sm-7 mb-3 flex-grow-1">
                        ${o.coupon.info}
                      </p>
                      <p class="card-text">
                        <small
                          class="text-body-secondary d-flex align-items-center gap-1">
                          <span class="material-symbols-outlined">
                            update </span>
                          <time datetime="${new Date(o.dueDate).toLocaleDateString("en-CA")}">${new Date(o.dueDate).toLocaleDateString("en-CA")}</time>
                          失效
                        </small>
                      </p>
                    </div>
                  </div>
                  <div class="col-3 d-flex align-items-center pe-4">
                    <a
                      href="${o.coupon.type==="allCourse"?"course.html":`course_intro.html?courseId=${o.coupon.courseId}`}"
                      class="btn btn-secondary2 px-1 px-sm-4 w-100"
                      >${o.coupon.type==="allCourse"?"立即選購":"課程介紹"}</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):a+='<p class="text-center fs-5">目前沒有優惠券<p>',e.innerHTML=a}function He(){de.forEach((e,a,o)=>{V>1?(e.classList.remove("d-none"),M===1?o[0].classList.add("disabled"):o[0].classList.remove("disabled"),M===V?o[1].classList.add("disabled"):o[1].classList.remove("disabled")):e.classList.add("d-none")})}de.forEach((e,a)=>{e.addEventListener("click",o=>{o.preventDefault(),o.target.closest(".js-couponPageArrow").classList.contains("disabled")||(a===1?M++:Math.max(1,M--),G())})});let w=1,C=[],_=0,K=[];const ae=/\/[^/]+\.html/,Re=ae.test(X)?X.replace(ae,"/course_intro.html"):X+"course_intro.html",Y=document.querySelector("#followList");Y&&fe(Y);document.addEventListener("DOMContentLoaded",async function(){async function e(){try{C=(await m.get(`https://project-code-json.onrender.com/users/${v}`)).data.followList,_=Math.ceil(C.length/6);let s="";if(C.length!=0){let c=`https://project-code-json.onrender.com/courses?_expand=teacher&_page=${w}&_limit=6`;C.forEach(d=>{c+=`&id=${d}`}),K=(await m.get(`${c}`)).data,K.forEach(d=>{s+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
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
        ${me?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${Re}?courseId=${d.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div></div>`}),Y.innerHTML=s,a(),o(),p()}else s='<p class="text-center fs-5">目前沒有收藏任何課程</p>',Y.innerHTML=s,a()}catch{g("發生錯誤，請稍後再試")}}e();function a(){const t=document.querySelector(".followPagination");let s="";if(_){const c=`<li class="page-item prevButton ${w==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;s+=c;for(let d=1;d<=_;d++){let n=`<li class="page-item ${d===w?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${d}
                          </a>
                        </li>`;s+=n}const r=`<li class="page-item nextButton ${w==_?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;s+=r}t.innerHTML=s}function o(){const t=document.querySelector(".prevButton"),s=document.querySelector(".nextButton");let c=document.querySelectorAll(".pageButton");t.addEventListener("click",function(){w>1&&(w--,a(),e())}),s.addEventListener("click",function(){_>w&&(w++,a(),e())}),c.forEach(r=>{r.addEventListener("click",()=>{w=Number(r.innerText),e(),a()})})}function p(){document.querySelectorAll(".following").forEach(s=>{s.addEventListener("click",c=>{i(c)})})}async function i(t){let s=t.target.dataset.buttonid,c=C.filter(r=>r!=s);Swal.fire({title:"確定要取消收藏?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消收藏",denyButtonText:"我再想想"}).then(r=>{r.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消收藏",showConfirmButton:!1,timer:1500}),m.patch(`https://project-code-json.onrender.com/users/${v}`,{followList:c}).then(async d=>{await e(),K.length==0&&(w--,e())}))})}});
