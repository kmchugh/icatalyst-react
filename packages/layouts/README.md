# `@react/components`

> TODO: description

## Usage

```
const core = require('@react/components');
```


## BOILERPLATE CONTAINER COMPONENT
```jsx
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseContainer, BaseContainerProps } from 'containers/BaseContainer';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export type BoilerplateContainerProps = {
    // TODO Custom Props HERE
} & BaseContainerProps;

export const BoilerplateContainer: FunctionComponent<BoilerplateContainerProps> = ({
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
```

## BOILERPLATE COMPONENT
```jsx
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseComponent } from '@icatalyst/components';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export type BoilerplateComponentProps = {
    // TODO Custom Props HERE
} & BaseComponent<"div">;

export const BoilerplateComponent: FunctionComponent<BoilerplateComponentProps> = ({
    className,
    style
}) => {
    const styles = useStyles();
    return (
        <div 
            className={clsx(styles.root, className)}
            style={style}
        >
            BOILERPLATE
        </div>
    );
}
```
