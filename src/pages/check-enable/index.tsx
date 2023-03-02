import styled from 'styled-components';

import icAlert from '../../assets/icons/alert.svg';
import icLogoChanging from '../../assets/icons/logo_changing.svg';
import Layout from '../../components/common/Layout';
import { ENABLE_CONTENT_MESSAGE, LOGO_ACTIVATE_CAPTION, MESSAGE } from '../../contants/text';
import theme from '../../styles/theme';

function CheckEnable() {
  const isBoldText = (text: string): string | null => {
    const keywords = ['무신사', 'W컨셉, 오케이몰, 29CM, MR.PORTER, SSENSE'];
    let matchedKeyword = '';
    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        matchedKeyword = keyword;
      }
    });
    return matchedKeyword || null;
  };

  const lineExceptKeyword = (line: string, keyword: string) => {
    if (!keyword) return;

    const start = line.indexOf(keyword);
    const end = start + keyword.length;
    return line.slice(0, start) + line.slice(end);
  };

  return (
    <Layout close>
      <Styled.Root>
        <Styled.Image src={icAlert} />
        <Styled.Title>{MESSAGE.CHECK_ENABLE_SITE}</Styled.Title>
        {ENABLE_CONTENT_MESSAGE.split('\n').map((line, idx) => {
          const keyword = isBoldText(line);
          if (!keyword) return <Styled.Content key={idx}>{line}</Styled.Content>;
          return (
            <Styled.Content>
              <span>{keyword}</span>
              {lineExceptKeyword(line, keyword)}
            </Styled.Content>
          );
        })}
        <Styled.Caption>{LOGO_ACTIVATE_CAPTION}</Styled.Caption>
        <Styled.LogoChangingImage src={icLogoChanging} />
      </Styled.Root>
    </Layout>
  );
}

export default CheckEnable;

const Styled = {
  Root: styled.div`
    /* height: 27.1rem; */
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Image: styled.img`
    width: 7.2rem;
    height: 7.2rem;
    object-fit: contain;
    margin-bottom: 2.6rem;
  `,
  Title: styled.p`
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    color: ${theme.colors.black};
    margin-bottom: 1rem;
  `,
  Content: styled.p`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: #707070;
    & span {
      font-weight: 700;
    }
  `,
  Caption: styled.p`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: #707070;
    margin: 4rem 0 1.8rem 0;
  `,
  LogoChangingImage: styled.img``,
};
