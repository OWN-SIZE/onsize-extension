import styled from 'styled-components';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import icAlert from '../../../assets/icons/alert.svg';

function NoSize() {
  const getLink = <Styled.Link>{LINK}</Styled.Link>;

  return <Main src={icAlert} content={MESSAGE.NO_PROPER_SIZE} link={getLink} />;
}

export default NoSize;

const Styled = {
  Link: styled.a`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #1e2025;
    border-bottom: 1px solid #1e2025;
  `,
};
