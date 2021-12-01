import React, {createContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {createModel} from '../../../utilities/createModel';
import _ from 'lodash';
import {setUserSettings} from '../../../store/actions/settings.actions';

export const SettingsContext = createContext();

let registeredSettings = {};
const settingsLayout = {};

const settingsTemplate = {
  defaultValues : {},
  instanceValues : {}
};

export function useSettingsContext(id, instanceProps) {
  const dispatch = useDispatch();
  const requestedSettings = registeredSettings[id];

  if (!requestedSettings) {
    console.error(`Attempted to load unregistered settings for ${id}`);
    return null;
  } else {
    // This is an instance value request if there are
    // instanceProps and a getInstanceSettingsID function defined
    const instanceID = (instanceProps && requestedSettings.getInstanceSettingsID) ?
      requestedSettings.getInstanceSettingsID(instanceProps)
      : null;

    // Get the settings from the reducer
    const settings = useSelector(({icatalyst})=>{
      return (icatalyst.settings.userSettings[id]) || settingsTemplate;
    });

    // Generate the defaults from the registeredSettings
    const defaults = Object.keys(requestedSettings.fields).reduce((acc, field)=>{
      const defaultValue = requestedSettings.fields[field].default;
      acc[field] = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      return acc;
    }, {});

    /**
     * Gets the settings for a specific instance
     * @param  {String} instanceID The instance of the settings to get
     * @return {[type]}            The values for the specified instance
     */
    const getSettingsForInstance = (instanceID)=>{
      return settings.instanceValues[instanceID] || defaults;
    };

    // Generate the collapsed values
    const collapsedValues = _.merge({},
      // apply the default values
      defaults,
      // override with the user set defaults
      settings.defaultValues,
      // override with the specified instance values
      instanceID ?
        settings.instanceValues[instanceID] : {}
    );

    /**
     * Clears the instance settings and if defaults is set
     * replaces the defaults with the specified defaults
     * @param  {Object} defaults The value to set the defaults to, or null for default defaults
     */
    const clearInstanceSettings = (defaults)=>{
      const payload = {
        ...settings,
        defaultValues : {
          ...settings.defaultValues,
          ...defaults
        },
        instanceValues : {}
      };

      dispatch(setUserSettings({
        [id] : payload
      }));
    };

    /**
     * Updates the settings for the specified instance.  If the
     * specified instance is null then updates the default user settings
     * @param  {(values)=>updatedValues} updateFn   A function that recieves the current values and creates
     *                                              an updated set of values for storage
     * @param  {string} instanceID The instanceid of the settings to update or null for updating defaults
     */
    const updateSettings = (updateFn, instanceID)=>{
      const updatedValues = updateFn(collapsedValues);
      const originalValues = instanceID ?
        settings.instanceValues[instanceID] :
        settings.defaultValues;

      // Only trigger an update if the values are different
      if (!_.isEqual(updatedValues, originalValues)) {
        const payload = !instanceID ? {
          ...settings,
          defaultValues : {
            ...settings.defaultValues,
            ...updatedValues
          }
        } : {
          ...settings,
          instanceValues : {
            ...settings.instanceValues,
            [instanceID] : {...updatedValues}
          }
        };

        dispatch(setUserSettings({
          [id] : payload
        }));
      }
    };

    const retVal = {
      defaults,
      values : collapsedValues,
      updateSettings,
      clearInstanceSettings,
      instanceID,
      getSettingsForInstance
    };

    return retVal;
  }
}

function updateLayout(settings){
  Object.keys(settings).forEach((key)=>{
    const section = registeredSettings[key];
    const sectionID = section.sectionName || 'general';

    const index = settings[key].sectionIndex !== undefined ?
      settings[key].sectionIndex :
      999;

    if (!settingsLayout[sectionID]) {
      settingsLayout[sectionID] = {
        name : sectionID,
        label: _.startCase(sectionID),
        index: index,
        settings: {}
      };
    }
    settingsLayout[sectionID].settings[section.name] = {
      name : section.name,
      label : section.label,
      index: section.index !== undefined ? section.index : 999,
      visible : section.visible === undefined ? true : section.visible,
      values: section.values,
      component : section.component,
    };
  }, {});
}

export function registerSettings(config) {
  if (!Array.isArray(config)) {
    config = [config];
  }

  config.forEach((config)=>{
    const definition = createModel(config);
    const {name} = definition;
    registeredSettings[name] = definition;

    // Update the layout
    updateLayout({
      [name] : definition
    });
  });
}

function SettingsProvider({children/*, getReducerRoot*/}){
  // const settings = useSelector(getReducerRoot);

  const getSettingsLayout = useCallback(()=>{
    return Object.keys(settingsLayout)
      .map((settingsLayoutKey)=>({
        ...settingsLayout[settingsLayoutKey],
        settings: Object.keys(settingsLayout[settingsLayoutKey].settings)
          .map((settingKey)=>({
            ...settingsLayout[settingsLayoutKey].settings[settingKey],
          }))
          .sort((a, b)=>a.index - b.index)
      }))
      .sort((a, b)=>a.index - b.index);
  });

  const getRegisteredSettings = ()=>registeredSettings;

  return (
    <SettingsContext.Provider value={{
      getRegisteredSettings,
      getSettingsLayout
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  getReducerRoot : PropTypes.func.isRequired
};
export default SettingsProvider;
