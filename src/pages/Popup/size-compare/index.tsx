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
import { isSelfWriteState, mySizeState, productSelfWriteState, topOrBottomState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SizeCompare() {
  // 서버에서 받아오는 사용자 실측 사이즈 데이터
  const [mySize, setMySize] = useRecoilState(mySizeState);
  const isSelfWrite = useRecoilValue(isSelfWriteState);
  const topOrBottom = useRecoilValue(topOrBottomState);
  const productSelfWrite = useRecoilValue(productSelfWriteState);

  const { top, bottom } = mySize;
  const { currentTab = 'top', handleTab } = useTabs();

  // 마이사이즈 조회
  const getMySize = async () => {
    const { top, bottom } = await fetchMySize();

    localStorage.setItem('topSize', JSON.stringify(top));
    localStorage.setItem('bottomSize', JSON.stringify(bottom));
    setMySize({ top, bottom });
  };

  // 내 사이즈 조회
  useEffect(() => {
    (async () => await getMySize())();
  }, []);

  useEffect(() => {
    localStorage.setItem('currentTab', currentTab);
  }, [currentTab]);

  /** TODO : 수동입력 시 그 입력한 값을 여기에 저장 */
  const [productSize, setProductSize] = useState<SizeType>({
    top: {
      topLength: productSelfWrite.topLength ?? 0,
      chest: productSelfWrite.chest ?? 0,
      shoulder: productSelfWrite.shoulder ?? 0,
      isWidthOfTop: productSelfWrite.isWidthOfTop,
    },
    bottom: {
      bottomLength: productSelfWrite.bottomLength ?? 0,
      waist: productSelfWrite.waist ?? 0,
      thigh: productSelfWrite.thigh ?? 0,
      rise: productSelfWrite.rise ?? 0,
      hem: productSelfWrite.hem ?? 0,
      isWidthOfBottom: productSelfWrite.isWidthOfBottom,
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

  const myTop = top
    ? {
        topLength: top.topLength,
        shoulder: top.shoulder,
        chest: top.chest,
      }
    : {
        topLength: 0,
        shoulder: 0,
        chest: 0,
      };

  const myBottom = bottom
    ? {
        bottomLength: bottom.bottomLength,
        waist: bottom.waist,
        thigh: bottom.thigh,
        rise: bottom.rise,
        hem: bottom.hem,
      }
    : {
        bottomLength: 0,
        waist: 0,
        thigh: 0,
        rise: 0,
        hem: 0,
      };

  const getLink = (
    <Styled.Link
      onClick={() => {
        window.open(DOMAIN.LOGIN);
      }}
    >
      {LINK.BUTTON}
    </Styled.Link>
  );
  const noSize = !myTop && !myBottom;

  return isSelfWrite ? (
    <Layout title="내 사이즈와 이렇게 달라요" close>
      <SelfWriteCompare
        sizes={topOrBottom === 'top' ? myTop : myBottom}
        productSizes={topOrBottom === 'top' ? productTop : productBottom}
      />
    </Layout>
  ) : (
    <Layout back close>
      {!noSize && <Tabs currentTab={currentTab} handler={handleTab} />}

      {currentTab === 'top' ? (
        !myTop ? (
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
      ) : !myBottom ? (
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
