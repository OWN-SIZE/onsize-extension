import styled from 'styled-components';

import Button from '../common/Button';

import Sizes from './Sizes';
import { BottomType, TopType } from '.';

interface SelfWriteCompareProps {
  sizes: Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>;
}

function SelfWriteCompare(props: SelfWriteCompareProps) {
  const { sizes } = props;
  const currentTab = 'top';

  return (
    <>
      <Styled.Root isTop={currentTab === 'top'}>
        <Sizes sizes={sizes} currentTab={currentTab} isSelfWrite />
      </Styled.Root>
      <Button content="저장" />
    </>
  );
}

export default SelfWriteCompare;

const Styled = {
  Root: styled.div<{ isTop: boolean }>`
    display: flex;
    justify-content: center;
    padding-top: ${({ isTop }) => (isTop ? '7.4rem' : '3rem')};
    margin-bottom: ${({ isTop }) => (isTop ? '7.3rem' : '3.4rem')};
  `,
};
