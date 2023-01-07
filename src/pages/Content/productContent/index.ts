const productImage = document.querySelector('.product-img');
const productTitle = document.querySelector('.product_title');

let image;
let productName;
const mallName = '무신사( MUSINSA )';

function isHTMLElement(arg: any): arg is HTMLElement {
  return 'innerText' in arg;
}

if (isHTMLElement(productTitle)) {
  productName = productTitle.innerText;
}

if (isHTMLElement(productImage)) {
  const imageElement = productImage.querySelector('img');
  if (imageElement) {
    image = imageElement?.src;
  }
}

// localStorage.setItem(
//   'product',
//   JSON.stringify({
//     image,
//     productName,
//     mallName,
//   }),
// );

chrome.storage.sync.set({
  product: {
    image,
    productName,
    mallName,
  },
});

// console.log(localStorage.getItem('product'));
