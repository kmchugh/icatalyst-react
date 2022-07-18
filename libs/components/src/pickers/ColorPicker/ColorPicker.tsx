import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseComponent } from '../../types';
import { Color, ColorPicker as NativeComponent, createColor, Raw } from 'material-ui-color';
import { useState } from 'react';

// TODO: Add debounce on handleChange so dragging in the UI will not cause so many updates

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {},
    };
});

export interface ColorPickerProps extends BaseComponent<"div"> {
    value?: string,
    hideTextfield?: boolean,
    defaultColor?: string
};

export function ColorPicker({
    className,
    style,
    value,
    onChange,
    hideTextfield,
    defaultColor
}: ColorPickerProps) {
    const styles = useStyles();

    const getColor = (color: Raw | Color | null | undefined):
        Color | null => {
        if (!color) {
            return null;
        }
        if ((color as any).raw) {
            return color as Color;
        }
        return createColor(color);
    };

    const [colorValue, setColorValue] = useState<Color | null>(getColor(value || defaultColor));

    const handleChange = (
        e: React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement> | null,
        color: Raw | Color | null = null
    ) => {
        const parsedColor = getColor(color);
        if (!parsedColor) {
            setColorValue(null);
        } else {
            if (!(parsedColor as any)?.error) {
                setColorValue(parsedColor);
            }
        }

        if (!(parsedColor as any)?.error &&
            (parsedColor as any)?.format !== 'unknown' &&
            value !== `#${parsedColor?.hex}`) {
            onChange && onChange(e, parsedColor?.hex || null);
        }
    };



    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
        >
            <NativeComponent
                hideTextfield={hideTextfield}
                onChange={(color: Color) => {
                    handleChange(null, color);
                }}
                value={colorValue || undefined}
            />
        </div>
    );
}

export default ColorPicker;