import { Fade, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { forwardRef, isValidElement, MouseEvent, MouseEventHandler, ReactElement, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IconButton } from '../../buttons';
import { Icon } from '../../icons';
import { BaseComponent, ComponentAlignmentHorizontal, ComponentAlignmentVertical, ComponentColor, ComponentSize } from '../../types';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            cursor: 'default',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        menuLabel: {
            marginRight: theme.spacing(1),
            flexGrow: 1,
            cursor: 'pointer',
        },
        dropdown: {
            cursor: 'pointer',
        },
        listItem: {
            padding: 0,
            paddingRight: theme.spacing(2),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        listItemText: {
        },
        subListItem: {
            paddingRight: 0
        },
        subListItemText: {},
        menuItem: {},
        menuItemElement: {
            minHeight: 0,
            cursor: 'default',
            '&:hover': {
                background: 'transparent'
            }
        }
    };
});

export type MenuItem = {
    title: string;
    icon?: string;
    subtitle?: string;
    onClick?: MouseEventHandler<any>,
    iconColor?: ComponentColor,
    showLabel?: boolean;
    menu?: (MenuItem | ReactElement)[],
    open?: boolean
};

export interface DropdownMenuProps extends Omit<BaseComponent<'span'>, 'onChange'> {
    label?: string;
    secondaryLabel?: string;
    title?: string;
    prefixIcon?: string;
    prefixIconColor?: ComponentColor;
    icon?: string;
    iconColor?: ComponentColor;
    size?: ComponentSize;
    onClose?: (e: MouseEvent) => void;
    anchorOrigin?: {
        vertical: ComponentAlignmentVertical,
        horizontal: ComponentAlignmentHorizontal
    }
    transformOrigin?: {
        vertical: ComponentAlignmentVertical,
        horizontal: ComponentAlignmentHorizontal
    },
    TransitionComponent?: React.JSXElementConstructor<
        TransitionProps & { children: React.ReactElement<any, any> }
    >,
    menu: (MenuItem | ReactElement)[]
}

export const DropdownMenu = forwardRef(({
    className,
    style,
    label,
    secondaryLabel,
    title,
    icon,
    iconColor = 'inherit',
    prefixIcon,
    prefixIconColor = 'inherit',
    size = 'medium',
    id,
    onClose,
    anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'right'
    },
    transformOrigin = {
        vertical: 'top',
        horizontal: 'right'
    },
    TransitionComponent = Fade,
    menu,
    // @ts-expect-error 'open' is a hidden prop for use in sub menues
    open = false,
}: DropdownMenuProps, ref) => {
    const styles = useStyles();
    const menuWrapperRef = useRef<HTMLDivElement>(null);

    const menuID = `${id}_menu`;

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const openMenu: MouseEventHandler<any> = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setAnchorEl(menuWrapperRef.current);
    };

    const closeMenu = (e: MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        setAnchorEl(null);
        onClose && onClose(e);
    };

    useEffect(() => {
        if (!open && anchorEl) {
            // @ts-expect-error we are protecting against undefined in the method so this is okay
            closeMenu(undefined);
        }
    }, [open]);

    useImperativeHandle(ref, () => {
        return {
            openMenu,
            closeMenu
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    icon = icon || (label ? 'arrow_drop_down' : 'more_vertical');

    const renderMenuItem = (item: MenuItem | ReactElement) => {
        let menuContent: ReactElement;
        let key = null;
        let isElement = false;

        if (isValidElement(item)) {
            key = (item as ReactElement).key;
            menuContent = item as ReactElement;
            isElement = true;
        } else {
            key = `${item.icon}-${item.title}`;

            const showLabel = item.showLabel === undefined || item.showLabel;
            const iconColor = item.iconColor || 'inherit';
            const hasSubMenu = !!item.menu;

            menuContent = (
                <ListItem
                    className={clsx(
                        styles.listItem,
                        hasSubMenu && styles.subListItem
                    )}
                    aria-label={item.title}
                    onClick={(e) => {
                        closeMenu(e as MouseEvent<any>);
                        item.onClick && item.onClick(e);
                    }}
                >
                    {(!hasSubMenu && item.icon) && (
                        <ListItemIcon>
                            <Icon
                                color={iconColor}
                            >
                                {item.icon}
                            </Icon>
                        </ListItemIcon>
                    )}

                    {(!hasSubMenu && showLabel) && (
                        <ListItemText
                            className={clsx(
                                styles.listItemText,
                                hasSubMenu && styles.subListItemText
                            )}
                            primary={item.title}
                            secondary={item.subtitle}
                        />
                    )}

                    {hasSubMenu && (
                        <DropdownMenu
                            className={clsx(styles.dropdown)}
                            icon="chevron_right"
                            prefixIcon={item.icon}
                            prefixIconColor={item.iconColor}
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            menu={item.menu!}
                            label={item.title}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            // @ts-expect-error 'open' is a hidden prop
                            open={!!anchorEl}
                            onClose={closeMenu}
                        />
                    )}
                </ListItem>
            );
        }

        return (
            <MenuItem
                key={key}
                className={clsx(styles.menuItem, isElement && styles.menuItemElement)}
                disableTouchRipple={isElement}
                disableRipple={isElement}
            >
                {menuContent}
            </MenuItem>
        );
    };

    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
            ref={menuWrapperRef}
        >
            {prefixIcon && (
                <ListItemIcon>
                    <Icon
                        color={prefixIconColor}
                        onClick={openMenu}
                    >
                        {prefixIcon}
                    </Icon>
                </ListItemIcon>
            )}

            {label && (
                <ListItemText
                    className={clsx(styles.menuLabel)}
                    primary={label}
                    secondary={secondaryLabel}
                    onClick={openMenu}
                />
            )}
            <IconButton
                icon={icon}
                color={iconColor}
                size={size}
                title={title}
                aria-haspopup="menu"
                aria-controls={anchorEl ? menuID : undefined}
                onClick={openMenu}
            />
            <Menu
                id={menuID}
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={closeMenu}
                keepMounted
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                TransitionComponent={TransitionComponent}
            >
                {
                    menu && menu.filter(i => i).map(renderMenuItem)
                }
            </Menu>
        </div>
    );
});

export default DropdownMenu;