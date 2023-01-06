import styled from 'styled-components';

import icAlert from '../../assets/icons/alert.svg';
import { LINK, MESSAGE } from '../../contants/main';
import useTabs from '../../hooks/ui/useTabs';
import Main from '../common/Main';
import SplitedButton from '../common/SplitedButton';

import Sizes from './Sizes';
import Tabs from './Tabs';
import { BottomType, TopType } from '.';

interface CompareProps {
  sizes: Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;
  noSize: boolean;
}

function Compare(props: CompareProps) {
  const { noSize, sizes } = props;
  const { currentTab, handleTab } = useTabs();

  const getLink = <Styled.Link>{LINK.BUTTON}</Styled.Link>;

  return (
    <>
      {!noSize && <Tabs currentTab={currentTab} handler={handleTab} />}
      {sizes ? (
        <Styled.Root isTop={currentTab === 'top'}>
          <Sizes sizes={sizes} currentTab={currentTab} />
        </Styled.Root>
      ) : (
        <>
          <Main src={icAlert} content={MESSAGE.NO_SIZE_COMPARE} caption={noSize} link={!noSize && getLink} />
          {noSize && <SplitedButton />}
        </>
      )}
    </>
  );
}

export default Compare;

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
