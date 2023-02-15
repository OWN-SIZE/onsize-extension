import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import imgBottom from '../../../assets/img/bottom.svg';
import imgTop from '../../../assets/img/top.svg';
import Layout from '../../../components/common/Layout';
import OptionButton from '../../../components/size-option/OptionButton';
import SaveButton from '../../../components/size-option/SaveButton';
import { useRedirect } from '../../../hooks/queries/useRedirect';
import { useSizeRecommend } from '../../../hooks/queries/useSizeRecommend';
import { currentViewState, historyState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SizeOption() {
  const currentView = useRecoilValue(currentViewState);
  const [, setHistory] = useRecoilState(historyState);
  const { onClickOption } = useSizeRecommend();

  const { redirect } = useRedirect();

  useEffect(() => {
    (async () => {
      await redirect();
    })();

    setHistory(currentView);
  }, [currentView, redirect, setHistory]);

  return (
    <Layout close>
      <Styled.Root>
        지금 어떤 옷을 보고 있나요?
        <Styled.OptionContainer>
          <OptionButton onClick={() => onClickOption('top')} src={imgTop} caption={'상의'} />
          <OptionButton onClick={() => onClickOption('bottom')} src={imgBottom} caption={'하의'} />
        </Styled.OptionContainer>
      </Styled.Root>
      <SaveButton />
    </Layout>
  );
}

export default SizeOption;

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2.8rem;
    color: ${theme.colors.black};
    ${theme.fonts.title1};
  `,
  OptionContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 3.4rem;
    justify-content: center;
    margin-top: 3.5rem;
    margin-bottom: 3.8rem;
  `,
};
