import { useRecoilState, useRecoilValue } from 'recoil';

import { useSizeRecommend } from '../../hooks/queries/useSizeRecommend';
import { currentViewState, topOrBottomState } from '../../states/atom';
import Button from '../common/Button';

function SizeRecommendButton() {
  const { onClickOption: handleSizeRecommend } = useSizeRecommend();
  const [, setCurrentView] = useRecoilState(currentViewState);
  const topOrBottom = useRecoilValue(topOrBottomState);

  return (
    <Button
      content="사이즈 추천 받기"
      onClick={() => (topOrBottom ? handleSizeRecommend(topOrBottom) : setCurrentView('size-option'))}
    />
  );
}

export default SizeRecommendButton;
