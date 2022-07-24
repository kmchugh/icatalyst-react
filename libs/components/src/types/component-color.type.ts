import { OverridableStringUnion } from '@mui/types';

/**
 * Sensible color options
 */
export type ComponentColor = OverridableStringUnion<'inherit'
    | 'action'
    | 'disabled'
    | 'error'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
>;