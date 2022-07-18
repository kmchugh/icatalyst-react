import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseComponent } from '../../types';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export interface CommandPanelProps extends BaseComponent<"span"> {
    // TODO Custom Props HERE
};

export function CommandPanel({
    className,
    style
}: CommandPanelProps) {
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

export default CommandPanel;