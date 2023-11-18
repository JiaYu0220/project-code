const appointment_list = document.querySelector('#appointment_list'); //get ul
const course_management = document.querySelector('#course-management');
let appointment_data = {};
let clickTeacher = "";
//生成預約教師列表
function updateTeacherList(){
    axios.get(`${_url}/user_courses?userId=${userId.toString()}`)
    .then(function(response){
        appointment_data = [...response.data[0].purchased]; //取得學生所購買的課程
        manager_data = [...response.data[0].attendTime]; //取得學生已預約的課程
        manager_data.forEach(item => {
            item.day = item.date;
            delete item.date;
        })
        // console.log(manager_data);
        mergeData(appointment_data);
        mergeManageData(manager_data);
        function mergeData(data){ //處裡預約課程
            let str = '';
            axios.get(`${_url}/courses?_expand=teacher`)
            .then(function(response){
                const objects = response.data; //課程關聯教師資料
                const arr = data.map(item1 => {
                    const matchingItem = objects.find(item2 => item1.courseId === item2.id);
                    if (matchingItem) {
                        // 合併兩個物件
                        return { ...item1, ...matchingItem };
                    } else {
                        // 如果找不到相符的物件，返回原始的 item1
                        return item1;
                    }
                });
                // console.log(arr);
                arr.forEach(item => {
                    str += `<li class="book-card" data-courseId="${item.id}">
                <img src="${item.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${item.name}</h4>
                  <p>${item.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${item.total - item.used}</p>
                  </div>
                </div>
              </li>`;
                });
                appointment_list.innerHTML = str;
                const teacher_list = document.querySelectorAll('.book-card'); //列表生成後抓取列表
                teacher_list.forEach(btn => {
                    btn.addEventListener('click',e=>{
                        teacher_list.forEach(btn => {
                            btn.classList.remove('active');
                        })
                        e.currentTarget.classList.add('active');
                        clickCourse = e.currentTarget.getAttribute('data-courseId'); //偵測是否選擇
                        viewTimeCourse();
                    })
                })
            })
            .catch(err => {
                console.error(err); 
            })
        }
        function mergeManageData(data){ //處裡課程管理
            let str = '';
            axios.get(`${_url}/courses?_expand=teacher`)
            .then(function(response){
                const objects = response.data; //課程關聯教師資料
                const arr = data.map(item1 => {
                    const matchingItem = objects.find(item2 => item1.courseId === item2.id);
                    if (matchingItem) {
                        // 合併兩個物件
                        return { ...item1, ...matchingItem };
                    } else {
                        // 如果找不到相符的物件，返回原始的 item1
                        return item1;
                    }
                });
                // console.log(arr);
                arr.forEach((item,idx) => {//課程管理列表
                  let ischeck_str ='';
                  if(item.isCheck){
                    ischeck_str = 
                    `<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${item.uid}"
                  >
                    即將上課
                  </button>`
                  }else{
                    ischeck_str = 
                    `<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${item.uid}"
                    disabled
                  >
                    等待確認中
                  </button>`
                  }
                    str += `<li class="course-card shadow w-100 w-xl-75">
                    <div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
                      <div class="course-card-header me-4">
                        <a href="#" class="text-center">
                          <div class="mb-2">
                            <img
                              class="avatar"
                              src="${item.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${item.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${item.name}
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
                                class="form-control border-light cursor-pointer jq-appointmentDate${idx} ${item.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="2023/${item.day}"
                                autocomplete="off"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${item.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${item.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${item.uid}"
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
                      
                      ${ischeck_str}
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
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
                    </li>`;
                });
                $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
                $(function () {
                  $("[class*=jq-appointmentDate]").each(function(index) {
                    $(this).attr("id", "datepicker-" + index); // 加入唯一的 id
                    $(this).datepicker({
                      minDate: 0,
                      maxDate: "+1M +10D",
                      formatDate: "yy-mm-dd",
                    });
                  });
                });
                
                course_management.innerHTML = str;
                const change_btn = document.querySelectorAll('#change');
                // console.log(change_btn);
                change_btn.forEach(btn => { //按下修改時，當前日期以及時間可變為更改狀態。
                    btn.addEventListener('click',(e)=>{
                        // console.log(e.currentTarget.getAttribute('data-course'));
                        let click_change = e.currentTarget.getAttribute('data-course');
                        let str = `.${click_change}`;
                        const get2 = document.querySelectorAll(str);
                        // console.log(get2[0].value);
                        // console.log(get2[1].value);
                        get2.forEach(item => {
                          item.toggleAttribute("disabled");
                        });
                        e.currentTarget.classList.add('d-none');
                        let btn = document.querySelector(`#ready-${click_change}`);
                        if(!btn){
                          btn = document.querySelector(`#check-${click_change}`);
                        }
                        // console.log(btn);

                        //變更為儲存
                        btn.setAttribute('id',`save-${click_change}`);
                        btn.setAttribute('data-bs-toggle',"modal");
                        btn.setAttribute('data-bs-target',"#checkModal");
                        btn.removeAttribute('disabled');
                        btn.textContent = '儲存';
                        //

                        //1.click儲存時，儲存現有資料。
                        //2.並且改變確認鍵上的資料。
                        btn.addEventListener('click',()=>{
                          const getClassData = arr.find(item => item.uid === click_change);
                          //抓取modal上的標籤
                          const checkImg = document.querySelector('#checkImg');
                          const checkTeacherName = document.querySelector('#checkTeacherName');
                          const checkName = document.querySelector('#checkName');
                          const checkDate = document.querySelector('#checkDate');
                          const checkSubmit = document.querySelector('#checkSubmit');
                          //設定標籤上的變數
                          checkImg.setAttribute('src',`${getClassData.teacher.avatar}`);
                          checkTeacherName.textContent = getClassData.teacher.name;
                          checkName.textContent = getClassData.name;
                          checkDate.textContent = `${get2[0].value} ${get2[1].value}`;
                          checkSubmit.setAttribute('data-uid',`${click_change}`);
                          checkSubmit.addEventListener('click',(e)=>{
                            e.preventDefault();
                            if(checkSubmit.getAttribute('data-uid') !== click_change){
                              return 0;
                            }else{
                              axios.get(`${_url}/user_courses/${userId}`)
                              .then(res=>{
                                const oldData = [...res.data.attendTime];
                                // console.log(oldData);
                                let findIndex = 0;
                                const getCurrentData = oldData.find((item,idx) => {
                                  if(item.uid === click_change){
                                    findIndex = idx;
                                    return true;
                                  }
                                  return false;
                                })
                                // console.log(getCurrentData,findIndex);
                                oldData.splice(findIndex,1);
                                getCurrentData.date = get2[0].value.slice(5);
                                getCurrentData.time = get2[1].value;
                                getCurrentData.isCheck = false;
                                // console.log(getCurrentData);
                                oldData.push(getCurrentData);
                                axios.patch(`${_url}/user_courses/${userId}`,{
                                  attendTime : [...oldData]
                                })
                                .then(response => {
                                  console.log('add success');
                                  location.reload();  // 刷新頁面
                                })
                                .catch(error => {
                                  console.error('Error adding post:', error);
                                });
                              })
                            }
                          })
                        })
                    })
                })
            })
            .catch(err => {
                console.error(err); 
            })
        }
    })
    .catch(err => {
        console.error(err); 
    })
}


updateTeacherList();