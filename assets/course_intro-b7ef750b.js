import{c as z,a as y,i as q,s as E}from"./main-56a0edac.js";import{h as _}from"./startCourse-2965939b.js";import"./openTime-f6403d24.js";let r=[];const N=new URLSearchParams(window.location.search),b=N.get("courseId"),R=document.querySelector("#teacherImg"),W=document.querySelector("#teacher_name"),F=document.querySelector("#course_title"),U=document.querySelector("#courseClass"),V=document.querySelector("#course_info"),G=document.querySelector("#teacher_degree"),Q=document.querySelector("#teacher_experience"),J=document.querySelector("#language"),K=document.querySelector("#level"),O=document.querySelector("#intro"),X=document.querySelector("#youCanGet"),Y=document.querySelector("#PreviousWeek"),Z=document.querySelector("#NextWeek");function ee(){y.get(`https://project-code-json.onrender.com/courses/${b.toString()}?_expand=teacher`).then(function(e){let n="";r=e.data,R.setAttribute("src",r.teacher.avatar),W.textContent=r.teacher.name,F.textContent=r.name,U.textContent=r.topics,V.textContent=r.info,G.textContent=r.teacher.education,Q.textContent=r.teacher.experience,J.textContent=r.teacher.lang.join("/"),K.textContent=r.level,O.innerHTML=r.teacher.intro.replace(/\r\n\r\n/g,"<br><br>"),r.mainPoints.forEach(a=>{n+=`<li class="list-decorate ps-4 position-relative">
          ${a}
        </li>`}),X.innerHTML=n,C(),se(),te()})}function C(){document.querySelectorAll(".calendar-time").forEach(t=>{let i=t.getAttribute("data-num"),c=a(i),s="";c.length!==0&&(c[0].time.forEach(l=>{c[0].useTime.find(d=>l===d)?s+=`<li><a class="text-primary deleteDefault" href=''>${l}</a></li>`:s+=`<li><a href=''  class="deleteDefault">${l}</a></li>`}),t.innerHTML=s)}),document.querySelectorAll(".deleteDefault").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault()})});function a(t){return r.teacher.openTime.filter(i=>i.date===t)}}ee();Y.addEventListener("click",()=>{C()});Z.addEventListener("click",()=>{C()});let p=[];async function te(){try{const e=`https://project-code-json.onrender.com/comments?courseId=${b.toString()}&_expand=user`,{data:n}=await y.get(e);p=n;const a=n.length;if(ae(),a){const t=ie(n);D(t.slice(0,2).join("")),ne(t.join(""))}else D('<p class="text-center fs-5">目前沒有評論</p>')}catch{E("發生錯誤，請稍後再試")}}function ae(){const e=(p.reduce((t,i)=>t+=i.rate,0)/p.length).toFixed(1),n=document.querySelector(".js-ratingScore");let a="";for(let t=1;t<=e;t++)a+='<li class="star"><span class="material-symbols-outlined"> star </span></li>';a+=`<li class="star"><span>${e}</span>/5</li>`,n.innerHTML=a}function D(e){const n=document.querySelector(".js-comment");n.innerHTML=e;const a=document.querySelector('button[data-bs-target="#courseTalk"]');p.length?a.textContent+=`(${p.length})`:a.classList.add("d-none")}function ne(e){const n=document.querySelector("#courseTalk .modal-body");n.innerHTML=e}function ie(e){return e.map(n=>{let a="";for(let t=1;t<=n.rate;t++)a+='<img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />';return`<ul class="card-evaluate">
    <li class="card-evaluate-content mb-lg-5">
      ${n.content}
    </li>
    <li class="card-evaluate-person flex-lg-row flex-row-reverse">
      <img
        class="w-60px h-60px"
        src="${n.user.avatar}"
        alt=""
      />
      <div class="d-flex flex-column">
        <div class="text-primary d-flex align-items-center">
         ${a}
        </div>
        <div class="align-bottom">
          <p class="card-evaluate-name">
          ${n.user.name}<span class="ms-1 card-evaluate-title">${n.user.title}</span>
          </p>
        </div>
      </div>
    </li>
  </ul>`})}const B=document.querySelector(".js-appointList");_(B);async function se(){try{const e=`https://project-code-json.onrender.com/coupons?courseId=${b.toString()}`,a=(await y.get(e)).data,{price:t}=r,i=[{quantity:1,price:t,duration:r.duration},...a.filter(c=>c.discountCourseNum>1).map(c=>({quantity:c.discountCourseNum,price:parseInt(t)*parseFloat(c.discount),duration:r.duration}))];re(i)}catch{E("發生錯誤，請稍後再試")}}function re(e){const n=/\B(?=(?:\d{3})+(?!\d))/g;let a=e.map(i=>`<li
  class="py-4 d-flex justify-content-between align-items-center border-bottom border-gray-200"
>
  <div>
    <p class="fs-4 fw-bold">NT$ ${i.price.toString().replace(n,",")}</p>
    <p>${i.quantity} 堂 ${i.duration} 分鐘</p>
  </div>
  <a type="button" class="btn btn-text" 
      data-course="${b}" 
      ${i.quantity>1?`data-quantity="${i.quantity}"`:""} 
      data-bs-target="#loginModal"
      ${q?"":'data-bs-toggle="modal"'}
    >立即預約</a
  >
</li>`).join("");a+=`<li
  class="py-4 d-flex justify-content-between align-items-center"
>
  <div>
    <p class="fs-4 fw-bold">洽談報價</p>
    <p>客製化課程/專案製作</p>
  </div>
  <button
    type="button"
    class="btn btn-text"
    data-bs-toggle="offcanvas"
    data-bs-target="#message-mike"
    aria-controls="message-mike"
    aria-current="page"
    data-bs-target="#message-list"
    aria-controls="#message-list"
    data-bs-target="#loginModal"
    ${q?'data-bs-toggle="offcanvas"':'data-bs-toggle="modal"'}
  >
    立即洽談
  </button>
</li>`,B.innerHTML=a}const ce=z.replace(/html.*/,"html");y.get("https://project-code-json.onrender.com/courses?_expand=teacher").then(e=>{let t=e.data.filter(s=>s.badges.includes("熱門")).slice(0,7),i="";const c=document.querySelector(".recommend-swiper");t.forEach(s=>{i+=`<div class="card teacher-card swiper-slide">
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${s.name}
        </h5>
        <p class="teacher-card-name">${s.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${s.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${s.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${s.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${s.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${s.id}"
        data-bs-target="#loginModal"
        ${q?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${ce}?courseId=${s.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),c.innerHTML=i});_(document.querySelector(".recommend-swiper"));const oe=document.querySelector("#redirectPopular");oe.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});(function(e){e.fn.circliful=function(n){var a=e.extend({foregroundColor:"#556b2f",backgroundColor:"#eee",fillColor:!1,width:15,dimension:200,size:15,percent:50,animationStep:1},n);return this.each(function(){var t="",i="",c="",s="",l=0,d=100,x="",S="",f="",m=0;e(this).addClass("circliful"),e(this).data("dimension")!=null?t=e(this).data("dimension"):t=a.dimension,e(this).data("width")!=null?s=e(this).data("width"):s=a.width,e(this).data("fontsize")!=null?l=e(this).data("fontsize"):l=a.size,e(this).data("percent")!=null?(e(this).data("percent")/100,d=e(this).data("percent")):a.percent/100,e(this).data("fgcolor")!=null?x=e(this).data("fgcolor"):x=a.foregroundColor,e(this).data("bgcolor")!=null?S=e(this).data("bgcolor"):S=a.backgroundColor,e(this).data("animation-step")!=null?m=parseFloat(e(this).data("animation-step")):m=a.animationStep,e(this).data("text")!=null?(i=e(this).data("text"),e(this).data("icon")!=null&&(f='<i class="fa '+e(this).data("icon")+'"></i>'),e(this).data("type")!=null?(h=e(this).data("type"),h=="half"?(e(this).append('<span class="circle-text-half">'+f+i+"</span>"),e(this).find(".circle-text-half").css({"line-height":t/1.45+"px","font-size":l+"px"})):(e(this).append('<span class="circle-text">'+f+i+"</span>"),e(this).find(".circle-text").css({"line-height":t+"px","font-size":l+"px"}))):(e(this).append('<span class="circle-text">'+f+i+"</span>"),e(this).find(".circle-text").css({"line-height":t+"px","font-size":l+"px"}))):e(this).data("icon")!=null,e(this).data("info")!=null&&(c=e(this).data("info"),e(this).data("type")!=null?(h=e(this).data("type"),h=="half"?(e(this).append('<span class="circle-info-half">'+c+"</span>"),e(this).find(".circle-info-half").css({"line-height":t*.9+"px"})):(e(this).append('<span class="circle-info">'+c+"</span>"),e(this).find(".circle-info").css({"line-height":t*1.25+"px"}))):(e(this).append('<span class="circle-info">'+c+"</span>"),e(this).find(".circle-info").css({"line-height":t*1.25+"px"}))),e(this).width(t+"px");var u=e("<canvas></canvas>").attr({width:t,height:t}).appendTo(e(this)).get(0),o=u.getContext("2d"),M=u.width/2,P=u.height/2,j=u.width/2.5,k=2.3*Math.PI,L=0,g=m===0?d:0,A=Math.max(m,0),I=Math.PI*2,w=Math.PI/2,h="",v=!1;if(e(this).data("type")!=null&&(h=e(this).data("type"),h=="half"))var k=2*Math.PI,L=3.13,I=Math.PI*1,w=Math.PI/.996;e(this).data("fill")!=null?v=e(this).data("fill"):v=a.fillColor;function T(H){o.clearRect(0,0,u.width,u.height),o.beginPath(),o.arc(M,P,j,L,k,!1),o.lineWidth=s-1,o.strokeStyle=S,o.stroke(),v&&(o.fillStyle=v,o.fill()),o.beginPath(),o.arc(M,P,j,-w,I*H-w,!1),o.lineWidth=s,o.strokeStyle=x,o.stroke(),g<d&&(g+=A,T(Math.min(g,d)/100))}T(g/100)})}})(jQuery);$(function(){$("#myStat").circliful(),$("#myStat1").circliful(),$("#myStat2").circliful()});
