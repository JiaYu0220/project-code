import 'bootstrap/dist/js/bootstrap.min.js';

import './assets/scss/all.scss';

import './assets/js/pages/layout/header.js';
import './assets/js/components/backtotop.js';

// 自動登入(測試用)
(function () {
  localStorage.setItem('userId', '1');
  localStorage.setItem('isLogin', '1');
})();
