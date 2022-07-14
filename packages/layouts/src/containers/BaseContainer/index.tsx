import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ContainerComponent } from '@icatalyst/components';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            padding: theme.spacing(3),
            boxSizing: 'border-box'
        },
        contentAlignFn: ({
            verticalAlign,
            horizontalAlign
        }: any) => {
            const vertical = {
                top: 'flex-start',
                center: 'center',
                bottom: 'flex-end'
            }[verticalAlign];
            const horizontal = {
                left: 'flex-start',
                center: 'center',
                right: 'flex-end'
            }[horizontalAlign];
            return {
                justifyContent: vertical,
                alignItems: horizontal
            };
        }
    };
});

export type BaseContainerProps = {
    verticalAlign?: 'top' | 'center' | 'bottom',
    horizontalAlign?: 'left' | 'center' | 'right'
} & ContainerComponent<"div">;

export const BaseContainer: FunctionComponent<BaseContainerProps> = ({
    className,
    style,
    children,
    verticalAlign = 'top',
    horizontalAlign = 'left',
}) => {
    const styles = useStyles({
        verticalAlign,
        horizontalAlign
    });
    return (
        <div
            className={clsx(
                styles.root,
                styles.contentAlignFn,
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
}