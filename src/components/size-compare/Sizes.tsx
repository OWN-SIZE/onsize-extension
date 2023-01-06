import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { topBottomTextConverter, topBottomTextMapper } from '../../../utils/topBottomTextMapper';
import { mySizeState, topOrBottomState } from '../../states/atom';

import { BottomType, TabName, TopBottomType, TopType } from '.';
interface SizesProps {
  sizes: Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;
  currentTab: TabName;
  isSelfWrite?: boolean;
}

function Sizes(props: SizesProps) {
  const { sizes, currentTab, isSelfWrite } = props;
  const mySize = useRecoilValue(mySizeState);
  const topOrBottom = useRecoilValue(topOrBottomState);

  const calculateDifference = (key: keyof TopBottomType, size: number) => {
    const mysize = mySize[topOrBottom] as unknown as TopBottomType;
    const compareTarget = mysize[key] as unknown as number;
    return (size - compareTarget).toFixed(1);
  };

  return (
    <Styled.Root>
      {Object.entries(sizes).map(([key, size]) => (
        <Styled.Size isTop={currentTab === 'top'}>
          <Styled.SizeKey>{topBottomTextConverter(key as keyof typeof topBottomTextMapper)}</Styled.SizeKey>
          <Styled.SizeValue isSelfWrite={isSelfWrite ? true : false}>
            {size.toFixed(1)}
            <span>cm</span>
            {isSelfWrite && <Styled.Differ>{calculateDifference(key as keyof TopBottomType, size)}</Styled.Differ>}
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
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #8e8e8e;
  `,
  SizeValue: styled.p<{ isSelfWrite: boolean }>`
    display: flex;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #444444;
    & > span {
      padding-left: 0.4rem;
      font-weight: ${({ isSelfWrite }) => isSelfWrite && 'normal'};
    }
  `,
  Differ: styled.b`
    display: flex;
    align-items: center;
    width: 2.6rem;
    height: 1.9rem;
    background: #1e2025;
    border-radius: 1rem;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.9rem;
    padding: 0 0.4rem;
    margin: 0 1rem;
    color: #fbf26c;
  `,
};
