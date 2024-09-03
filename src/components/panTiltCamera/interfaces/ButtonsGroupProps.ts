interface ButtonsGroupProps {
  className?: string;
  action?: 'recall' | 'toggleShow';
  list?: 'showHidden' | string;
  title?: string;
  onConfig?: () => void;
  modal?: string;
}

export default ButtonsGroupProps;