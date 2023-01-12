import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { currentViewState, historyState, productState, topOrBottomState } from '../../../states/atom';
import theme from '../../../styles/theme';
import { SaveProductInput } from '../../../types/remote';

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
    text: theme.colors.gray200,
    background: theme.colors.black,
  },
  '사이즈 추천 받기': {
    text: theme.colors.black,
    background: theme.colors.yellow,
  },
};
const colorMapper = (content: ContentType): ColorMapType => {
  return contentMap[content];
};

function Button(props: ButtonProps) {
  const { content } = props;
  const { text, background } = colorMapper(content);
  const [product, setProductState] = useRecoilState(productState);
  const topOrBottom = useRecoilValue(topOrBottomState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [history, setHistory] = useRecoilState(historyState);

  const postProductData = async (body: SaveProductInput) => {
    /** TODO : 옷장 저장 api */
  };
  const updateView = () => {
    setHistory(currentView);
    setCurrentView('save');
  };

  const saveProduct = () => {
    const productData = chrome.storage.sync.get(['product']).then(({ product: { image, productName } }) => {
      setProductState((prev) => ({ ...prev, image, productName }));
    });

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
    postProductData(product);
    updateView();
  };

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
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
  cursor: pointer;
  ${theme.fonts.title2}
`;
