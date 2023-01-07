import { useRecoilValue } from 'recoil';

import { mySizeState } from '../../../states/atom';
import CannotLoadSize from '../cannotloadsize';
import SizeCompare from '../size-compare';

function Result() {
  const mySize = useRecoilValue(mySizeState);

  return mySize ? <SizeCompare isSelfWrite={true} /> : <CannotLoadSize />;
}

export default Result;
