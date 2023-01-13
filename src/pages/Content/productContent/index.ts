const productImage = document.querySelector('.product-img') as HTMLElement;
const productTitle = document.querySelector('.product_title') as HTMLElement;

let image;
let productName;
const mallName = '무신사';

if (productTitle) {
  productName = productTitle.innerText;
}

if (productImage) {
  const imageElement = productImage.querySelector('img');
  if (imageElement) {
    image = imageElement.src;
  }
}

chrome.storage.local.set({
  product: {
    image,
    productName,
    mallName,
  },
});
