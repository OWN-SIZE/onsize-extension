import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { fetchMySize } from '../../../apis/api';
import icAlert from '../../../assets/icons/alert.svg';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import SplitedButton from '../../../components/common/SplitedButton';
import { SizeType } from '../../../components/size-compare';
import Compare from '../../../components/size-compare/Compare';
import SelfWriteCompare from '../../../components/size-compare/SelfWriteCompare';
import Tabs from '../../../components/size-compare/Tabs';
import { DOMAIN } from '../../../contants/domain';
import { LINK, MESSAGE } from '../../../contants/text';
import useTabs from '../../../hooks/ui/useTabs';
import { isSelfWriteState, mySizeState, productSelfWriteState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SizeCompare() {
  // 서버에서 받아오는 사용자 실측 사이즈 데이터
  const [mySize, setMySize] = useRecoilState(mySizeState);
  const isSelfWrite = useRecoilValue(isSelfWriteState);
  const productSelfWrite = useRecoilValue(productSelfWriteState);
  const [isLoading, setIsLoading] = useState(true);

  const { currentTab = 'top', handleTab } = useTabs();

  // 마이사이즈 조회
  const getMySize = async () => {
    const { top, bottom } = await fetchMySize();

    localStorage.setItem('topSize', JSON.stringify(top));
    localStorage.setItem('bottomSize', JSON.stringify(bottom));
    setMySize({ top, bottom });
  };

  const isEmptyData = (data: object) => {
    return Object.values(data).every((value) => value === null);
  };

  // 내 사이즈 조회
  useEffect(() => {
    (async () => {
      const data = await getMySize().then(() => setIsLoading(false));
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('currentTab', currentTab);
  }, [currentTab]);

  const [productSize, setProductSize] = useState<SizeType>({
    top: {
      topLength: productSelfWrite.topLength ?? 0,
      chest: productSelfWrite.chest ?? 0,
      shoulder: productSelfWrite.shoulder ?? 0,
      isWidthOfTop: productSelfWrite.isWidthOfTop ?? true,
    },
    bottom: {
      bottomLength: productSelfWrite.bottomLength ?? 0,
      waist: productSelfWrite.waist ?? 0,
      thigh: productSelfWrite.thigh ?? 0,
      rise: productSelfWrite.rise ?? 0,
      hem: productSelfWrite.hem ?? 0,
      isWidthOfBottom: productSelfWrite.isWidthOfBottom ?? true,
    },
  });

  const productTop = {
    topLength: productSize.top.topLength,
    shoulder: productSize.top.shoulder,
    chest: productSize.top.chest,
  };
  const productBottom = {
    bottomLength: productSize.bottom.bottomLength,
    waist: productSize.bottom.waist,
    thigh: productSize.bottom.thigh,
    rise: productSize.bottom.rise,
    hem: productSize.bottom.hem,
  };

  const getLink = <Styled.Link onClick={() => window.open(DOMAIN.MYSIZE)}>{LINK.BUTTON}</Styled.Link>;
  const { top, bottom } = mySize;
  const { topLength, shoulder, chest } = top;
  const { bottomLength, waist, thigh, rise, hem } = bottom;
  const noSize = isEmptyData(top) && isEmptyData(bottom);

  const myTop = {
    topLength: topLength as number,
    shoulder: shoulder as number,
    chest: chest as number,
  };

  const myBottom = {
    bottomLength: bottomLength as number,
    waist: waist as number,
    thigh: thigh as number,
    rise: rise as number,
    hem: hem as number,
  };

  const renderSelfWriteView = (
    <>
      {currentTab === 'top' ? (
        isEmptyData(top) ? (
          <Layout back close>
            <Main
              image={<Styled.Image src={icAlert} />}
              content={MESSAGE.NO_SIZE_COMPARE}
              caption={noSize}
              link={!noSize && getLink}
            />
          </Layout>
        ) : (
          <Layout title="내 사이즈와 이렇게 달라요" close>
            <SelfWriteCompare sizes={myTop} productSizes={productTop} />
          </Layout>
        )
      ) : isEmptyData(bottom) ? (
        <Layout back close>
          <Main
            image={<Styled.Image src={icAlert} />}
            content={MESSAGE.NO_SIZE_COMPARE}
            caption={noSize}
            link={!noSize && getLink}
          />
        </Layout>
      ) : (
        <Layout title="내 사이즈와 이렇게 달라요" close>
          <SelfWriteCompare sizes={myBottom} productSizes={productBottom} />
        </Layout>
      )}
    </>
  );

  const renderCompareView = (
    <Layout back close>
      {!noSize && <Tabs currentTab={currentTab} handler={handleTab} />}
      {currentTab === 'top' ? (
        isEmptyData(top) ? (
          <>
            <Main
              image={<Styled.Image src={icAlert} />}
              content={MESSAGE.NO_SIZE_COMPARE}
              caption={noSize}
              link={!noSize && getLink}
            />
            {noSize && <SplitedButton />}
          </>
        ) : (
          <Compare sizes={myTop} currentTab={currentTab} />
        )
      ) : isEmptyData(bottom) ? (
        <>
          <Main
            image={<Styled.Image src={icAlert} />}
            content={MESSAGE.NO_SIZE_COMPARE}
            caption={noSize}
            link={!noSize && getLink}
          />
          {noSize && <SplitedButton />}
        </>
      ) : (
        <Compare sizes={myBottom} currentTab={currentTab} />
      )}
    </Layout>
  );

  if (isLoading) return <></>;

  return isSelfWrite ? renderSelfWriteView : renderCompareView;
}

export default SizeCompare;

const Styled = {
  Link: styled.button`
    padding: 1.2rem 5.8rem;
    background: ${theme.colors.yellow01};
    box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
    border-radius: 2.15rem;

    ${theme.fonts.body2};
    color: ${theme.colors.black};
  `,
  Image: styled.img`
    width: 7.2rem;
    height: 7.2rem;
    object-fit: contain;
    margin-bottom: 2.6rem;
  `,
};
