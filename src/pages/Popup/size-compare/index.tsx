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
import { LINK, MESSAGE } from '../../../contants/main';
import { isSelfWriteState, mySizeState, topOrBottomState } from '../../../states/atom';

function SizeCompare() {
  // 서버에서 받아오는 사용자 실측 사이즈 데이터
  const [mySize, setMySize] = useRecoilState(mySizeState);
  const isSelfWrite = useRecoilValue(isSelfWriteState);
  const topOrBottom = useRecoilValue(topOrBottomState);
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

  const getLink = <Styled.Link>{LINK.BUTTON}</Styled.Link>;
  const noSize = !productTop && !productBottom;

  if (!mySize.top || !mySize.bottom)
    return (
      <>
        <Main src={icAlert} content={MESSAGE.NO_SIZE_COMPARE} caption={noSize} link={!noSize && getLink} />
        {noSize && <SplitedButton />}
      </>
    );

  // 상의인 경우
  return topOrBottom === 'top' ? (
    isSelfWrite ? (
      <Layout title="내 사이즈와 이렇게 달라요" close>
        <SelfWriteCompare sizes={productTop} />
      </Layout>
    ) : (
      <Layout back close>
        <Compare sizes={productTop} noSize={noSize} />
      </Layout>
    )
  ) : // 하의인 경우
  isSelfWrite ? (
    <Layout title="내 사이즈와 이렇게 달라요" close>
      <SelfWriteCompare sizes={productBottom} />
    </Layout>
  ) : (
    <Layout back close>
      <Compare sizes={productBottom} noSize={noSize} />
    </Layout>
  );
}

export default SizeCompare;

const Styled = {
  Link: styled.button`
    padding: 1.2rem 5.8rem;
    margin-top: 2.6rem;
    background: #fffaad;
    box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
    border-radius: 2.15rem;

    font-weight: 600;
    font-size: 1.4rem;
    color: #1e2025;
  `,
};
