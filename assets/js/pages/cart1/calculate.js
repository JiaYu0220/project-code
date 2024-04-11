import { usedCouponData } from './coupon';
import { myCarts } from './cart';

const originalPriceEl = document.querySelector('#OriginalPrice');
const courseDiscountEl = document.querySelector('#CourseDiscount');
const webDiscountEl = document.querySelector('#WebDiscount');
const TotalPriceEl = document.querySelector('#TotalPrice');

const price = {
  originalTotal: 0,
  courseDiscount: 0,
  webDiscount: 0,
  totalPrice: 0,
};

function calculatePriceAndDiscount() {
  calculateOriginPrice();
  calculateCourseDiscount();
  calculateWebDiscount();
  calculateFinalTotal();
}

function calculatePrice() {
  calculateOriginPrice();
  calculateFinalTotal();
}

function calculateDiscount() {
  calculateCourseDiscount();
  calculateWebDiscount();
  calculateFinalTotal();
}

// 渲染 計算原價
function calculateOriginPrice() {
  price.originalTotal = myCarts.reduce(
    (acc, cur) => (acc += cur.quantity * cur.course.price),
    0
  );
  originalPriceEl.textContent = price.originalTotal.toLocaleString();
}

function CalculateToTalSum() {}
// 渲染 計算課程全部折扣
function calculateCourseDiscount() {
  price.courseDiscount = usedCouponData.reduce((acc, cur, index) => {
    return index < usedCouponData.length - 1 ? acc + cur.discountPrice : acc;
  }, 0);
  courseDiscountEl.textContent = price.courseDiscount.toLocaleString();
}

// 渲染 全站折扣
function calculateWebDiscount() {
  price.webDiscount = usedCouponData[usedCouponData.length - 1].discountPrice;

  webDiscountEl.textContent = price.webDiscount.toLocaleString();
}

// 渲染 計算最終價
function calculateFinalTotal() {
  price.totalPrice =
    price.originalTotal - price.courseDiscount - price.webDiscount;
  TotalPriceEl.textContent = price.totalPrice.toLocaleString();
}

export { calculatePriceAndDiscount, calculatePrice, calculateDiscount };
