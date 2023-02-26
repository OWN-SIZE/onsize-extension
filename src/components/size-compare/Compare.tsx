import styled from 'styled-components';

import Sizes from './Sizes';
import { SizePropType, TabName } from '.';

interface CompareProps {
  sizes: SizePropType;
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
