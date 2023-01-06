import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { topOrBottomState } from '../../states/atom';
import Button from '../common/Button';

import Sizes from './Sizes';
import { BottomType, TopType } from '.';

interface SelfWriteCompareProps {
  sizes: Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;
}

function SelfWriteCompare(props: SelfWriteCompareProps) {
  const { sizes } = props;
  const topOrBottom = useRecoilValue(topOrBottomState);

  return (
    <>
      <Styled.Root isTop={topOrBottom === 'top'}>
        <Sizes sizes={sizes} currentTab={topOrBottom} isSelfWrite />
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
