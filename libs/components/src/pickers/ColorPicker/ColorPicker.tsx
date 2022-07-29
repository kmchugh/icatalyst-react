import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Color, ColorValue, ColorBox, createColor, Raw } from 'mui-color';
import { useEffect, useState } from 'react';
import { ClickAwayListener, Grow, InputAdornment, Popper, PopperPlacementType, TextField as MUITextField } from '@mui/material';
import { TextFieldProps } from '../../inputs';
import { IconButton } from '../../buttons';
import { Container } from '../../containers';
import { usePopupState, bindToggle, bindPopper } from 'material-ui-popup-state/hooks';
import { mostReadable } from '@icatalyst/react/core';

type StyleProps = {
    selectedColor: ColorValue | null;
};

const useStyles = makeStyles((theme: any) => {
    return {
        root: {},
        popper: {
        },
        selectedColorFn: ({ selectedColor }: StyleProps) => {
            const background: string = selectedColor && mostReadable(
                selectedColor as string,
                [
                    theme.palette.text.primary,
                    theme.palette.primary.contrastText,
                    theme.palette.secondary.contrastText,
                ]
            )?.toHex8String() || theme.palette.text.primary;

            return {
                color: (selectedColor && `#${selectedColor}`) || undefined,
                backgroundColor: background
            };
        },
        popperContainer: {
            padding: theme.spacing(2),
            // Fix for ColorBox not respecting boundaries
            '& > div > div > div': {
                overflow: 'visible'
            }
        }
    };
});

export type ColorPickerProps = TextFieldProps & {
    defaultColor?: string,
    /**
     * Placement of the popup menu
     */
    placement?: PopperPlacementType;
};

export function ColorPicker({
    className,
    style,
    variant = 'outlined',
    autoComplete = "off",
    fullWidth = true,
    clearable = false,
    icon = "brush",
    iconColor = 'inherit',
    iconSize = 'medium',
    value,
    defaultColor = 'transparent',
    onChange,
    placement = 'bottom',
    ...rest
}: ColorPickerProps) {
    const popupState = usePopupState({
        variant: 'popper',
        popupId: '__colorpicker__'
    });

    const getColor = (color: Raw | ColorValue | null | undefined):
        ColorValue | null => {
        if (!color) {
            return null;
        }
        if ((color as any).raw) {
            return color as ColorValue;
        }
        return createColor(color);
    };

    const [colorValue, setColorValue] = useState<ColorValue | null>(
        value || defaultColor ? (getColor(value as string || defaultColor) as Color).hex : null
    );
    const [textValue, setTextValue] = useState('');

    const styles = useStyles({
        selectedColor: colorValue
    });

    useEffect(() => {
        setTextValue(`#${colorValue}`)
    }, [colorValue]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue: string = e.target.value;
        setTextValue(newValue);

        // If the new value is a valid colour then update
        const parsedColor = getColor(newValue);
        if (parsedColor && (parsedColor as any).format !== 'unknown') {
            setColorValue((parsedColor as any).hex);
            console.log((parsedColor as any).hex);
            onChange && onChange(e, `#${(parsedColor as any).hex}`);
        }
    };

    return (
        <>
            <MUITextField
                className={clsx(styles.root, className)}
                style={style}
                variant={variant}
                autoComplete={autoComplete}
                fullWidth={fullWidth}
                value={textValue || ''}
                {...rest}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton
                                className={clsx(styles.selectedColorFn)}
                                size={iconSize}
                                color={iconColor}
                                icon={icon}
                                {...bindToggle(popupState)}
                            />
                        </InputAdornment>
                    )
                }}
            />
            <Popper
                className={clsx(styles.popper)}
                role="menu"
                transition
                modifiers={[
                    {
                        name: 'flip',
                        enabled: true,
                        options: {
                            altBoundary: true,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            altAxis: false,
                            altBoundary: false,
                            tether: false,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                ]}
                placement={placement}
                {...bindPopper(popupState)}
            >
                {
                    ({ TransitionProps }) => {
                        return (
                            <Grow
                                {...TransitionProps}
                            >
                                <Container
                                    elevation={1}
                                    className={clsx(styles.popperContainer)}
                                >
                                    <ClickAwayListener onClickAway={() => {
                                        popupState.close();
                                    }}>
                                        <div>
                                            <ColorBox
                                                value={(colorValue && `#${colorValue}`) || defaultColor}
                                                deferred={true}
                                                onChange={(color) => {
                                                    const newValue = `#${color.hex}`;
                                                    setColorValue(color.hex);
                                                    popupState.close();
                                                    onChange && onChange(null, newValue);
                                                }}
                                            />
                                        </div>
                                    </ClickAwayListener>
                                </Container>
                            </Grow>
                        );
                    }
                }
            </Popper>
        </>
    );
}

export default ColorPicker;
