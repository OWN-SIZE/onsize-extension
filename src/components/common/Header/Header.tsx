import styled from 'styled-components';

import icBack from '../../../assets/icons/back.svg';
import icClose from '../../../assets/icons/close.svg';
import { useRemoveLocalStorage } from '../../../hooks/queries/useRemoveLocalStorage';
import { useGoBackToHistory } from '../../../hooks/ui/useGoBackToHistory';
import theme from '../../../styles/theme';

interface HeaderProps {
  back?: boolean;
  title?: string;
  close?: boolean;
}

function Header(props: HeaderProps) {
  const { back, title, close } = props;
  const { goBackToHistory } = useGoBackToHistory();
  const { removeLocalStorageItem } = useRemoveLocalStorage();

  const reset = () => {
    removeLocalStorageItem(
      'currentView',
      'currentTab',
      'recommend-size',
      'productImage',
      'history',
      'isSelfWrite',
      'productSizes',
      'topOrBottom',
    );
    window.close();
  };

  return (
    <Styled.Root>
      <Styled.Back>{back && <img src={icBack} alt="back" onClick={goBackToHistory} />}</Styled.Back>
      <Styled.Title>{title || null}</Styled.Title>
      <Styled.Close>{close && <img src={icClose} alt="close" onClick={reset} />}</Styled.Close>
    </Styled.Root>
  );
}

export default Header;

const Styled = {
  Root: styled.div`
    width: 100%;
    height: 4.2rem;
    display: flex;
    padding: 1.8rem 1.7rem;
    justify-content: space-between;
    align-items: center;
  `,
  Back: styled.div`
    width: 2.4rem;
    height: 2.4rem;

    & > img {
      width: 2.4rem;
      height: 2.4rem;
      cursor: pointer;
    }
  `,
  Title: styled.h1`
    ${theme.fonts.title1}
    color: ${theme.colors.black};
  `,
  Close: styled.div`
    width: 2.4rem;
    height: 2.4rem;

    & > img {
      width: 2.4rem;
      height: 2.4rem;
      cursor: pointer;
    }
  `,
};
