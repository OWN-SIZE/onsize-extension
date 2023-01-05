import Layout from '../../../components/common/Layout';
import { BottomType, TopType } from '../../../components/size-compare';
import Compare from '../../../components/size-compare/Compare';
import SelfWriteCompare from '../../../components/size-compare/SelfWriteCompare';

interface SizeCompareProps {
  isSelfWrite: boolean;
}

// 서버에서 받아오는 사용자 실측 사이즈 데이터
const mySize = {
  top: {
    topLength: 50,
    shoulder: 50,
    chest: 50,
    isWidthOfTop: true,
  },
  bottom: {
    bottomLength: 50,
    waist: 50,
    thigh: 50,
    rise: 50,
    hem: 50,
    isWidthOfBottom: true,
  },
};
const top: Omit<TopType, 'isWidthOfTop'> = {
  topLength: mySize.top.topLength,
  shoulder: mySize.top.shoulder,
  chest: mySize.top.chest,
};
const bottom: Omit<BottomType, 'isWidthOfBottom'> = {
  bottomLength: mySize.bottom.bottomLength,
  rise: mySize.bottom.rise,
  waist: mySize.bottom.waist,
  thigh: mySize.bottom.thigh,
  hem: mySize.bottom.hem,
};

function SizeCompare(props: SizeCompareProps) {
  const { isSelfWrite } = props;

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
