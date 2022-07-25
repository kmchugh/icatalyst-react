import { FilledTextFieldProps, OutlinedTextFieldProps, TextField as MUITextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {
        },
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type TextFieldProps = Omit<(
    OutlinedTextFieldProps |
    FilledTextFieldProps
), 'variant'> & {
    variant?: 'outlined' | 'filled';
};

export function TextField({
    className,
    style,
    variant = 'outlined',
    autoComplete = "off",
    fullWidth = true,
    ...rest
}: TextFieldProps) {
    const styles = useStyles();
    return (
        <MUITextField
            className={clsx(styles.root, className)}
            style={style}
            variant={variant}
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            {...rest}
        />
    );
}

export default TextField;