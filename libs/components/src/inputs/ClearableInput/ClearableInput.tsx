import { Input, InputAdornment, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import IconButton from '../../buttons/IconButton/IconButton';
import { Icon } from '../../icons';
import { BaseComponent, ComponentColor } from '../../types';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {},
        icon: {
            marginLeft: theme.spacing(1)
        }
    };
});

export interface ClearableInputProps extends BaseComponent<"div"> {
    /**
     * The icon to display in the textbox
     */
    icon?: string,
    /**
     * The placeholder text and aria-label text
     */
    label?: string,
    /**
     * The value of the text input
     */
    value?: string,
    /**
     * Paper elevation properties
     */
    elevation?: number,
    /**
     * The color of the start and end adornments on the textbox
     */
    iconColor?: ComponentColor
};

export function ClearableInput({
    className,
    icon = 'create',
    label = 'input',
    value,
    elevation = 1,
    iconColor = 'inherit',
    onChange,
    ...rest
}: ClearableInputProps) {
    const styles = useStyles();
    const [text, setText] = useState(value || '');

    useEffect(() => {
        if (value !== text) {
            setText(value || '');
        }
    }, [value]);

    return (
        <Paper
            className={clsx(styles.root, className)}
            elevation={elevation}
            {...rest as any}
        >
            <Input
                placeholder={label}
                fullWidth
                disableUnderline
                value={text}
                inputProps={{
                    'aria-label': label
                }}
                onChange={(e) => {
                    const newValue: string = e.target.value;
                    setText(newValue);
                    onChange && onChange(e, newValue);
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Icon className={clsx(styles.icon)} color={iconColor}>{icon}</Icon>
                    </InputAdornment>
                }
                endAdornment={
                    text && <InputAdornment position="end">
                        <IconButton
                            size="small"
                            icon="cancel"
                            color={iconColor}
                            disabled={!text}
                            onClick={(e) => {
                                setText('');
                                onChange && onChange(e, '');
                            }}
                        />
                    </InputAdornment>
                }
            />
        </Paper>
    );
}

export default ClearableInput;