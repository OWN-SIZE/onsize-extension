import styled, { css } from 'styled-components';

import theme from '../../styles/theme';

interface OptionProps {
  src?: string;
  caption?: '상의' | '하의';
  isActive?: boolean;
  onClick?: () => void;
}

function OptionButton(props: OptionProps) {
  const { src, caption, isActive, onClick } = props;
  return (
    <Styled.Root isActive={isActive} onClick={onClick}>
      <img src={src} alt={`${caption} 버튼이미지`} />
      <Styled.Caption>{caption}</Styled.Caption>
    </Styled.Root>
  );
}

export default OptionButton;

const Styled = {
  Root: styled.button<{ isActive?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 1.9rem 0;
    width: 11.8rem;
    height: 14.6rem;
    background: ${theme.colors.gray000};
    border-radius: 1rem;

    ${({ isActive }) =>
      isActive
        ? css`
            border: 0.2rem solid ${theme.colors.yellow};
            box-shadow: 0rem 0rem 1rem rgba(251, 242, 108, 0.5);
          `
        : css`
            border: 0.1rem solid #f6f6f6;
            box-shadow: 0 0 1rem 0.8rem rgba(0, 0, 0, 0.05);
          `};
  `,
  Caption: styled.p`
    color: ${theme.colors.black};
    ${theme.fonts}
  `,
};
