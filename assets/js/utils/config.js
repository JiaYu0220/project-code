const _url = 'https://prvoject-code-json.onrender.com';
const userId = localStorage.getItem('userId');
// 取得 登入狀態
const isLogin = JSON.parse(localStorage.getItem('isLogin'));

// 目前網址
const currentURL = window.location.href;

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export { userId, isLogin, currentURL, headers };
