import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import SplitedButton from '../../../components/common/SplitedButton';
import { LINK, MESSAGE } from '../../../contants/main';
import { currentViewState } from '../../../states/atom';
import theme from '../../../styles/theme';

function CannotLoadSize() {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const getLink = <Styled.Link onClick={() => setCurrentView('compare')}>{LINK.ANCHOR}</Styled.Link>;

  return (
    <Layout close>
      <Main src={icAlert} content={MESSAGE.CANNOT_LOAD_SIZE} link={getLink} />
      <SplitedButton />
    </Layout>
  );
}

export default CannotLoadSize;

const Styled = {
  Link: styled.a`
    color: ${theme.colors.black};
    border-bottom: 1px solid #1e2025;
    ${theme.fonts.body3};
  `,
};
