import React from 'react';

import Card from '../../UI/Card';
import SceneButton from './SceneButton';
import ScenesIcon from '@mui/icons-material/BurstMode';
import { useStore } from '../../../store/store';
import { SceneState } from '../../../store/scenes-store';
import { recallScenes } from '../../../services/obs-http-requests';
import classes from './SceneButtonsGroup.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseConfig from '@mui/icons-material/CancelPresentation';
import ButtonsGroupProps from '../interfaces/ButtonsGroupProps';


const SceneButtonsGroup: React.FC<ButtonsGroupProps> = ({
  className,
  action,
  list,
  title,
  onConfig,
  modal
}) => {
  const [state, dispatch] = useStore();
  const scenes: SceneState[] = state.scenes;

  let showHiddenList = list === 'showHidden';

  const onClickHandler = (name: string) => {
    switch (action) {
      case 'recall':
        recallScenes(name);
        dispatch('CURRENT_SCENE', name);
        break;
      case 'toggleShow':
        dispatch('TOGGLE_SHOW_SCENE', name);
        break;
      default:
        return;
    }
  };

  const header = (
    <div className={classes.header}>
      <div className={classes.iconHeader}>
        <ScenesIcon />
        <h3 className={`${classes.title} ${className || ''}`}>
          {showHiddenList ? 'Hidden ' : 'Current '}
          {title}
        </h3>
      </div>
      <span onClick={onConfig}>
        {((modal === 'Scenes') && <CloseConfig className={classes.iconHeader} />) ||
        <SettingsIcon className={classes.iconHeader} />}
      </span>
    </div>
  )

  const sceneList = (
    <div className={`${classes.btnGrp} ${className || ''}`}>
      {scenes.length > 0 ? (
        scenes.map(
          (scene: SceneState) =>
            (showHiddenList ? !scene.isShow : scene.isShow) && (
              <SceneButton
                className={`${classes.btn} ${className || ''}`}
                key={scene.name}
                name={scene.name}
                description={scene.description}
                isShow={scene.isShow}
                isCurrent={scene.isCurrent}
                onClick={() => onClickHandler(scene.name)}
              >
                {scene.name}
              </SceneButton>
            )
        )
      ) : (
        <p>No scenes found.</p>
      )}
    </div>
  );

  return (
    <Card className={`${classes.card || ''} ${className || ''}`}>
      {header}
      {sceneList}
    </Card>
  );
};

export default SceneButtonsGroup;
