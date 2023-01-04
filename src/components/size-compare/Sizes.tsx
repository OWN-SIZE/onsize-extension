import styled from 'styled-components';

import { BottomType, TabName, TopType } from '.';

interface SizesProps {
  sizes: TopType | BottomType | null;
  currentTab: TabName;
}

function Sizes(props: SizesProps) {
  const { sizes, currentTab } = props;

  return (
    <Styled.Root>
      {sizes &&
        Object.entries(sizes).map(([key, value]) => (
          <Styled.Size isTop={currentTab === 'top'}>
            <Styled.SizeKey>{key}</Styled.SizeKey>
            <Styled.SizeValue>
              {value.toFixed(1)}
              <span>cm</span>
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
  SizeValue: styled.p`
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #444444;
    & > span {
      padding-left: 0.4rem;
    }
  `,
};
