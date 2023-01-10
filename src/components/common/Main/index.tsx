import { ReactNode } from 'react';
import styled from 'styled-components';

import { CAPTION } from '../../../contants/main';
import theme from '../../../styles/theme';

interface AlertProps {
  image?: ReactNode;
  content?: string;
  caption?: boolean;
  link?: ReactNode;
  noPadding?: boolean;
}

function Main(props: AlertProps) {
  const { image, content, caption, link, noPadding } = props;

  return (
    <Styled.Root noPadding={noPadding ? true : false}>
      {image}
      <Styled.Content>{content}</Styled.Content>
      {caption && <Styled.Caption>{CAPTION}</Styled.Caption>}
      {link && <Styled.Link>{link}</Styled.Link>}
    </Styled.Root>
  );
}

export default Main;

const Styled = {
  Root: styled.div<{ noPadding: boolean }>`
    height: 27.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${({ noPadding }) => (noPadding ? '1.4rem' : '3.5rem')};
  `,
  Content: styled.h1`
    ${theme.fonts.title1};
    color: ${theme.colors.black};
  `,
  Caption: styled.div`
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 3.2rem;
    color: ${theme.colors.gray300};
    margin-top: 0.815rem;
  `,
  Link: styled.div`
    margin-top: 2.6rem;
  `,
};
