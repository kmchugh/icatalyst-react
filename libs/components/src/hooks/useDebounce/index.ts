import { lodash as _ } from '@icatalyst/react/core';
import { DebounceSettingsLeading } from 'lodash';
import { useRef } from 'react';

function useDebounce(func: any, wait?: number, options?: DebounceSettingsLeading) {
    return useRef(_.debounce(func, wait, options)).current;
}

export default useDebounce;
