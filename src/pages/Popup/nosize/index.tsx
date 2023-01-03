import styled from 'styled-components';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import icAlert from '../../../assets/icons/alert.svg';
import Button from '../../../components/common/Button';

function NoSize() {
  const getLink = <Styled.Link>{LINK}</Styled.Link>;

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
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #1e2025;
    border-bottom: 1px solid #1e2025;
  `,
};
