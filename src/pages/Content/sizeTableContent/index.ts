import { InfoType, SizeInfoType } from '../../../types/content';

const itemCategory = document.querySelector('.item_categories') as HTMLElement;
let topOrBottom = ''; // 상의 또는 하의

// 상하의 구분
if (itemCategory) {
  if (itemCategory.innerText.includes('바지')) {
    topOrBottom = 'bottom';
  } else {
    topOrBottom = 'top';
  }
}

const textMapper = {
  총장: topOrBottom === 'top' ? 'topLength' : 'bottomLength',
  어깨: 'shoulder',
  가슴: 'chest',
  허리: 'waist',
  허벅지: 'thigh',
  밑위: 'rise',
  밑단: 'hem',
};

const table = document.querySelector('table');

if (table) {
  const columns = table.querySelectorAll('.item_val') as NodeListOf<HTMLElement>;
  let sizeInfo: SizeInfoType = []; // 사이즈별 실측치 저장 배열

  const tbody = table.querySelector('tbody');
  if (tbody) {
    const sizes = [...tbody.querySelectorAll('tr')].filter((size) => !size.classList.length && !size.id);

    // 사이즈 저장
    [...sizes].forEach((size) => {
      const infoType: InfoType = {};

      // 실측 측정방식 객체로 저장
      [...columns].forEach((column) => {
        // 한글 key값 영어로 변환
        const innerText = column.innerText.slice(0, column.innerText.indexOf('단면')) as keyof typeof textMapper;

        const key = textMapper[innerText];
        if (!key) return;
        infoType[key] = 0;
      });

      const values = [...size.children].filter((element) => element.nodeName === 'TD') as HTMLElement[];

      Object.keys(infoType).forEach((key, index) => {
        if (values[index]) infoType[key] = Number(values[index].innerText);
      });

      const th = size.children[0] as HTMLElement;
      const MY = th.innerText; // 사이즈
      infoType['size'] = MY;

      sizeInfo = [...sizeInfo, infoType];
    });

    console.log('사이즈표 가공 데이터', sizeInfo);

    chrome.runtime.sendMessage({ isSizeTableExist: sizeInfo }, (response) => {
      response.status === 'success'
        ? localStorage.setItem('currentView', 'size-option')
        : localStorage.setItem('currentView', 'cannotload');
    });

    console.log('content script에서의 현재 뷰', localStorage.getItem('currentView'));
  }

  table.style.border = '10px solid red';
}
