import axios from "axios";

//抓取按鈕
const changeBtn = document.querySelectorAll('#change');
const saveBtn = document.querySelectorAll('#saveBtn')
//抓取區塊
const btnBlock = document.querySelectorAll('#btnBlock');
//抓取時間欄
const date = document.querySelectorAll('#date');
const time = document.querySelectorAll('#time');


console.log(changeBtn);

//click觸發修改事件
changeBtn.forEach((item,index)=>{
    item.addEventListener('click',(e)=>{
        date[index].toggleAttribute("disabled");
        time[index].toggleAttribute("disabled");
        btnBlock[index].classList.toggle('hidden');
        item.toggleAttribute("disabled");
    })
})
saveBtn.forEach((item,index)=>{
    item.addEventListener('click',(e)=>{
        date[index].toggleAttribute("disabled");
        time[index].toggleAttribute("disabled");
        btnBlock[index].classList.toggle('hidden');
        changeBtn[index].toggleAttribute("disabled");
    })
})


// 我的關注
// 記得修改 html // class="tab-pane fade show active"

// CRUD 增加 讀取 更新 刪除



