import Main from '../../../components/common/Main';
import icAlert from '../../../assets/icons/alert.svg';
import { LINK, MESSAGE } from '../../../contants/main';
import styled from 'styled-components';
import SplitedButton from '../../../components/common/SplitedButton';

function CannotLoadSize() {
  const getLink = <Styled.Link>{LINK}</Styled.Link>;

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
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #1e2025;
    border-bottom: 1px solid #1e2025;
  `,
};
