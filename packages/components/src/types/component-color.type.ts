import { OverridableStringUnion } from '@mui/types';

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