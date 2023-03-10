import styled from 'styled-components';

import theme from '../../styles/theme';

import { TabName } from '.';

interface TabsProps {
  currentTab: string;
  handler: (tabName: TabName) => void;
}

function Tabs(props: TabsProps) {
  const { currentTab, handler } = props;

  return (
    <>
      <Styled.Root>
        <Styled.Tab onClick={() => handler('top')} isSelected={currentTab === 'top'}>
          상의
        </Styled.Tab>
        <Styled.Tab onClick={() => handler('bottom')} isSelected={currentTab === 'bottom'}>
          하의
        </Styled.Tab>
        <Styled.Line />
      </Styled.Root>
    </>
  );
}

export default Tabs;

const Styled = {
  Root: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 4.4rem;
  `,
  Tab: styled.div<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    padding-bottom: 0.3rem;
    cursor: pointer;
    z-index: 1;
    color: ${({ isSelected }) => (isSelected ? theme.colors.gray550 : theme.colors.gray200)};
    border-bottom: 2px solid ${({ isSelected }) => (isSelected ? theme.colors.gray550 : theme.colors.gray200)};
    ${theme.fonts.title1}
  `,
  Line: styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.2rem;
    background-color: #dcdcdc;
    z-index: 0;
  `,
};
