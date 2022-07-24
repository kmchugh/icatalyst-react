import { createSlice } from "@reduxjs/toolkit";

type LayoutConfiguration = {
    layout : {
        toolbar: {
            display: boolean
        }
    },
    themes : {
        [key : string] : any
    }
};

type SettingsStore = {
    userSettingsView : {
        open : boolean;
    },
    defaults : LayoutConfiguration,
    current : LayoutConfiguration,
    userSettings : {
        [key : string] : any
    },
    themes : {
        [key : string] : any
    }
};

const initialState : SettingsStore = {
    userSettingsView : {
        open : false
    },
    defaults : {
        layout : {
            toolbar: {
                display: true
            }
        },
        themes : {
            something : 'something'
        }
    },
    current : {
        layout : {
            toolbar: {
                display: true
            }
        },
        themes : {
            something : 'something'
        }
    },
    userSettings : {

    },
    themes : {}
};

export type SettingsState = typeof initialState;

export const settings = createSlice({
    name: 'icatalyst/settings',
    initialState: initialState,
    reducers: {}
});

export default settings;