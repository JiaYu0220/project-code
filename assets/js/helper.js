function priceToNumber(price) {
  return parseInt(price.replace(/,/g, ''));
}

function generateRandomCode(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // 第一個字是英文字母
  const firstCharIndex = Math.floor(Math.random() * (characters.length - 10));
  result += characters.charAt(firstCharIndex);

  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function setElementText(target, value) {
  document.querySelector(target).textContent = value;
}

export { priceToNumber, generateRandomCode, setElementText };
