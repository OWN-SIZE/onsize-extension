import { useRecoilState, useRecoilValue } from 'recoil';

import { useSizeRecommend } from '../../hooks/queries/useSizeRecommend';
import { currentViewState, topOrBottomState } from '../../states/atom';
import Button from '../common/Button';

function SizeRecommendButton() {
  const { onClickOption: handleSizeRecommend } = useSizeRecommend();
  const [, setCurrentView] = useRecoilState(currentViewState);
  const topOrBottom = useRecoilValue(topOrBottomState);

  const onClickSizeRecommendButton = () => {
    if (topOrBottom === 'top' || topOrBottom === 'bottom') {
      handleSizeRecommend(topOrBottom);
    } else {
      setCurrentView('size-option');
    }
  };

  return <Button content="사이즈 추천 받기" onClick={onClickSizeRecommendButton} />;
}

export default SizeRecommendButton;
