const productImage = document.querySelector('.product-img');
const productTitle = document.querySelector('.product_title');

let image;
let productName;
const mallName = '무신사( MUSINSA )';

function isHTMLElement(arg: any): arg is HTMLElement {
  return arg.innerText;
}

if (productTitle && isHTMLElement(productTitle)) {
  productName = productTitle.innerText;
}

if (productImage && isHTMLElement(productImage)) {
  const imageElement = productImage.querySelector('img');
  if (imageElement) {
    image = imageElement?.src;
  }
}

chrome.storage.sync.set({
  product: {
    image,
    productName,
    mallName,
  },
});

// localStorage.setItem(
//   'product',
//   JSON.stringify({
//     product: {
//       image,
//       productName,
//       mallName,
//     },
//   }),
// );
