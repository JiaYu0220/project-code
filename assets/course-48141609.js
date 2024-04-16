import{c as re,i as k,h as ce,a as g,u as N,b as le,d as ne,s as _}from"./main-56a0edac.js";import{h as oe}from"./startCourse-2965939b.js";let B=document.querySelector("#js-filter-bar"),U=document.querySelector("#js-sticky-mt");const W=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let e;window.innerWidth<375?e=120:window.innerWidth<768?e=300:e=418,window.scrollY<e?(B.style.boxShadow="",U.style.marginTop="",W.style.display="block"):(B.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",U.style.marginTop="78px",W.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const X=document.querySelectorAll(".js-selectedFiltersNum");let u=0;const F=document.querySelectorAll('input[name="filterStar"]'),f=document.querySelector("input[name='minPrice']"),p=document.querySelector("input[name='maxPrice']");let ie=document.querySelector("#accordionFilter");const Y=document.querySelectorAll(".js-category"),de=document.querySelector(".js-delFilterBtn");function j(){s.page=1,P(),i(s),K(),je(s)}function ue(){s.page=1,P(),i(s),K()}F.forEach(e=>{e.addEventListener("change",a=>{fe(a.target.id)})});function fe(e){s.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[e],ue()}f.addEventListener("change",Z);p.addEventListener("change",Z);function Z(){const e=parseInt(this.value.trim());let a,t;this===f?(a=M,t=s.price_gte):this===p&&(a=D,t=s.price_lte),isNaN(e)?(this===f?s.price_gte=a:this===p&&(s.price_lte=a),j()):e!==t&&(this===f?s.price_gte=e:this===p&&(s.price_lte=e),j())}const G=sessionStorage.getItem("cateItemName");G&&document.addEventListener("DOMContentLoaded",pe);function pe(){const e=document.querySelector(`#${G}`);e.checked=!0,J(e),sessionStorage.removeItem("cateItemName")}ie.addEventListener("change",e=>J(e.target));function J(e){if(e.classList.contains("js-selectAll")){const a=e.checked,t=document.querySelectorAll(`input[id^="${e.name}"]:not([id="${e.name}"])`);t.length&&t.forEach(c=>{c.checked=a})}else if(e.type="checkbox"){const a=e.closest(".accordion-item").querySelector(".js-selectAll"),t=e.closest(".accordion-body").querySelectorAll(".js-category");be(a,t)}me(),j()}function me(){s.filters="";let e="",a="";Y.forEach(t=>{t.checked&&(t.value==="入門"||t.value==="進階"?(a=`&level_like=${t.value}`,s.filters+=a):(ge(t.value)?(e=`&categories_like=\\b${t.value}\\b`,t.value==="C"&&(e+="(?!%23)")):e=`&categories_like=${he(t.value)}`,s.filters+=e))})}function ge(e){return/^[a-zA-Z]+$/.test(e)}function he(e){return e.replace(/[!@#$%^&*()\s]/g,function(a){return encodeURIComponent(a)})}function be(e,a){const t=[...a];e.checked=t.every(c=>c.checked)}function K(){F[0].checked||u++,(f.value||p.value)&&u++,Y.forEach(e=>{e.checked&&u++}),X.forEach(e=>e.innerHTML=u),u=0}function Q(e){const a=document.querySelectorAll(".js-filterRatingNum"),t=a.length,c={5:0,4:0,3:0,2:0,1:0};e.forEach(r=>{const l=Math.floor(parseFloat(r.rate));if(l>=1)for(let n=1;n<=l;n++)c[n]++});for(let r=0;r<t;r++)a[r].innerHTML=`(${c[t-r]} 筆)`}function ye(e){const a=document.querySelectorAll("[data-category]"),t=a.length,c={};for(let r=0;r<a.length;r++){let l=a[r].dataset.category;c[l]=0}e.forEach(r=>{r.categories.forEach(l=>{c[l]++}),c[r.level]++});for(let r=0;r<t;r++){let l=a[r].dataset.category;a[r].innerHTML=`(${c[l]})`}}de.addEventListener("click",xe);function xe(){f.value="",p.value="",F[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(a=>a.checked=!1),s.rate_gte=0,s.rate_lte=5,s.price_gte=M,s.price_lte=D,s.filters="",$e(),j()}function $e(){u=0,X.forEach(e=>e.innerHTML=u)}function P(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const ee=document.querySelector(".pagination");ee.addEventListener("click",e=>{const a=e.target.closest("[data-page]");if(a){e.preventDefault();const{page:t}=a.dataset;switch(t){case"prev":s.page-=1;break;case"next":s.page+=1;break;default:s.page=Number(t)}i(s),P()}});const A=document.querySelector("#courseList"),ve=re.replace("course","course_intro");A&&oe(A);function z(){const e=document.querySelectorAll("input");E?e.forEach(a=>{a.disabled=!0}):e.forEach(a=>{a.disabled=!1})}function O(){Se();let e="";E?e+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:x.length!==0?x.forEach(async t=>{var c,r,l,n,h,$,v,b,y,w,S,o,L,H,R;e+=`
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn ${m.includes(t.id)?"following":"not-follow"}"
                  data-bs-target="#loginModal"
                  ${k?"":'data-bs-toggle="modal"'}
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold ${m.includes(t.id)?"fw-bold":""}" data-buttonId="${t.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${(c=t.teacher)==null?void 0:c.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(r=t.teacher)==null?void 0:r.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${(l=t.teacher)==null?void 0:l.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" />
                    <span class="fw-bold me-1"> ${(n=t.teacher)==null?void 0:n.rate} </span>
                    講師評等
                  </li>
                  <li>${(h=t.teacher)==null?void 0:h.total_students} 位學生</li>
                  <li>${($=t.teacher)==null?void 0:$.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${(v=t.teacher)==null?void 0:v.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${(b=t.teacher)==null?void 0:b.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${(y=t.teacher)==null?void 0:y.links_linkedin}" class="p-1" target="_blank">
                      <i class="fa-brands fa-codepen"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!--  課程區塊 -->
              <div class="flex-grow-1">
                <!-- 課程名稱 -->
                <h3 class="card-title fs-6 fs-sm-4 ">
                  ${t.name}
                </h3>
                <!-- 優質標籤 -->
                ${Array.isArray(t.badges)?`<ul class="d-flex gap-2 mb-2">
                  ${t.badges.map(d=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${d}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(t.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${t.tags.map(d=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${d}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />
                    <span class="fw-bold fs-sm fs-md-7 ms-1">${t.rate}</span>
                    ・
                    <span class="fs-sm fs-md-7 me-2">${t.commentNum} 個評論</span>
                  </a>
                  <p class="text-gray-300">| ${t.level}</p>
                </div>
                <!-- 課程介紹 -->
                <p
                  class="fs-sm fs-sm-7 fs-md-6 text-justify truncate-lines-2 truncate-md-lines-4"
                >${t.info}
                </p>
                <hr />
                <!-- 課程篩選tag -->
                <div>
                  <h4
                    class="text-secondary2 fs-7 fs-sm-6 fs-md-5 mb-2 mb-sm-3"
                  >
                    你可以跟我學
                  </h4>
                  ${Array.isArray(t.categories)?`
                    <ul class="d-flex flex-wrap gap-1 gap-md-2 mb-0">
                      ${t.categories.map(d=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${d}
                            </span>
                          </li>`).join("")}
                    </ul>`:""}
                </div>
                <hr />
                <!-- 收合內容 -->
                <div class="collapse" id="collapseCourse${t.id}">
                  <!-- 你將獲得 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      你將獲得
                    </h4>
                    ${Array.isArray(t.mainPoints)?`<ul>
                          ${t.mainPoints.map(d=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${d}
                        </li>`).join("")}`:""}
                    </ul>
  
                  </div>
                  <hr />
                  <!-- 評價 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      精選評價
                    </h4>
                    <p
                      class="fs-sm fs-sm-7 fs-md-6 text-justify mb-1 mb-md-2"
                    >
                     ${(w=t.comment)==null?void 0:w.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px rounded-circle"
                        src="${(o=(S=t.comment)==null?void 0:S.user)==null?void 0:o.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(H=(L=t.comment)==null?void 0:L.user)==null?void 0:H.name}</p>
                        <p>${new Date((R=t.comment)==null?void 0:R.date).toLocaleDateString("en-CA")}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <!-- 瀏覽更多 -->
                <button
                  class="btn btn-gray fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4 float-end readMore"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourse${t.id}"
                  aria-expanded="false"
                  aria-controls="collapseCourse${t.id}"
                ></button>
              </div>
            </div>
            <!--  按鈕區塊 -->
            <div
              class="card-footer card-md-horizontal min-w-lg-250px w-lg-250px min-w-md-200px w-md-200px gap-2 gap-sm-6 p-4 p-md-8"
            >
              <!-- 價格 -->
              <div
                class="d-flex justify-content-center flex-md-column flex-lg-row gap-2 gap-sm-4"
              >
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${t.price*.5.toLocaleString()}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${t.price.toLocaleString()}
                  </span>
                  <br />${t.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${t.id}"
                data-bs-target="#loginModal"
                ${k?"":'data-bs-toggle="modal"'}
              >
                立即上課
              </button>
              <a
                href="${ve}?courseId=${t.id}"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `}):e+=`
      <div class="d-flex flex-column justify-content-center text-center h-100 px-10">
        <p class="fs-3 mb-4">沒有符合條件的課程</p>
        <p class="fs-6">
          看起來目前沒有符合您需求的課程，請嘗試修改您的搜尋詞彙或篩選條件。
        </p>
      </div>`,A.innerHTML=e;let a=document.querySelectorAll(".follow-btn");a.forEach(t=>{t.addEventListener("click",function(){a&&k?t.classList.contains("following")?V(t,!0):V(t,!1):ce()})})}function we(){const e=[...Array(T)].map((c,r)=>`<li class="page-item ${s.page===r+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${r+1}">${r+1}</a>
</li>`),a=`<li class="page-item ${s.page===1?"disabled":""} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`,t=`<li class="page-item ${s.page===T?"disabled":""}">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;ee.innerHTML=a+e.join("")+t}let m=[];async function Se(){k&&(m=(await g.get(`https://project-code-json.onrender.com/users/${N}`)).data.followList)}function V(e,a){let t=e.querySelector("i.fa-regular.fa-heart"),c=Number(t.dataset.buttonid);le(a?"確定要取消收藏課程?":"確定要收藏課程?","",a?"取消收藏":"確認",a?"我再想想":"取消").then(async r=>{if(r.isConfirmed)if(ne(a?"已取消收藏":"成功收藏",a?"":"可至會員中心「我的收藏」中查看"),e.classList.toggle("not-follow"),e.classList.toggle("following"),t.classList.toggle("fw-bold"),a){let l=m.filter(n=>n!=c);g.patch(`https://project-code-json.onrender.com/users/${N}`,{followList:l}).catch(n=>{_("發生錯誤，請稍後再試")})}else m.push(c),await g.patch(`https://project-code-json.onrender.com/users/${N}`,{followList:m})}).catch(r=>{_("發生錯誤，請稍後再試")})}let Le=document.querySelector(".js-totalSearchNum"),x=[],I,T;const M=0,D=9999;let s={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:M,price_lte:D,filters:"",sort:"",order:"desc"},E=!1;ke();function ke(){const e=localStorage.getItem("indexSearchInput"),a=sessionStorage.getItem("cateItemName"),t=localStorage.getItem("redirectToPopular");!e&&!a&&!t&&i(s),_e(s)}async function i({page:e,limit:a,q:t,rate_gte:c,rate_lte:r,price_gte:l,price_lte:n,filters:h,sort:$,order:v}){try{const b=`https://project-code-json.onrender.com/courses?_expand=teacher&_expand=comment&_page=${e}&_limit=${a}&q=${t}&rate_gte=${c}&rate_lte=${r}&price_gte=${l}&price_lte=${n}${h}&_sort=${$}&_order=${v}`;E=!0,O(),z();const y=await g.get(b);x=y.data,I=parseInt(y.headers.get("X-Total-Count")),Le.innerHTML=`共 ${I} 個結果`;const w=x.map(o=>`https://project-code-json.onrender.com/comments/${o.commentId}?_expand=user`),S=await Promise.all(w.map(o=>g.get(o)));x.forEach((o,L)=>{o.comment=S[L].data}),E=!1,O(),z(),T=Math.ceil(parseInt(I)/parseInt(s.limit)),we()}catch{_("發生錯誤，請稍後再試")}}async function te({q:e,rate_gte:a,rate_lte:t,price_gte:c,price_lte:r,filters:l}){try{const n=`https://project-code-json.onrender.com/courses?&q=${e}&rate_gte=${a}&rate_lte=${t}&price_gte=${c}&price_lte=${r}${l}`;return(await g.get(n)).data}catch{_("發生錯誤，請稍後再試")}}async function _e(e){const a=await te(e);Q(a),ye(a)}async function je(e){const a=await te(e);Q(a)}const q=document.querySelector(".course-search-input"),C=localStorage.getItem("indexSearchInput");C&&(q.value=C,s.q=C,i(s),s.q="",localStorage.removeItem("indexSearchInput"));const ae=document.querySelector(".course-search-button");ae.addEventListener("click",function(){s.q=q.value,i(s)});q.addEventListener("keyup",function(e){e.key==="Enter"&&ae.click()});const Ee=document.querySelector(".clear-input");Ee.addEventListener("click",function(){q.value=""});const se=document.querySelector(".js-sortBy .dropdown-toggle"),qe=document.querySelector(".js-sortBy .dropdown-menu"),Ie=localStorage.getItem("redirectToPopular");async function Ce(){if(Ie){const e="commentNum";s.sort!==e&&(s.sort=e,se.innerHTML="排序依據：最熱門",s.page=1,await i(s),localStorage.removeItem("redirectToPopular"))}}Ce();qe.addEventListener("click",e=>{const{order:a}=e.target.dataset;a&&s.sort!==a&&(s.sort=a,se.innerHTML=`排序依據：${e.target.textContent}`,s.page=1,i(s))});
