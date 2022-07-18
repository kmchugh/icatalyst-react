# components


## Running unit tests

Run `nx test components` to execute the unit tests via [Jest](https://jestjs.io).


## BOILERPLATE COMPONENT
```jsx
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseComponent } from '../../types';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export interface BoilerplateComponentProps extends BaseComponent<"span">{
    // TODO Custom Props HERE
};

export function BoilerplateComponent({
    className,
    style
}: BoilerplateComponentProps) {
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

export default BoilerplateComponent;
```
