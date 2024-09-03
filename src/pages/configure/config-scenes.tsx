import React from 'react';

import AddScene from '../../components/panTiltCamera/Scenes/AddScene';
import SceneButtons from '../../components/panTiltCamera/Scenes/SceneButtonsGroup';

const ConfigScenes: React.FC<{ className?: string }> = (props) => {
  return (
    <>
      <h1>Configure Scenes</h1>
      <SceneButtons action='toggleShow' />
      <SceneButtons action='toggleShow' list='showHidden' />
      <AddScene />
    </>
  );
};

export default ConfigScenes;
