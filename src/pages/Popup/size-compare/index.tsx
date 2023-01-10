import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import icAlert from '../../../assets/icons/alert.svg';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import SplitedButton from '../../../components/common/SplitedButton';
import { SizeType } from '../../../components/size-compare';
import Compare from '../../../components/size-compare/Compare';
import SelfWriteCompare from '../../../components/size-compare/SelfWriteCompare';
import Tabs from '../../../components/size-compare/Tabs';
import { LINK, MESSAGE } from '../../../contants/main';
import useTabs from '../../../hooks/ui/useTabs';
import { isSelfWriteState, mySizeState, topOrBottomState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SizeCompare() {
  // 서버에서 받아오는 사용자 실측 사이즈 데이터
  const [mySize, setMySize] = useRecoilState(mySizeState);
  const isSelfWrite = useRecoilValue(isSelfWriteState);
  const topOrBottom = useRecoilValue(topOrBottomState);
  const { currentTab, handleTab } = useTabs();

  const [productSize, setProductSize] = useState<SizeType>({
    top: {
      topLength: 13.4,
      chest: 28,
      shoulder: 19.8,
      isWidthOfTop: true,
    },
    bottom: {
      bottomLength: 12.3,
      waist: 45.67,
      thigh: 24.5,
      rise: 10,
      hem: 28,
      isWidthOfBottom: true,
    },
  });

  const productTop = {
    topLength: productSize.top?.topLength,
    shoulder: productSize.top?.shoulder,
    chest: productSize.top?.chest,
  };
  const productBottom = {
    bottomLength: productSize.bottom?.bottomLength,
    waist: productSize.bottom?.waist,
    thigh: productSize.bottom?.thigh,
    rise: productSize.bottom?.rise,
    hem: productSize.bottom?.hem,
  };

  const myTop = mySize.top
    ? {
        topLength: mySize.top?.topLength,
        shoulder: mySize.top?.shoulder,
        chest: mySize.top?.chest,
      }
    : null;

  const myBottom = mySize.bottom
    ? {
        bottomLength: mySize.bottom?.bottomLength,
        waist: mySize.bottom?.waist,
        thigh: mySize.bottom?.thigh,
        rise: mySize.bottom?.rise,
        hem: mySize.bottom?.hem,
      }
    : null;

  const getLink = (
    <Styled.Link
      onClick={() => {
        /** TODO : 웹 도메인 window.open */
      }}
    >
      {LINK.BUTTON}
    </Styled.Link>
  );
  const noSize = !myTop && !myBottom;

  return isSelfWrite ? (
    <Layout title="내 사이즈와 이렇게 달라요" close>
      <SelfWriteCompare sizes={topOrBottom === 'top' ? productTop : productBottom} />
    </Layout>
  ) : (
    <Layout back close>
      {!noSize && <Tabs currentTab={currentTab} handler={handleTab} />}
      {currentTab === 'top' ? (
        !myTop ? (
          <>
            <Main src={icAlert} content={MESSAGE.NO_SIZE_COMPARE} caption={noSize} link={!noSize && getLink} />
            {noSize && <SplitedButton />}
          </>
        ) : (
          <Compare sizes={myTop} currentTab={currentTab} />
        )
      ) : !myBottom ? (
        <>
          <Main src={icAlert} content={MESSAGE.NO_SIZE_COMPARE} caption={noSize} link={!noSize && getLink} />
          {noSize && <SplitedButton />}
        </>
      ) : (
        <Compare sizes={myBottom} currentTab={currentTab} />
      )}
    </Layout>
  );
}

export default SizeCompare;

const Styled = {
  Link: styled.button`
    padding: 1.2rem 5.8rem;
    margin-top: 2.6rem;
    background: ${theme.colors.yellow01};
    box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
    border-radius: 2.15rem;

    ${theme.fonts.body2};
    color: ${theme.colors.black};
  `,
};
