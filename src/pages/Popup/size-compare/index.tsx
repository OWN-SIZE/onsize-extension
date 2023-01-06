import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Layout from '../../../components/common/Layout';
import { SizeType } from '../../../components/size-compare';
import Compare from '../../../components/size-compare/Compare';
import SelfWriteCompare from '../../../components/size-compare/SelfWriteCompare';
import { mySizeState } from '../../../states/atom';

interface SizeCompareProps {
  isSelfWrite: boolean;
}

function SizeCompare(props: SizeCompareProps) {
  const { isSelfWrite } = props;

  // 서버에서 받아오는 사용자 실측 사이즈 데이터
  const [mySize, setMySize] = useRecoilState(mySizeState);
  const [inputSize, setInputSize] = useState<SizeType>({
    top: null,
    bottom: {
      bottomLength: 12.3,
      waist: 45.67,
      thigh: 24.5,
      rise: 10,
      hem: 28,
      isWidthOfBottom: true,
    },
  });

  const top = {
    topLength: inputSize.top?.topLength,
    shoulder: inputSize.top?.shoulder,
    chest: inputSize.top?.chest,
  };
  const bottom = {
    bottomLength: inputSize.bottom?.bottomLength,
    waist: inputSize.bottom?.waist,
    thigh: inputSize.bottom?.thigh,
    rise: inputSize.bottom?.rise,
    hem: inputSize.bottom?.hem,
  };

  return isSelfWrite ? (
    <Layout title="내 사이즈와 이렇게 달라요" close>
      <SelfWriteCompare sizes={bottom} />
    </Layout>
  ) : (
    <Layout back close>
      <Compare sizes={bottom} noSize={!top && !bottom} />
    </Layout>
  );
}

export default SizeCompare;
