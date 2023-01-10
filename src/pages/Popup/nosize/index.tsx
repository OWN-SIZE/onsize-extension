import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import { currentViewState } from '../../../states/atom';
import theme from '../../../styles/theme';

function NoSize() {
  const [, setCurrentView] = useRecoilState(currentViewState);

  const getLink = <Styled.Link onClick={() => setCurrentView('compare')}>{LINK.ANCHOR}</Styled.Link>;

  return (
    <Layout close>
      <Main src={icAlert} content={MESSAGE.NO_PROPER_SIZE} link={getLink} />
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
};
