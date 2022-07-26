import { ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Popper, PopperPlacementType, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Container } from '../../containers';
import { Icon } from '../../icons';
import Button, { ButtonProps } from '../Button';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            '& .MenuButton .MuiButton-endIcon, & .MenuButton .MuiButton-startIcon': {
                marginLeft: 0,
                marginRight: 0,
            }
        },
        menu: {
            zIndex: 999
        },
        menuContainer: {
            padding: theme.spacing(0),
        },
        optionWrapper: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        itemIconButton: {
            marginRight: theme.spacing(2)
        },
    };
});

export type SplitButtonMenuOption = {
    label: string;
    className?: string;
    icon?: string;
    selectedLabel?: string;
    onClick?: (e: React.MouseEvent, option: SplitButtonMenuOption) => void
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SplitButtonProps extends ButtonProps {
    /**
     * Placement of the popup menu
     */
    placement?: PopperPlacementType;
    options: SplitButtonMenuOption[];
    /**
     * The initial option to select if nothing else is selected
     */
    selectedIndex?: number;
    renderOption?: (option: SplitButtonMenuOption) => ReactElement;

}

export function SplitButton({
    className,
    children,
    variant = 'contained',
    icon = 'arrow_drop_down',
    iconPosition = 'start',
    style,
    color = 'primary',
    size = 'medium',
    id,
    placement = 'bottom-end',
    onChange,
    options = [],
    selectedIndex = 0,
    renderOption,
    ...rest
}: SplitButtonProps) {
    const styles = useStyles();

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[selectedIndex]);

    const menuID = `${id}_split_menu`;

    renderOption = renderOption || ((option: SplitButtonMenuOption) => {
        return (
            <div className={clsx(styles.optionWrapper)}>
                {
                    <Icon
                        className={clsx(styles.itemIconButton, option.className)}
                        size="inherit"
                        color="inherit"
                        title={option.label}
                    >
                        {option.icon || 'blank'}
                    </Icon>
                }
                {
                    (option.selectedLabel || option.label) && (
                        <Typography>
                            {(selectedOption === option && option.selectedLabel) || option.label}
                        </Typography>
                    )
                }
            </div>
        );
    });

    useEffect(() => {
        setSelectedOption(options[selectedIndex]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

    const toggleMenu = () => {
        setOpen((previousOpen) => !previousOpen);
    };

    const onMenuClosed = () => {
        setOpen(false);
    };

    const selectOption = (e: React.MouseEvent, option: SplitButtonMenuOption) => {
        setSelectedOption(option);
        setOpen(false);
    };

    const buttonText = selectedOption?.selectedLabel || selectedOption?.label || '';

    return (
        <div className={clsx(styles.root, className)}>
            <ButtonGroup
                variant={variant}
                color={color}
                size={size}
                ref={anchorRef}
                aria-label={buttonText}
            >
                <Button
                    variant={variant}
                    color={color}
                    size={size}
                    icon={selectedOption?.icon}
                    iconPosition={iconPosition}
                    onClick={(e) => {
                        selectedOption?.onClick && selectedOption.onClick(e, selectedOption);
                    }}
                >
                    {buttonText}
                </Button>
                <Button
                    className={clsx('MenuButton')}
                    size='small'
                    icon={icon}
                    variant={variant}
                    color={color}
                    aria-controls={open ? menuID : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label={buttonText}
                    aria-haspopup="menu"
                    onClick={toggleMenu}
                >
                </Button>
            </ButtonGroup>

            <Popper
                className={clsx(styles.menu)}
                open={open}
                anchorEl={anchorRef.current}
                role="menu"
                transition
                disablePortal
                placement={placement}
            >
                {
                    ({ TransitionProps }) => {
                        return (
                            <Grow
                                {...TransitionProps}
                            >
                                <Container
                                    elevation={1}
                                    className={clsx(styles.menuContainer)}
                                >
                                    <ClickAwayListener onClickAway={onMenuClosed}>
                                        <MenuList
                                            id={menuID}
                                            autoFocusItem
                                        >
                                            {
                                                options.filter(o => o !== selectedOption).filter(i => i).map((option) => {
                                                    return (
                                                        <MenuItem
                                                            key={option.label}
                                                            onClick={(e) => {
                                                                selectOption(e, option);
                                                            }}
                                                        >
                                                            {
                                                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                                                renderOption!(option)
                                                            }
                                                        </MenuItem>
                                                    );
                                                })
                                            }
                                        </MenuList>
                                    </ClickAwayListener>
                                </Container>
                            </Grow>
                        );
                    }
                }
            </Popper>
        </div>
    );
}

export default SplitButton;