import { data, getCoursesData } from './api.js';
import { toCoursesTop } from './filter.js';

const pagination = document.querySelector('.pagination');

pagination.addEventListener('click', (e) => {
  const targetElement = e.target.closest('[data-page]');

  if (targetElement) {
    e.preventDefault();
    const { page } = targetElement.dataset;

    switch (page) {
      case 'prev':
        data.page -= 1;
        break;
      case 'next':
        data.page += 1;
        break;
      default:
        data.page = Number(page);
    }

    getCoursesData(data);
    // 畫面回到上面
    toCoursesTop();
  }
});
export { pagination };
