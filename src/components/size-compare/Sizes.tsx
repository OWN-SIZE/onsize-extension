import styled from 'styled-components';

import { topBottomTextConverter, topBottomTextMapper } from '../../../utils/topBottomTextMapper';

import { BottomType, TabName, TopType } from '.';
interface SizesProps {
  sizes: Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'> | null;
  currentTab: TabName;
  isSelfWrite?: boolean;
}

function Sizes(props: SizesProps) {
  const { sizes, currentTab, isSelfWrite } = props;

  const calculateDifference = () => {
    /** TODO
     * 내 사이즈(sizes)랑 수동입력받은 데이터랑 오차범위 계산
     */
  };

  return (
    <Styled.Root>
      {sizes &&
        Object.entries(sizes).map(([key, size]) => (
          <Styled.Size isTop={currentTab === 'top'}>
            <Styled.SizeKey>{topBottomTextConverter(key as keyof typeof topBottomTextMapper)}</Styled.SizeKey>
            <Styled.SizeValue isSelfWrite={isSelfWrite ? true : false}>
              {size.toFixed(1)}
              <span>cm</span>
              {isSelfWrite && <Styled.Differ>+2</Styled.Differ>}
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
