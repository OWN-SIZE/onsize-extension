import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Main from '../../../components/common/Main';
import SplitedButton from '../../../components/common/SplitedButton';
import { LINK, MESSAGE } from '../../../contants/main';

function CannotLoadSize() {
  const getLink = <Styled.Link>{LINK.ANCHOR}</Styled.Link>;

  return (
    <>
      <Main src={icAlert} content={MESSAGE.CANNOT_LOAD_SIZE} link={getLink} />
      <SplitedButton />
    </>
  );
}

export default CannotLoadSize;

const Styled = {
  Link: styled.a`
    margin-top: 0.815rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #1e2025;
    border-bottom: 1px solid #1e2025;
  `,
};
