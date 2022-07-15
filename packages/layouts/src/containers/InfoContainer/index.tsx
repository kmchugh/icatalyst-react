import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseContainer, BaseContainerProps } from 'containers/BaseContainer';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export type InfoContainerProps = {
    // TODO Custom Props HERE
} & BaseContainerProps;

export const InfoContainer: FunctionComponent<InfoContainerProps> = ({
    className,
    style,
    sx,
    children
}) => {
    const styles = useStyles();
    return (
        <BaseContainer
            className={clsx(styles.root, className)}
            style={style}
            sx={sx}
        >
            {children}
        </BaseContainer>
    );
}