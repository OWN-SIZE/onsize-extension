import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import { currentViewState, historyState } from '../../../states/atom';
import theme from '../../../styles/theme';

function NoSize() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [history, setHistory] = useRecoilState(historyState);

  const updateView = () => {
    setHistory(currentView);
    setCurrentView('compare');
  };

  const getLink = <Styled.Link onClick={updateView}>{LINK.ANCHOR}</Styled.Link>;

  return (
    <Layout close>
      <Main image={<Styled.Image src={icAlert} />} content={MESSAGE.NO_PROPER_SIZE} link={getLink} />
      <Button content="저장" />
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
