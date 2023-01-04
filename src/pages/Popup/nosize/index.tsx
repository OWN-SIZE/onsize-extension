import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Button from '../../../components/common/Button';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';

function NoSize() {
  const getLink = <Styled.Link>{LINK.ANCHOR}</Styled.Link>;

  return (
    <>
      <Main src={icAlert} content={MESSAGE.NO_PROPER_SIZE} link={getLink} />
      <Button content="저장" />
    </>
  );
}

export default NoSize;

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
