import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import SaveButton from '../../../components/size-option/SaveButton';
import { LINK, MESSAGE } from '../../../contants/text';
import { currentViewState, historyState, sizeRecommendState } from '../../../states/atom';
import theme from '../../../styles/theme';

function NoSize() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [, setSizeRecommend] = useRecoilState(sizeRecommendState);
  const [, setHistory] = useRecoilState(historyState);

  const updateView = () => {
    setHistory(currentView);
    setCurrentView('compare');
  };

  useEffect(() => {
    setSizeRecommend('nosize');
  }, []);

  const getLink = <Styled.Link onClick={updateView}>{LINK.ANCHOR}</Styled.Link>;

  return (
    <Layout close>
      <Main image={<Styled.Image src={icAlert} />} content={MESSAGE.NO_PROPER_SIZE} link={getLink} />
      <SaveButton />
    </Layout>
  );
}

export default NoSize;

const Styled = {
  Link: styled.a`
    ${theme.fonts.body3};
    color: ${theme.colors.black};
    border-bottom: 1px solid #1e2025;
  `,
  Image: styled.img`
    width: 7.2rem;
    height: 7.2rem;
    object-fit: contain;
    margin-bottom: 2.6rem;
  `,
};
