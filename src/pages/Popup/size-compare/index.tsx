import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Main from '../../../components/common/Main';
import SplitedButton from '../../../components/common/SplitedButton';
import { BottomType, ContentsType, TopType } from '../../../components/size-compare';
import Sizes from '../../../components/size-compare/Sizes';
import Tabs from '../../../components/size-compare/Tabs';
import { CAPTION, LINK, MESSAGE } from '../../../contants/main';
import useTabs from '../../../hooks/ui/useTabs';

const top: TopType | null = {
  총장: 100,
  '가슴 단면': 200,
  '어깨 단면': 300,
};
const bottom: BottomType | null = null;

const contentsMapper: ContentsType = {
  top,
  bottom,
};

function SizeCompare() {
  const { currentTab, handleTab } = useTabs();
  const nosize = !contentsMapper['top'] && !contentsMapper['bottom'];

  const getLink = <Styled.Link>{LINK.BUTTON}</Styled.Link>;

  return (
    <>
      {!nosize && <Tabs currentTab={currentTab} handler={handleTab} />}
      {contentsMapper[currentTab] ? (
        <Styled.Root isTop={currentTab === 'top'}>
          <Sizes sizes={contentsMapper[currentTab]} currentTab={currentTab} />
        </Styled.Root>
      ) : (
        <>
          <Main src={icAlert} content={MESSAGE.NO_SIZE_COMPARE} caption={nosize} link={!nosize && getLink} />
          {nosize && <SplitedButton />}
        </>
      )}
    </>
  );
}

export default SizeCompare;

const Styled = {
  Root: styled.div<{ isTop: boolean }>`
    display: flex;
    justify-content: center;
    padding-top: ${({ isTop }) => (isTop ? '5.6rem' : '3rem')};
  `,
  Link: styled.button`
    padding: 1.2rem 5.8rem;
    margin-top: 2.6rem;
    background: #fffaad;
    box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
    border-radius: 2.15rem;

    font-weight: 600;
    font-size: 1.4rem;
    color: #1e2025;
  `,
};
