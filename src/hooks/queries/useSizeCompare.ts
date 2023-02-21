// 수동입력된 두 사이즈간 비교
import { useRecoilState } from 'recoil';

import { postSizeTable } from '../../apis/api';
import { TopOrBottom } from '../../states';
import { currentViewState, productState, topOrBottomState } from '../../states/atom';
import { PostSizeTableInput } from '../../types/remote';

export const useSizeCompare = () => {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const [, setProductData] = useRecoilState(productState);
  const [topOrBottom, setTopOrBottom] = useRecoilState(topOrBottomState);

  const sizeCrawling = async (body: PostSizeTableInput) => {
    const result = await postSizeTable(body);
    return result;
  };

  const renderNextView = () => {
    setTimeout(() => {
      const size = localStorage.getItem('recommend-size') || null;
      size ? setCurrentView('size-recommend') : setCurrentView('nosize');
    }, 2000);
  };

  const checkOption = (option: TopOrBottom) => {
    if (!option) return;

    if (option === 'null') {
      setCurrentView('size-option');
      return;
    }
    //setSelectedOption(option);
    setTopOrBottom(option);
  };

  const executeSizeRecommmend = async (option: TopOrBottom) => {
    setCurrentView('loading');

    // await sizeCrawling(option);
    //await getSizeRecommendResult(option);

    setTimeout(async () => {
      renderNextView();
    }, 100);
  };

  const onClickOption = async (body: PostSizeTableInput) => {
    //checkOption(option);

    // if (isSelfWrite) {
    //   setCurrentView('size-write');
    //   return;
    // }
    //executeSizeRecommmend(option);
    const response = await sizeCrawling(body);

    console.log(response);
  };

  return { onClickOption };
};
