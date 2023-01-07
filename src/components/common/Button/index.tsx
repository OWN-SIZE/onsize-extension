import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { ProductType } from '../../../states';
import { productState, topOrBottomState } from '../../../states/atom';

interface ButtonProps {
  content: ContentType;
}

type ContentType = '저장' | '사이즈 추천 받기';

interface ColorMapType {
  background: string;
  text: string;
}

const contentMap = {
  저장: {
    text: '#D9D9D9',
    background: '#1E2025',
  },
  '사이즈 추천 받기': {
    text: '#1E2025',
    background: ' #FBF26C',
  },
};
const colorMapper = (content: ContentType): ColorMapType => {
  return contentMap[content];
};

function Button(props: ButtonProps) {
  const { content } = props;
  const { background, text } = colorMapper(content);
  const [product, setProductState] = useRecoilState(productState);
  const topOrBottom = useRecoilValue(topOrBottomState);

  const saveProduct = () => {
    const productData = chrome.storage.sync.get(['product']).then(({ product: { image, productName } }) => {
      setProductState((prev) => ({ ...prev, image, productName }));
    });

    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          const { url, favIconUrl } = tabs[0];
          if (!url || !favIconUrl) return;

          setProductState((prev) => ({
            ...prev,
            favIconUrl,
            productUrl: url,
            topOrBottom: topOrBottom === 'top' ? 0 : 1,
          }));
        },
      );
  };
  console.log('product > ', product);

  return (
    <Root text={text} background={background} onClick={saveProduct}>
      {content}
    </Root>
  );
}

export default Button;

const Root = styled.div<{ text: string; background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.6rem;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 120%;
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
  cursor: pointer;
`;
