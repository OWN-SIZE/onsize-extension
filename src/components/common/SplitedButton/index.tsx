import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useSaveProduct } from '../../../hooks/queries/useSaveProduct';
import { currentViewState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SplitedButton() {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const { onClickSaveProduct } = useSaveProduct();

  return (
    <Styled.Root>
      <Styled.SizeInputButton onClick={() => setCurrentView('size-write')}>사이즈 직접 입력하기</Styled.SizeInputButton>

      <Styled.SaveButton onClick={onClickSaveProduct}>저장</Styled.SaveButton>
    </Styled.Root>
  );
}

export default SplitedButton;

const Styled = {
  Root: styled.div`
    display: flex;
    height: 6.6rem;
  `,
  SizeInputButton: styled.button`
    width: 26.6rem;
    color: ${theme.colors.black};
    background-color: #fbf26c;
    border-radius: 0px 33.5525px 0px 0px;
    ${theme.fonts.title2}
  `,
  SaveButton: styled.button`
    width: 11.4rem;
    color: #d9d9d9;
    background-color: #1e2025;
    border-radius: 33.552px 0px 0px 0px;
    ${theme.fonts.title2}
  `,
};
