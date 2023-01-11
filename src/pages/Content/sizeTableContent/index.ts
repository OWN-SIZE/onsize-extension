import { InfoType, SizeInfoType } from '../../../types/content';

const table = document.querySelector('table');
const itemCategory = document.querySelector('.item_categories') as HTMLElement;

if (table) {
  const columns = table.querySelectorAll('.item_val') as NodeListOf<HTMLElement>;
  let sizeInfo: SizeInfoType = []; // 사이즈별 실측치 저장 배열
  let topOrBottom = '';

  // 상하의 구분
  if (itemCategory) {
    if (itemCategory.innerText.includes('바지')) {
      topOrBottom = 'bottom';
    } else {
      topOrBottom = 'top';
    }
  }

  const tbody = table.querySelector('tbody');
  if (tbody) {
    const sizes = [...tbody.querySelectorAll('tr')].filter((size) => !size.classList.length && !size.id);

    // 사이즈 저장
    [...sizes].forEach((size) => {
      const infoType: InfoType = {};

      // 실측 측정방식 객체로 저장
      [...columns].forEach((column) => {
        /** TODO : key값을 영어로 변환 */
        const key = column.innerText;
        if (!key) return;
        infoType[key] = 0;
      });

      const values = [...size.children].filter((element) => element.nodeName === 'TD') as HTMLElement[];

      const th = size.children[0] as HTMLElement;
      const MY = th.innerText; // 사이즈
      infoType['size'] = MY;

      Object.keys(infoType).forEach((key, index) => {
        if (values[index]) infoType[key] = Number(values[index].innerText);
      });

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
