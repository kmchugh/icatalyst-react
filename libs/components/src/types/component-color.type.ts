import { OverridableStringUnion } from '@mui/types';

/**
 * Sensible color options
 */
export type ComponentColor = OverridableStringUnion<'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
>;