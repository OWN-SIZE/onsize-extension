const shoppingMallMapper = {
  musinsa: '무신사',
  mrporter: 'MR PORTER',
};

const url = window.location.href;
const shoppingMallKey = Object.keys(shoppingMallMapper)
  .filter((v) => url.includes(v))
  .join('') as keyof typeof shoppingMallMapper;
const mallName = shoppingMallMapper[shoppingMallKey];

let image;
let productName;

switch (shoppingMallKey) {
  case 'musinsa': {
    const productImage = document.querySelector('.product-img') as HTMLElement;
    const productTitle = document.querySelector('.product_title') as HTMLElement;

    if (productTitle) {
      productName = productTitle.innerText;
    }

    if (productImage) {
      const imageElement = productImage.querySelector('img');
      if (imageElement) {
        image = imageElement.src;
      }
    }
    break;
  }
  case 'mrporter': {
    const productImage = document.querySelector('img');
    const productTitle = document.querySelectorAll('meta[itemprop="name"]')[1] as HTMLMetaElement;

    if (productTitle) {
      productName = productTitle.content;
    }
    if (productImage) {
      image = productImage.src;
    }
    break;
  }
}

chrome.storage.local.set({
  product: {
    image,
    productName,
    mallName,
  },
});
