import { lodash as _ } from '@icatalyst/react/core';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { isValidElement, ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IconButton } from '../../buttons';
import { Container, ContainerProps } from '../../containers';
import { ComponentColor, ComponentSize } from '../../types';
import CommandPanelItem, { CommandPanelItemProps } from './CommandPanelItem';

type StyleProps = {
    hasOverflow: boolean;
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
            overflow: 'hidden'
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
            background: 'red',
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
            flexGrow: 0,
            flexShrink: 0,
            paddingLeft: 0,
            paddingRight: theme.spacing(1.5 * menuPadding),
        },
        overflowAreaDisplayFn: ({ hasOverflow }: StyleProps) => {
            return {
                display: hasOverflow ? undefined : 'none'
            };
        },
        spacer: {
            flexGrow: 1,
            flexShrink: 1,
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            height: '100%'
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
            background: 'yellow',

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
            background: 'green',

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
    const [hiddenSections, setHiddenSections] = useState(0);

    const styles = useStyles({
        hasOverflow: hiddenSections > 0
    });
    const contentRef = useRef<HTMLDivElement>(null);
    const menuSectionRefs = useRef<HTMLDivElement[]>([]);

    const updateOverflow = () => {
        console.log('layout');
        console.log({ menuSectionRefs });
        if (contentRef.current && secondaryMenu && secondaryMenu.length > 0) {
            // Measure the content area and decide what needs to be
            // pushed under the collapsible menu
            const containingElement = contentRef.current.parentNode as HTMLElement;
            const contentElement = contentRef.current;
            const containerWidth = containingElement?.clientWidth || 0;
            const contentWidth = contentElement.scrollWidth;
            const overflow = (contentWidth - containerWidth);

            let hiddenSectionCount = 0;
            if (overflow > 0 && menuSectionRefs.current && menuSectionRefs.current.length > 0) {
                // The content needs to be hidden
                let remaining = overflow;
                menuSectionRefs.current.slice().reverse().forEach((element) => {
                    if (remaining > 0) {
                        remaining -= element.clientWidth;
                        hiddenSectionCount++;
                        console.log(element.style.visibility);
                        element.style.display = 'none';
                    }
                });
            } else {
                menuSectionRefs.current.forEach((element) => {
                    element.style.display = 'flex';
                });
            }
            // Probably set to visible
            setOverflow(overflow);
            setHiddenSections(hiddenSectionCount);
        }
    };

    useEffect(() => {
        const handleResize = _.debounce(() => {
            updateOverflow();
        }, 200);

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

    const resizedSecondaryMenu = useMemo(() => {
        // If there are not items or there is no overflow then all items are visible
        if (!secondaryMenu || secondaryMenu.length === 0 || overflow <= 0) {
            return {
                visible: secondaryMenu,
                collapsed: []
            };
        }
        // // Remove items starting from the back until there is no overflow
        // return secondaryMenu.slice().reverse().reduce((acc, menuItem)=>{}, {
        //     visible : [],
        //     collapsed : [],
        //     width : overflow
        // });
        // return {
        //     visible: secondaryMenu,
        //     collapsed: []
        // };
    }, [secondaryMenu, overflow]);

    const renderMenu = (
        menu: (CommandPanelItem[])[] | CommandPanelItem[] | CommandPanelItem,
        withRefs = false
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
                        ref={withRefs ? (node) => {
                            if (node) {
                                menuSectionRefs.current[index] = node;
                            }
                        } : undefined}
                        className={clsx(styles.menuWrapper)}
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
                className={clsx(styles.menuArea)}>
                <div className={clsx(styles.primaryMenu)}>
                    {renderMenu(primaryMenu)}
                </div>

                <div className={clsx(styles.spacer, (primaryMenu?.length > 0 && secondaryMenu?.length > 0) && styles.showDivider)}>
                    {`${overflow}`}
                </div>

                <div className={clsx(styles.secondaryMenu)}>
                    {renderMenu(secondaryMenu, true)}
                </div>
            </div>

            <div className={clsx(styles.overflowArea, styles.overflowAreaDisplayFn)}>
                {/* // TODO : Dropdown menu not IconButton directly */}
                <IconButton
                    icon={overflowIcon}
                    color={color}
                    size={size}
                />
            </div>
        </Container>
    );
}

export default CommandPanel;