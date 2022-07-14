# `@react/components`

> TODO: description

## Usage

```
const core = require('@react/components');
```


## BOILERPLATE COMPONENT
```jsx
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ContainerComponent } from '@icatalyst/components';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export type BoilerplateProps = {
    // TODO Custom Props HERE
} & ContainerComponent<"div">;

export const Boilerplate: FunctionComponent<BoilerplateProps> = ({
    className,
    style,
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
