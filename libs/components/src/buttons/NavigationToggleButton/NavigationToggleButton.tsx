import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector, useSettingsSelector } from '../../store/hooks';
import { BaseComponent } from '../../types';
import IconButton, { IconButtonProps } from '../IconButton';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {},
    };
});

export interface NavigationToggleButtonProps extends Omit<IconButtonProps, 'onClick'> {
    /**
     * Icon to display if the navbar is closed
     */
    closeIcon?: string,
    /**
     * Icon to display if the navbar is open
     */
    openIcon?: string,
    /**
     * Fires when the button is clicked.
     * isNavbarOpen is the new state of the navbar due to the click
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, isNavbarOpen: boolean) => void;
}

export function NavigationToggleButton({
    className,
    style,
    sx,
    closeIcon = 'menu',
    openIcon = 'push_pin',
    title,
    onClick,
    ...rest
}: NavigationToggleButtonProps) {
    const styles = useStyles();

    const dispatch = useAppDispatch();
    const { navbar = {
        folded: true
    } } = useSettingsSelector((settings) => {
        console.error('CHECK THE PROPER KEY');
        console.log(settings);
        return settings.test || {};
    });

    // const dispatch = useDispatch();
    // const { navbar } = useSelector<any, any>(({ icatalyst }) => icatalyst.settings.current.layout);

    return (
        <IconButton
            className={clsx(styles.root, className)}
            style={style}
            sx={sx}
            title={title}
            icon={navbar.folded ? openIcon : closeIcon}
            onClick={(e) => {
                onClick && onClick(e, !navbar.folded);
                // TODO: Sort out Actions
                console.error('TOGGLE NAVBAR');
                // return dispatch(
                //     {
                //         type: 'navbar toggle',
                //         payload: !navbar.folded
                //     }
                //     // Actions.navbarToggle()
                // )
            }}
            {...rest}
        />
    );
}

export default NavigationToggleButton;