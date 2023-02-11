import { useSaveProduct } from '../../hooks/queries/useSaveProduct';
import Button from '../common/Button';

function SaveButton() {
  const { onClickSaveProduct } = useSaveProduct();

  return <Button content="저장" onClick={onClickSaveProduct} />;
}

export default SaveButton;
