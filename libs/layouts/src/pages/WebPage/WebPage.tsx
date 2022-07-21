import { IFrameSandboxProps, WebContainer } from '@icatalyst/react/components';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import TitledPage, { TitledPageProps } from '../TitledPage';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {},
        container: {
            background: 'aliceblue'
        }
    };
});

export interface WebPageProps extends Omit<TitledPageProps, 'children'> {
    src: string;
    sandbox?: IFrameSandboxProps[]
}

export function WebPage({
    className,
    style,
    title,
    src,
    sandbox,
    ...rest
}: WebPageProps) {
    const styles = useStyles();
    return (
        <TitledPage
            className={clsx(styles.root, className)}
            style={style}
            title={title}
            {...rest}
        >
            <WebContainer
                className={clsx(styles.container)}
                title={title}
                src={src}
                sandbox={sandbox}
            />
        </TitledPage>
    );
}

export default WebPage;