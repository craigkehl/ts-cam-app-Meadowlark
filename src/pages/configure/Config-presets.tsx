import PresetButtonsGroup from '../../components/panTiltCamera/Presets/PresetButtonsGroup';
import AddPreset from '../../components/panTiltCamera/Presets/AddPreset';
import UpdatePresetById from '../../components/panTiltCamera/Presets/UpdatePresetById';

const ConfigPresets: React.FC<{ className?: string }> = (props) => {

  return (
    <>
      <h1>Configure Presets</h1>
      <PresetButtonsGroup
        action='toggleShow'
        title='Remove from Visible Presets'
      />
      <PresetButtonsGroup
        action='toggleShow'
        title='Add back to Visible Presets'
        list='hidden'
      />
      <AddPreset />
      <UpdatePresetById />
    </>
  );
};

export default ConfigPresets;
