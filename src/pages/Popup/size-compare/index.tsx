import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Main from '../../../components/common/Main';
import Tabs from '../../../components/size-compare/Tabs';
import { LINK, MESSAGE } from '../../../contants/main';
import useTabs from '../../../hooks/ui/useTabs';

function SizeCompare() {
  const { currentTab, handleTab } = useTabs();

  const getLink = <Styled.Link>{LINK.BUTTON}</Styled.Link>;

  return (
    <>
      <Tabs currentTab={currentTab} handler={handleTab} />
      <Main src={icAlert} content={MESSAGE.NO_SIZE_COMPARE} link={getLink} />
      {/* TODO : 
      sizeInfo 컴포넌트 구현.
    top, bottom 둘 다 없는 경우 > 내 사이즈 등록하기 링크
    top, bottom 둘 중 하나라도 입력해둔 경우 > SplitedButton
     */}
    </>
  );
}

export default SizeCompare;

const Styled = {
  Link: styled.button`
    padding: 1.2rem 5.8rem;
    background: #fffaad;
    box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
    border-radius: 2.15rem;

    font-weight: 600;
    font-size: 1.4rem;
    color: #1e2025;
  `,
};
