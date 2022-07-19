import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { BaseComponent } from '../../types';
import IconButton from '../IconButton';

const useStyles = makeStyles((/*theme*/) => {
  return {
    root: {},
  };
});

export interface NavigationToggleButtonProps extends Omit<BaseComponent<'button'>, 'onClick'> {
    /**
     * Icon to display if the navbar is closed
     */
    closeIcon? : string,
    /**
     * Icon to display if the navbar is open
     */
    openIcon? : string,
    onClick? : (e: React.MouseEvent<HTMLButtonElement, MouseEvent> , navbarOpen : boolean)=>void;
}

export function NavigationToggleButton({
  className,
  style,
  sx,
  closeIcon = 'menu',
  openIcon = 'push_pin',
  onClick
}: NavigationToggleButtonProps) {
  const styles = useStyles();

  const dispatch = useDispatch();
  const {navbar} = useSelector<any, any>(({icatalyst}) => icatalyst.settings.current.layout);

  return (
    <IconButton
        className={clsx(styles.root, className)} 
        style={style}
        sx={sx}
        icon={navbar.folded ? openIcon : closeIcon}
        onClick={(e)=>{
            onClick && onClick(e, !navbar.folded);
            // TODO: Sort out Actions
            return dispatch(
                {
                    type : 'navbar toggle',
                    payload : !navbar.folded
                }
                // Actions.navbarToggle()
            )
        }}
    />
  );
}

export default NavigationToggleButton;