import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { topOrBottomState } from '../../states/atom';
import SaveButton from '../size-option/SaveButton';

import Sizes from './Sizes';
import { BottomType, SizePropType, TopType } from '.';

interface SelfWriteCompareProps {
  sizes: SizePropType;
  productSizes: Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;
}

function SelfWriteCompare(props: SelfWriteCompareProps) {
  const { sizes, productSizes } = props;
  const topOrBottom = useRecoilValue(topOrBottomState);
  const storedProductSizes = JSON.parse(localStorage.getItem('productSizes') || '');

  return (
    <>
      <Styled.Root isTop={topOrBottom === 'top'}>
        <Sizes sizes={sizes} productSizes={storedProductSizes || productSizes} currentTab={topOrBottom} />
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
    padding-top: ${({ isTop }) => (isTop ? '6.95rem' : '3rem')};
    margin-bottom: ${({ isTop }) => (isTop ? '6.95rem' : '3.4rem')};
  `,
};
