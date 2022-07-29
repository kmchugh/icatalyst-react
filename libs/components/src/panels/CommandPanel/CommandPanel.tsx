import { lodash as _ } from '@icatalyst/react/core';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { isValidElement, ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Container, ContainerProps } from '../../containers';
import { DropdownMenu, MenuItem } from '../../menues';
import { ComponentColor, ComponentSize } from '../../types';
import CommandPanelItem, { CommandPanelItemProps } from './CommandPanelItem';

type StyleProps = {
    hasOverflow: boolean;
    padding: number;
};


const useStyles = makeStyles((theme: any) => {
    const menuPadding = .75;
    return {
        root: {
            height: 'auto',
            flexGrow: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative'
        },
        root_inherit: {
            minHeight: theme.spacing(1),
            maxHeight: theme.spacing(3),
        },
        root_small: {
            minHeight: theme.spacing(3),
            maxHeight: theme.spacing(5),
        },
        root_medium: {
            minHeight: theme.spacing(5),
            maxHeight: theme.spacing(7),
        },
        root_large: {
            minHeight: theme.spacing(7),
            maxHeight: theme.spacing(9),
        },
        menuArea: {
            alignItems: 'center',
            overflow: 'hidden',
            minWidth: theme.spacing(10),
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing(.5),
            paddingLeft: theme.spacing(1.5 * menuPadding),
            paddingRight: theme.spacing(1.5 * menuPadding),
        },
        overflowArea: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        overflowAreaDisplayFn: ({ hasOverflow }: StyleProps) => {
            return {
                display: hasOverflow ? undefined : 'none'
            };
        },
        spacer: {
            flexGrow: 1,
            flexShrink: 1,
            height: '100%',
            minHeight: theme.spacing(3)
        },
        showDivider: {
            borderRightStyle: 'solid',
            borderRightColor: theme.palette.divider,
            borderRightWidth: 'thin',
        },
        menuWrapper: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        primaryMenu: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 0,
            flexGrow: 0,

            '& > *': {
                borderRightStyle: 'solid',
                borderRightColor: theme.palette.divider,
                borderRightWidth: 'thin',
                marginRight: theme.spacing(menuPadding),
                paddingRight: theme.spacing(menuPadding),
            },

            '& > *:last-child': {
                borderRightStyle: 'none',
                marginRight: 0,
            }
        },
        secondaryMenu: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 0,
            overflow: 'hidden',
            flexGrow: 0,
            transition: theme.transitions.create('padding-left', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut,
            }),

            '& > *': {
                borderLeftStyle: 'solid',
                borderLeftColor: theme.palette.divider,
                borderLeftWidth: 'thin',
                marginLeft: theme.spacing(menuPadding),
                paddingLeft: theme.spacing(menuPadding),
            },

            '& > *:first-child': {
                borderLeftStyle: 'none',
                marginLeft: 0,
            }
        },
        secondaryMenuPaddingFn: ({ padding = 0 }: StyleProps) => {
            return {
                // 32 is the width of the menu button
                paddingLeft: (padding - 32)
            };
        },
        menuDivider: {
            width: '100%'
        },
        menuDisplayed: {
            background: 'blue'
        },
        menuHidden: {
            background: 'green'
        }
    };
});

export type CommandPanelItem = ReactElement | ((props: CommandPanelProps) => ReactElement) | CommandPanelItemProps;

export interface CommandPanelProps extends Omit<ContainerProps, 'children'> {
    size?: ComponentSize;
    color?: ComponentColor;
    primaryMenu?: (CommandPanelItem[])[];
    secondaryMenu?: (CommandPanelItem[])[];
    overflowIcon?: string;
}

export function CommandPanel({
    className,
    style,
    elevation = 1,
    size = 'medium',
    color = 'secondary',
    primaryMenu = [],
    secondaryMenu = [],
    overflowIcon = 'more_vertical',
    ...rest
}: CommandPanelProps) {

    const [overflow, setOverflow] = useState(0);
    const [padding, setPadding] = useState(0);
    const [hiddenSectionIndex, setHiddenSectionIndex] = useState(-1);

    const styles = useStyles({
        hasOverflow: overflow > 0,
        padding
    });
    const contentRef = useRef<HTMLDivElement>(null);
    const secondaryMenuRef = useRef<HTMLDivElement>(null);

    const updateOverflow = () => {
        if (contentRef.current && secondaryMenu && secondaryMenu.length > 0) {
            // Measure the content area and decide what needs to be
            // pushed under the collapsible menu
            const containingElement = contentRef.current as HTMLElement;
            const containerWidth = containingElement?.offsetWidth || 0;
            const secondaryMenuArea = secondaryMenuRef.current as HTMLElement;

            const contentWidth = Array.from(containingElement.children).reduce((acc, c) => {
                return acc + c.clientWidth;
            }, 0);

            const calculatedOverflow = (contentWidth - containerWidth);
            let calculatedPadding = 0;
            let hiddenIndex = -1;

            if (calculatedOverflow > 0) {
                // We need to hide items until overflow <= 0
                let remaining = calculatedOverflow;
                for (let i = secondaryMenuArea.children.length; i--; i >= 0) {
                    const child = secondaryMenuArea.children[i] as HTMLElement;
                    if (remaining > 0) {
                        remaining -= child.offsetWidth;
                        child.style.visibility = 'hidden';
                    } else {
                        child.style.visibility = 'visible';
                        calculatedPadding = remaining * -1;
                        if (hiddenIndex < 0) {
                            hiddenIndex = i;
                        }
                    }
                }
            } else {
                // We can display items while overflow <= 0
                Array.from(secondaryMenuArea.children).forEach(c => {
                    (c as HTMLElement).style.visibility = 'visible';
                });
            }

            setPadding(calculatedPadding);
            setOverflow(calculatedOverflow);
            setHiddenSectionIndex(hiddenIndex);
        }
    };

    useEffect(() => {
        const handleResize = _.debounce(() => {
            updateOverflow();
        }, 100);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        updateOverflow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondaryMenu, contentRef.current]);

    const renderMenu = (
        menu: (CommandPanelItem[])[] | CommandPanelItem[] | CommandPanelItem
    ): ReactElement[] | null => {
        if (Array.isArray(menu) && menu.length === 0) {
            // Empty array, so we don't care where we are just render null
            return null;
        } else if (Array.isArray(menu) && Array.isArray(menu[0])) {
            // We are rendering a section so wrap and render content
            return menu.map((innerMenu, index) => {
                return (
                    <div
                        key={index}
                        className={clsx(
                            styles.menuWrapper
                        )}
                    >
                        {renderMenu(innerMenu)}
                    </div>
                );
            });
        } else if (Array.isArray(menu)) {
            // The section contents, render each item
            return menu.map((menuItem) => {
                if (isValidElement(menuItem)) {
                    return menuItem as ReactElement;
                } else if (typeof menuItem === 'function') {
                    return menuItem({
                        className,
                        style,
                        elevation,
                        size,
                        color,
                        ...rest
                    }) as ReactElement;
                } else {
                    return (
                        <CommandPanelItem
                            color={color}
                            size={size}
                            {...menuItem as CommandPanelItemProps}
                        />
                    );
                }
            }).filter(i => i);
        } else {
            // Don't know what we are rendering.
            return null;
        }
    }

    const secondaryOverflowMenu = useMemo(() => {
        if (!secondaryMenu || secondaryMenu.length === 0) {
            return [];
        }

        const flattenedMenu = secondaryMenu.slice(hiddenSectionIndex + 1).flatMap((sections, index) => [
            ...sections, (
                <Divider
                    className={clsx(styles.menuDivider)} key={`divider_${index}`}
                    orientation="horizontal"
                />
            )]
        );
        return flattenedMenu.slice(0, -1) as (MenuItem | ReactElement)[];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondaryMenu, hiddenSectionIndex]);

    return (
        <Container
            className={clsx(
                styles.root,
                styles[`root_${size}`],
                className
            )}
            style={style}
            elevation={elevation}
            {...rest}
        >
            <div
                ref={contentRef}
                className={clsx(styles.menuArea)}
            >
                <div className={clsx(styles.primaryMenu)}>
                    {renderMenu(primaryMenu)}
                </div>

                <div className={clsx(styles.spacer, (primaryMenu?.length > 0 && secondaryMenu?.length > 0) && styles.showDivider)} />

                <div
                    ref={secondaryMenuRef}
                    className={clsx(styles.secondaryMenu, styles.secondaryMenuPaddingFn)}
                >
                    {renderMenu(secondaryMenu)}
                </div>
            </div>

            <div className={clsx(styles.overflowArea, styles.overflowAreaDisplayFn)}>
                <DropdownMenu
                    menu={secondaryOverflowMenu}
                />
            </div>
        </Container >
    );
}

export default CommandPanel;


