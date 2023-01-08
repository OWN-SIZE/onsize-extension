import styled from 'styled-components';

import useTabs from '../../hooks/ui/useTabs';

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

  return (
    <>
      {!noSize && <Tabs currentTab={currentTab} handler={handleTab} />}
      <Styled.Root isTop={currentTab === 'top'}>
        <Sizes sizes={sizes} currentTab={currentTab} />
      </Styled.Root>
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
};
