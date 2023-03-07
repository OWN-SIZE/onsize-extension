import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { topBottomTextConverter, topBottomTextMapper } from '../../../utils/topBottomTextMapper';
import { TopOrBottom } from '../../states';
import { isSelfWriteState, measureState, mySizeState } from '../../states/atom';
import theme from '../../styles/theme';

import { BottomType, SizePropType, TopType } from '.';
interface SizesProps {
  sizes: SizePropType;
  productSizes?: Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;
  currentTab: TopOrBottom | null;
}

function Sizes(props: SizesProps) {
  const { sizes, productSizes, currentTab } = props;
  const isSelfWrite = useRecoilValue(isSelfWriteState);
  const measure = useRecoilValue(measureState);
  const mySize = useRecoilValue(mySizeState);

  const calculateDifference = (key: keyof SizePropType, size: number) => {
    if (!productSizes) return;
    console.log(key, size, productSizes[key]);
    let compareTarget = (productSizes[key] as unknown as number) || 0;
    let updatedSize = size;
    const { isWidthOfTop } = mySize.top;
    const { isWidthOfBottom } = mySize.bottom;
    const ignore = ['topLength', 'bottomLength', 'rise'];
    if (ignore.includes(key)) {
      return updatedSize > compareTarget
        ? `-${(updatedSize - compareTarget).toFixed(1)}`
        : `+${(compareTarget - updatedSize).toFixed(1)}`;
    }

    if (isSelfWrite) {
      if (currentTab === 'top') {
        const [newSize, newProductSize] = checkMeasure(size, compareTarget, isWidthOfTop as boolean, measure.selfTop);
        updatedSize = newSize;
        compareTarget = newProductSize;
      } else {
        const [newSize, newProductSize] = checkMeasure(
          size,
          compareTarget,
          isWidthOfBottom as boolean,
          measure.selfBottom,
        );
        updatedSize = newSize;
        compareTarget = newProductSize;
      }
    } else {
      if (currentTab === 'top') {
        const [newSize, newProductSize] = checkMeasure(size, compareTarget, isWidthOfTop as boolean, measure.top);
        updatedSize = newSize;
        compareTarget = newProductSize;
      } else {
        const [newSize, newProductSize] = checkMeasure(size, compareTarget, isWidthOfBottom as boolean, measure.bottom);
        updatedSize = newSize;
        compareTarget = newProductSize;
      }
    }
    console.log(isWidthOfTop, isWidthOfBottom, measure, updatedSize, compareTarget);
    return updatedSize > compareTarget
      ? `-${(updatedSize - compareTarget).toFixed(1)}`
      : `+${(compareTarget - updatedSize).toFixed(1)}`;
  };

  const checkMeasure = (size: number, productSize: number, mySizeMeasure: boolean, compareMeasure: boolean) => {
    if (mySizeMeasure && compareMeasure) {
      return [size, productSize];
    } else if (mySizeMeasure && !compareMeasure) {
      return [size * 2, productSize];
    } else if (!mySizeMeasure && compareMeasure) {
      return [size / 2, productSize];
    } else {
      return [size, productSize];
    }
  };

  const getMeasure = () => {
    const { isWidthOfTop } = mySize.top;
    const { isWidthOfBottom } = mySize.bottom;
    if (currentTab === 'top') {
      return isWidthOfTop ? '단면' : '둘레';
    } else {
      return isWidthOfBottom ? '단면' : '둘레';
    }
  };

  return (
    <Styled.Root>
      {Object.entries(sizes).map(([key, size]) => (
        <Styled.Size isTop={currentTab === 'top'} key={key}>
          <Styled.SizeKey>
            {topBottomTextConverter(key as keyof typeof topBottomTextMapper, getMeasure())}
          </Styled.SizeKey>
          <Styled.SizeValue isSelfWrite={isSelfWrite ? true : false}>
            {size.toFixed(1)}
            <span>cm</span>
            {isSelfWrite && <Styled.Differ>{calculateDifference(key as keyof SizePropType, size)}</Styled.Differ>}
          </Styled.SizeValue>
        </Styled.Size>
      ))}
    </Styled.Root>
  );
}

export default Sizes;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
  `,
  Size: styled.div<{ isTop: boolean }>`
    display: flex;
    justify-content: space-between;
    width: 26rem;
    height: 4.2rem;
    background: #ffffff;
    border-radius: 5px;
    padding: 1.2rem 1rem;

    &:not(:last-child) {
      margin-bottom: ${({ isTop }) => (isTop ? '1.4rem' : '.4rem')};
    }
  `,
  SizeKey: styled.p`
    ${theme.fonts.body3};
    color: ${theme.colors.gray350};
  `,
  SizeValue: styled.p<{ isSelfWrite: boolean }>`
    display: flex;
    align-items: flex-end;
    ${theme.fonts.title2}
    color: ${theme.colors.gray550};
    & > span {
      padding-left: 0.4rem;
      ${theme.fonts.radioText};
      font-weight: ${({ isSelfWrite }) => isSelfWrite && 'normal'};
    }
  `,
  Differ: styled.b`
    display: flex;
    align-items: center;
    height: 1.9rem;
    background: #1e2025;
    border-radius: 1rem;
    padding: 0 0.4rem;
    margin: 0 1rem;
    color: ${theme.colors.yellow};
    ${theme.fonts.title2};
  `,
};
