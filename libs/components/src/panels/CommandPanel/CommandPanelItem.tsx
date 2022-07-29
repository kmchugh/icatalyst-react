import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { IconButton } from '../../buttons';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {},
    };
});

export interface CommandPanelItemProps extends Omit<BaseComponent<'span'>, 'onClick'> {
    icon: string;
    size?: ComponentSize,
    color?: ComponentColor,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: MouseEventHandler<HTMLButtonElement>,
    title: string;
}

export function CommandPanelItem({
    className,
    style,
    icon,
    size,
    color,
    onClick,
    title,
    ...rest
}: CommandPanelItemProps) {
    const styles = useStyles();
    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
        >
            <IconButton
                icon={icon}
                size={size}
                color={color}
                onClick={onClick}
                title={title}
            />
        </div>
    );
}

export default CommandPanelItem;