import { useRef } from 'react';

import { useStore } from '../../../store/store';
import Card from '../../UI/Card';
import Input from '../../UI/Input';

import classes from './UpdatePresetById.module.css';

type Props = { 
  className?: string 
}
const UpdatePresetById: React.FC = ({ className }: Props) => {
  const dispatch = useStore()[1];

  const idInputRef = useRef<HTMLInputElement>(null);

  const updatePresetHandler = () => {
    if (idInputRef.current?.value) {
      const id = idInputRef.current.value;
      dispatch('UPDATE_PRESET', id);
    }
  }

  return (
    <Card className={className}>
    <div className={classes.form}>
      <Input
        className={classes.input}
        ref={idInputRef}
        label='Update Preset'
        input={{
          id: 'inputId',
          type: 'text',
        }}
      />
      <button type='button' onClick={updatePresetHandler}>
        + Update
      </button>
    </div>
    </Card>
  )
}

export default UpdatePresetById;