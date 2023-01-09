import styled from 'styled-components';

import Sizes from './Sizes';
import { BottomType, TabName, TopType } from '.';

interface CompareProps {
  sizes: Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;
  currentTab: TabName;
}

function Compare(props: CompareProps) {
  const { sizes, currentTab } = props;

  return (
    <>
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
