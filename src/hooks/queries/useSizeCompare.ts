// 수동입력된 두 사이즈간 비교
import { useRecoilState } from 'recoil';

import { postSizeTable, saveResult } from '../../apis/api';
import { currentViewState, productState, sizeRecommendState, topOrBottomState } from '../../states/atom';
import { PostSizeTableInput, SaveResultInput } from '../../types/remote';

export const useSizeCompare = () => {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const [, setSizeRecommend] = useRecoilState(sizeRecommendState);
  const [, setProductData] = useRecoilState(productState);
  const [topOrBottom, setTopOrBottom] = useRecoilState(topOrBottomState);

  const sizeCrawling = async (body: PostSizeTableInput) => {
    await postSizeTable(body);
  };

  const renderNextView = () => {
    const size = localStorage.getItem('recommend-size') || null;
    size ? setCurrentView('size-recommend') : setCurrentView('nosize');
  };

  const getSizeRecommendResult = async (id: number | null, urlString: string) => {
    const { productId, url } = { productId: id, url: urlString } || { productId: 0, url: '' };

    const body: SaveResultInput = {
      topOrBottom: topOrBottom === 'top' ? 0 : 1,
      url,
      topItemId: topOrBottom === 'top' ? productId : null,
      bottomItemId: topOrBottom === 'bottom' ? productId : null,
      userId: Number(localStorage.getItem('userId')) || null,
    };

    const {
      data: { recommendSize },
    } = await saveResult(body);
    setSizeRecommend(recommendSize);
    localStorage.setItem('recommend-size', recommendSize || '');
  };

  const executeSizeRecommmend = async (body: PostSizeTableInput, url: string) => {
    setCurrentView('loading');

    await sizeCrawling(body);
    await getSizeRecommendResult(topOrBottom === 'top' ? body.sizes[0].topItemId : body.sizes[0].bottomItemId, url);
    renderNextView();
  };

  const onClickOption = async (body: PostSizeTableInput, url: string) => {
    executeSizeRecommmend(body, url);
  };

  return { onClickOption };
};
