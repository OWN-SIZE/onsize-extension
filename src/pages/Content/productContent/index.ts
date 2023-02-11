const shoppingMallMapper = {
  musinsa: '무신사',
  mrporter: 'MR PORTER',
  ssense: 'SSENSE',
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
    const productImage = document.querySelector('.product-img') as HTMLImageElement;
    const productTitle = document.querySelector('.product_title') as HTMLElement;

    productName = productTitle.innerText;
    image = productImage.src;
    break;
  }
  case 'mrporter': {
    const productImage = document.querySelector('img') as HTMLImageElement;
    const productTitle = document.querySelectorAll('meta[itemprop="name"]')[1] as HTMLMetaElement;

    productName = productTitle.content;
    image = productImage.src;
    break;
  }
  case 'ssense': {
    const productTitle = document.querySelector('#pdpProductNameText') as HTMLElement;
    const productImage = document.querySelector('picture img') as HTMLImageElement;

    productName = productTitle.innerText.trim();
    image = productImage.dataset.srcset;
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
