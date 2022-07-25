import { ChipTypeMap } from '@material-ui/core';
import { Autocomplete, AutocompleteProps, AutocompleteRenderGetTagProps, Chip, FormControl, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ComponentColor } from '../../types';

type StyleProps = {
    variant: 'outlined' | 'filled';
};

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
        },
        root_outlined: {

        },
        root_filled: {
            '& .MuiChip-root': {
                marginTop: theme.spacing(1),
            }
        },
        textField: {
        },
        inputField: {
            display: 'inline-flex',
            flexGrow: 1,
            width: 'auto'
        },
        inputFieldFn: ({ variant }: StyleProps) => {
            return variant === 'outlined' ? {
                boxSizing: 'border-box'
            } : {};
        }
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagFieldProps<
    TagType = { label: string } | string,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
    > extends Omit<AutocompleteProps<
        TagType,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
    >,
    'title' | 'renderInput' | 'options' | 'defaultValue' |
    'value' | 'onChange' | 'renderTags'
    > {
    /**
     * The variant for the enclosing input control
     */
    variant?: 'outlined' | 'filled';
    /**
     * The label to display for the input control
     */
    label?: string;
    /**
     * The color of the chip
     */
    chipColor?: ComponentColor,
    /**
     * The variant of the chip
     */
    chipVariant?: 'outlined' | 'filled';
    /**
     * Allows determining of the chip color based on data in the option itself
     */
    getChipColor?: (option: TagType | string) => ComponentColor;
    /**
     * The list of options available to the user
     */
    options?: TagType[];
    defaultValue?: TagType | TagType[];
    value?: TagType | TagType[];
    renderTags?: (
        value: TagType | TagType[],
        getTagProps: AutocompleteRenderGetTagProps,
        ownerState?: any
    ) => React.ReactNode;
}

export function TagField<
    TagType = { label: string } | string,
    >({
        className,
        style,
        variant = 'outlined',
        label,
        fullWidth = true,
        options = [],
        autoHighlight = true,
        autoSelect = true,
        multiple = true,
        filterSelectedOptions = true,
        freeSolo = true,
        placeholder,
        renderTags,
        getOptionLabel,
        chipVariant = 'filled',
        chipColor = 'primary',
        getChipColor,
        defaultValue,
        value,
        ...rest
    }: TagFieldProps<TagType, true, false, true>) {

    const styles = useStyles({
        variant
    });

    getOptionLabel = getOptionLabel || ((option: TagType | string) => {
        return typeof option === 'string' ?
            option :
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (option as any).label;
    });

    getChipColor = getChipColor || ((option: TagType | string) => {
        return chipColor;
    });

    renderTags = renderTags || ((value: TagType | TagType[], getTagProps) => {
        value = Array.isArray(value) ? value : [value];
        return value.map((option, index) => {
            return (
                <Chip variant={chipVariant}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    label={getOptionLabel!(option)}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
                    color={getChipColor!(option) as any}
                    {...getTagProps({ index })}
                />
            );
        });
    });




    return (
        <FormControl
            className={clsx(styles.root, styles[`root_${variant}`], className)}
            style={style}
            variant={variant}
            fullWidth={fullWidth}
        >
            <Autocomplete
                options={options}
                autoHighlight={autoHighlight}
                autoSelect={autoSelect}
                multiple={multiple}
                filterSelectedOptions={filterSelectedOptions}
                freeSolo={freeSolo}
                renderTags={renderTags}
                defaultValue={defaultValue && (Array.isArray(defaultValue) ? defaultValue : [defaultValue])}
                value={value && (Array.isArray(value) ? value : [value])}
                {...rest}
                renderInput={({
                    inputProps,
                    ...textFieldProps
                }) => {
                    return (
                        <TextField
                            className={clsx(styles.textField)}
                            inputProps={{
                                ...inputProps,
                                className: clsx(styles.inputField, styles.inputFieldFn)
                            }}
                            label={label}
                            variant={variant}
                            placeholder={placeholder}
                            {...textFieldProps}
                        />
                    );
                }}
            />
        </FormControl>
    );
}

export default TagField;