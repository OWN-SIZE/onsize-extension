import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { topBottomTextConverter, topBottomTextMapper } from '../../../utils/topBottomTextMapper';
import { TopOrBottom } from '../../states';
import { isSelfWriteState, measureState } from '../../states/atom';
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

  const calculateDifference = (key: keyof SizePropType, size: number) => {
    if (!productSizes) return;
    const compareTarget = (productSizes[key] as unknown as number) || 0;
    return size > compareTarget ? `-${(size - compareTarget).toFixed(1)}` : `+${(compareTarget - size).toFixed(1)}`;
  };

  const getMeasure = () => {
    if (isSelfWrite) {
      if (currentTab === 'top') {
        return measure.selfTop ? '단면' : '둘레';
      }
      return measure.selfBottom ? '단면' : '둘레';
    }
    if (currentTab === 'top') {
      return measure.top ? '단면' : '둘레';
    }
    return measure.bottom ? '단면' : '둘레';
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
