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
import { BaseComponent } from '@icatalyst/components/base-component';

const useStyles = makeStyles((theme) => {
  return {
    root: {}
  };
});

export type ComponentProps = {
} & CoreComponent;

export const Component: FunctionComponent<ComponentProps> = ({
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
