import { useRecoilState, useRecoilValue } from 'recoil';

import { saveResult } from '../../apis/api';
import { currentViewState, productState, sizeRecommendState, topOrBottomState } from '../../states/atom';
import { SaveResultInput } from '../../types/remote';
import Button from '../common/Button';

function SizeRecommendButton() {
  const productData = useRecoilValue(productState);
  const [recommendSize, setSizeRecommend] = useRecoilState(sizeRecommendState);
  const [, setCurrentView] = useRecoilState(currentViewState);
  const topOrBottom = useRecoilValue(topOrBottomState);

  // 상품 Id 조회
  const getProductId = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tabs[0].url;
    if (!url) return;

    const forwardUrlIndex = url.match('goods/')?.index;
    const questionMarkIndex = url.split('').indexOf('?');

    if (!forwardUrlIndex) return;
    const productId =
      questionMarkIndex >= 0
        ? Number(url?.slice(forwardUrlIndex + 6, questionMarkIndex))
        : Number(url?.slice(forwardUrlIndex + 6));
    return productId;
  };

  const getBody = async (selectedOption: 'top' | 'bottom') => {
    // 상품 정보
    const productId = (await getProductId()) || null;

    const body: SaveResultInput = {
      topOrBottom: selectedOption === 'top' ? 0 : 1,
      url: productData.productUrl,
      topItemId: selectedOption === 'top' ? productId : null,
      bottomItemId: selectedOption === 'bottom' ? productId : null,
    };
    return body;
  };

  const getSizeRecommendResult = async () => {
    // body 작성
    const body = await getBody(topOrBottom as 'top' | 'bottom');

    // 사이즈 추천 결과 조회
    const {
      data: { recommendSize },
    } = await saveResult(body);
    setSizeRecommend(recommendSize);
    localStorage.setItem('recommend-size', recommendSize);
    renderNextView();
  };

  const renderNextView = () => {
    recommendSize ? setCurrentView('size-recommend') : setCurrentView('nosize');
  };

  const handleSizeRecommend = () => {
    topOrBottom ? getSizeRecommendResult() : setCurrentView('size-option');
  };

  return <Button content="사이즈 추천 받기" onClick={handleSizeRecommend} />;
}

export default SizeRecommendButton;
