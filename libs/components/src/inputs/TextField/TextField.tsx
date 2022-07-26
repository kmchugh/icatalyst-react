import { FilledTextFieldProps, InputAdornment, OutlinedTextFieldProps, TextField as MUITextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useState } from 'react';
import { IconButton } from '../../buttons';
import { Icon } from '../../icons';
import { ComponentColor, ComponentSize } from '../../types';

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
), 'variant' | 'onChange'> & {
    /**
     * The variant for the enclosing input control
     */
    variant?: 'outlined' | 'filled';
    /**
     * Shows a clickable end adornment that clears the content when clicked
     */
    clearable?: boolean;
    /**
     * The icon to display before the input part of the field
     */
    icon?: string;
    /**
     * The color of the icon before the input part of the field
     */
    iconColor?: ComponentColor;
    /**
     * The size of the icon before the input part of the field
     */
    iconSize?: ComponentSize;
    /**
     * called when the value is changed through user interaction on the interactive control
     */
    onChange?: (e:
        React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement> | null,
        value: string
    ) => void;
};

export function TextField({
    className,
    style,
    variant = 'outlined',
    autoComplete = "off",
    fullWidth = true,
    clearable = false,
    icon,
    iconColor = 'primary',
    iconSize = 'medium',
    value,
    onChange,
    ...rest
}: TextFieldProps) {

    const styles = useStyles();

    const [text, setText] = useState<string>((value as string) || '');

    return (
        <MUITextField
            className={clsx(styles.root, className)}
            style={style}
            variant={variant}
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            value={text}
            {...rest}
            onChange={(e) => {
                const newValue: string = e.target.value;
                setText(newValue);
                onChange && onChange(e, newValue);
            }}
            InputProps={{
                startAdornment: icon && (
                    <InputAdornment position="start">
                        <Icon
                            size={iconSize}
                            color={iconColor}
                        >
                            {icon}
                        </Icon>
                    </InputAdornment>
                ),
                endAdornment: (clearable && text) && (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            icon="cancel"
                            color="inherit"
                            disabled={!text}
                            onClick={(e) => {
                                setText('');
                                onChange && onChange(e, '');
                            }}
                        />
                    </InputAdornment>
                )
            }}
        />
    );
}

export default TextField;