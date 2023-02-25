import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { topOrBottomState } from '../../states/atom';
import SaveButton from '../size-option/SaveButton';

import Sizes from './Sizes';
import { SizePropType } from '.';

interface SelfWriteCompareProps {
  sizes: SizePropType;
  productSizes: SizePropType;
}

function SelfWriteCompare(props: SelfWriteCompareProps) {
  const { sizes, productSizes } = props;
  const topOrBottom = useRecoilValue(topOrBottomState);

  return (
    <>
      <Styled.Root isTop={topOrBottom === 'top'}>
        <Sizes sizes={sizes} productSizes={productSizes} currentTab={topOrBottom} isSelfWrite />
      </Styled.Root>
      <SaveButton />
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
