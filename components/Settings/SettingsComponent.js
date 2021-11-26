import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {SettingsContext} from './SettingsProvider';
import { Typography, Button,
  Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import {useForm} from '../../hooks/fuse';
import Icon from '../Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import EnitityView from '../EntityView';
import {useSettingsContext} from './SettingsProvider';
import _ from 'lodash';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
    },
    section: {
      marginBottom: theme.spacing(3)
    },
    sectionHeading : {
    },
    accordionHeading : {
      textTransform : 'capitalize'
    },
    accordionContent : {
      display: 'flex',
      flexDirection : 'column',
      flexGrow : 1
    },
    accordionActions : {
      display : 'flex',
      justifyContent : 'flex-end',
      marginTop: theme.spacing(1)
    },
    actionButton : {
      marginLeft : theme.spacing(2)
    },
    actionButtonIcon : {
      marginRight : theme.spacing(1)
    },
    componentWrapper : {
    }
  };
});

function SettingsComponent({
  settingsWhitelist = null,
  settingsBlacklist = null,
  displayHeaders = true,
  showApplyButton = true,
  className
}){

  const settingsContext = useContext(SettingsContext);
  const classes = useStyles();
  const {
    getRegisteredSettings,
    getSettingsLayout
  } = settingsContext;
  const layout = getSettingsLayout().filter((setting)=>{
    if (!settingsWhitelist && !settingsBlacklist) {
      return true;
    } else if (settingsWhitelist) {
      return settingsWhitelist.includes(setting.name);
    } else if (settingsBlacklist) {
      return !settingsBlacklist.includes(setting.name);
    }
  });
  const definitions = getRegisteredSettings();
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [expandedID, setExpandedID] = useState(false);

  const { form, handleChange, setForm } = useForm(null);

  const handleAccordionChange = (settingsContext, id) => (event, isExpanded) => {
    setModified(false);
    setForm(_.merge(definitions[id].generateModel(), settingsContext.values));
    setExpandedID(isExpanded ? id : false);
  };

  const reset = (settingsContext, id) => () =>{
    setModified(false);
    setForm(_.merge(definitions[id].generateModel(), settingsContext.values));
  };

  const resetAll = (settingsContext) => ()=> {
    // TODO: This should be wrapped in a loading status update
    settingsContext.clearInstanceSettings(form);
    // TODO: reset should be a callback after successful save
    setModified(false);
  };

  useEffect(()=>{
    if (form && expandedID) {
      setErrors(definitions[expandedID].validate(form));
    }
  }, [form, expandedID]);

  const canBeSubmitted = modified &&
      Object.keys(errors).flatMap(k=>errors[k]).length === 0;

  const saveSettings = (settingsContext, updatedSettings)=>{
    // TODO: This should be wrapped in a loading status update
    settingsContext.updateSettings(()=>(updatedSettings));
    // TODO: setModified should be a callback after successful save
    setModified(false);
  };

  return layout.map((section)=>{
    const { name : sectionName } = section;
    const {label, settings} = section;
    return (
      <div
        id={sectionName}
        key={label}
        className={clsx(classes.root, className)}
      >
        <div className={clsx(classes.section)}>
          {displayHeaders && (
            <Typography variant="h5" className={clsx(classes.sectionHeading)}>{label}</Typography>
          )}
          {
            settings.filter(setting=>setting.visible || setting.visible === undefined).map((setting)=>{
              const {name} = setting;
              const id = `${sectionName}_${name}`;
              const definition = definitions[name];
              const settingsContext = useSettingsContext(name);
              const Component = setting.component;
              return Component ? (
                <div className={clsx(classes.componentWrapper)}>
                  <Component/>
                </div>
              ) : (
                <Accordion
                  id={id}
                  key={id}
                  expanded={expandedID === name}
                  onChange={handleAccordionChange(settingsContext, name)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={id}
                    id={`${id}_header`}
                  >
                    <Typography className={clsx(classes.accordionHeading)}>{definition.labelPlural}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <div className={clsx(classes.accordionContent)}>
                      {
                        expandedID === name && <EnitityView
                          definition={definition}
                          model={form}
                          errors={errors}
                          onChange={(e)=>{
                            handleChange(e);
                            setModified(true);
                          }}
                        />
                      }
                      <div className={clsx(classes.accordionActions)}>
                        {showApplyButton && (
                          <Button
                            className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                            color="primary"
                            disabled={!canBeSubmitted}
                            onClick={()=>{
                              saveSettings(settingsContext, form);
                            }}
                          >
                            <Icon className={clsx(classes.actionButtonIcon)}>done</Icon>
                            Apply
                          </Button>
                        )}
                        <Button
                          className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                          color="inherit"
                          disabled={!canBeSubmitted}
                          onClick={resetAll(settingsContext, name)}
                        >
                          <Icon className={clsx(classes.actionButtonIcon)}>done_all</Icon>
                          Apply All
                        </Button>
                        <Button
                          className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                          color="inherit"
                          disabled={!canBeSubmitted}
                          onClick={reset(settingsContext, name)}
                        >
                          <Icon className={clsx(classes.actionButtonIcon)}>cancel</Icon>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })
          }
        </div>
      </div>
    );
  });
}

SettingsComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  settingsWhitelist : PropTypes.arrayOf(PropTypes.string),
  settingsBlacklist : PropTypes.arrayOf(PropTypes.string),
  displayHeaders : PropTypes.bool,
  showApplyButton : PropTypes.bool
};

export default SettingsComponent;
