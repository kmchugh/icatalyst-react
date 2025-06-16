import React, {useContext} from 'react';
import _ from '../../../@lodash';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import {styled} from '@mui/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
// import { updateUserSettings }
// from 'app/auth/store/userSlice';
// import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import PropTypes from 'prop-types';
import {SingularityContext} from '@icatalyst/components/Singularity';
import layoutDefaults from '@icatalyst/layouts/layoutDefaults';

const Root = styled('div')``;

const FormControlStyle = styled(FormControl)({
  margin: '6px 0',
  width: '100%',
  '&:last-child': {
    marginBottom: 0
  }
});

const RadioGroupStyle = styled(RadioGroup)``;

const FormGroupTitle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: -10,
  left: 8,
  fontWeight: 600,
  padding: '0 4px',
  backgroundColor: theme.palette.background.paper
}));

const FormGroup = styled('div')(({ theme }) => ({
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
  padding: '12px 12px 0 12px',
  margin: '24px 0 16px 0',
  '&:first-of-type': {
    marginTop: 16
  }
}));


function FuseSettings(props) {
  const dispatch = useDispatch();
  console.log(dispatch);
  const singularityContext = useContext(SingularityContext);
  const {user} = singularityContext;
  const themes = useSelector(({ app }) => app.settings.themes);
  const settings = useSelector(({ app }) => app.settings.current);
  const {/*value,name,handleThemeChange*/} = props;

  function handleChange(event) {
    const newSettings = _.set(
      _.merge({}, settings),
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );

    /**
   * If layout style changes,
   * Reset Layout Configuration
   */
    if (event.target.name === 'layout.style' && event.target.value !== settings.layout.style) {
      newSettings.layout.config = {};
    }

    if (user.role === 'guest') {
      // dispatch(setDefaultSettings(newSettings));
    } else {
      // dispatch(updateUserSettings(newSettings));
    }
  }

  const ThemeSelect = ({ value, name, handleThemeChange }) => {
    return (
      <Select
        className="w-full rounded-8 h-40 overflow-hidden my-8"
        value={value}
        onChange={handleThemeChange}
        name={name}
        variant="outlined"
        style={{
          backgroundColor: themes[value].palette.background.default,
          color: themes[value].palette.mode === 'light' ? '#000000' : '#ffffff'
        }}
      >
        {Object.entries(themes)
          .filter(
            ([key]) =>
              !(name === 'theme.main' && (key === 'mainThemeDark' || key === 'mainThemeLight'))
          )
          .map(([key, val]) => (
            <MenuItem
              key={key}
              value={key}
              className="m-8 mt-0 rounded-lg"
              style={{
                backgroundColor: val.palette.background.default,
                color: val.palette.mode === 'light' ? '#000000' : '#ffffff',
                border: `1px solid ${
                  val.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'
                }`
              }}
            >
              {_.startCase(key)}
              <div
                className="flex w-full h-8 block absolute bottom-0 left-0 right-0"
                style={{
                  borderTop: `1px solid ${
                    val.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.12)'
                      : 'rgba(255, 255, 255, 0.12)'
                  }`
                }}
              >
                <div
                  className="w-1/4 h-8"
                  style={{
                    backgroundColor: val.palette.primary.main
                      ? val.palette.primary.main
                      : val.palette.primary[500]
                  }}
                />
                <div
                  className="w-1/4 h-8"
                  style={{
                    backgroundColor: val.palette.secondary.main
                      ? val.palette.secondary.main
                      : val.palette.secondary[500]
                  }}
                />
                <div
                  className="w-1/4 h-8"
                  style={{
                    backgroundColor: val.palette.error.main
                      ? val.palette.error.main
                      : val.palette.error[500]
                  }}
                />
                <div className="w-1/4 h-8" style={{ backgroundColor: val.palette.background.paper }} />
              </div>
            </MenuItem>
          ))}
      </Select>
    );
  };

  const LayoutSelect = () => (
    <FormControlStyle component="fieldset">
      <FormLabel component="legend" className="text-14">
        Style
      </FormLabel>

      <RadioGroupStyle
        aria-label="Layout Style"
        name="layout.style"
        value={settings.layout.style}
        onChange={handleChange}
      >
        {
        // {Object.entries(FuseLayoutConfigs).map(([key, layout]) => (
        //   <FormControlLabel key={key} value={key} control={<Radio />} label={layout.title} />
        // ))}
        }
      </RadioGroupStyle>
    </FormControlStyle>
  );

  const DirectionSelect = () => (
    <FormControlStyle component="fieldset" >
      <FormLabel component="legend" className="text-14">
        Direction
      </FormLabel>

      <RadioGroupStyle
        aria-label="Layout Style"
        name="direction"
        value={settings.direction}
        onChange={handleChange}
        row
      >
        <FormControlLabel key="rtl" value="rtl" control={<Radio />} label="RTL" />
        <FormControlLabel key="ltr" value="ltr" control={<Radio />} label="LTR" />
      </RadioGroupStyle>
    </FormControlStyle>
  );

  const getForm = (form, prefix) => {
    return Object.entries(form).map(([key, formControl]) => {
      const target = prefix ? `${prefix}.${key}` : key;
      switch (formControl.type) {
      case 'radio': {
        return (
          <FormControlStyle key={target} component="fieldset">
            <FormLabel component="legend" className="text-14">
              {formControl.title}
            </FormLabel>
            <RadioGroupStyle
              aria-label={formControl.title}
              name={`layout.config.${target}`}
              value={_.get(settings.layout.config, target)}
              onChange={handleChange}
              row={formControl.options.length < 4}
            >
              {formControl.options.map(opt => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.name}
                />
              ))}
            </RadioGroupStyle>
          </FormControlStyle>
        );
      }
      case 'switch': {
        return (
          <FormControlStyle key={target} component="fieldset">
            <FormControlLabel
              classes={
                {
                  // root: "flex-row-reverse justify-end pl-16"
                }
              }
              control={
                <Switch
                  name={`layout.config.${target}`}
                  checked={_.get(settings.layout.config, target)}
                  onChange={handleChange}
                  aria-label={formControl.title}
                />
              }
              label={
                <FormLabel component="legend" className="text-14">
                  {formControl.title}
                </FormLabel>
              }
            />
          </FormControlStyle>
        );
      }
      case 'group': {
        return (
          <FormGroup key={target}>
            <FormGroupTitle color="textSecondary">
              {formControl.title}
            </FormGroupTitle>

            {getForm(formControl.children, key)}
          </FormGroup>
        );
      }
      default: {
        return '';
      }
      }
    });
  };

  function LayoutConfig() {
    const { definition } = layoutDefaults[settings.layout.style];
    return getForm(definition);
  }

  console.log(settings, themes);
  console.log(layoutDefaults);


  return (
    <Root>
      <FormGroup>
        <FormGroupTitle color="textSecondary">
          Layout
        </FormGroupTitle>

        <LayoutSelect />

        <LayoutConfig />

        <Typography className="my-16 text-12 italic" color="textSecondary">
          *Not all option combinations are available
        </Typography>
      </FormGroup>

      <FormGroup className={'pb-16'}>
        <FormGroupTitle color="textSecondary">
          Theme
        </FormGroupTitle>

        <FormControlStyle component="fieldset">
          <FormLabel component="legend" className="text-14">
            Main
          </FormLabel>
          <ThemeSelect value={settings.layout.theme.main} name="theme.main" handleThemeChange={handleChange} />
        </FormControlStyle>
        <FormControlStyle component="fieldset">
          <FormLabel component="legend" className="text-14">
            Navbar
          </FormLabel>
          <ThemeSelect value={settings.layout.theme.navbar} name="theme.navbar" handleThemeChange={handleChange} />
        </FormControlStyle>
        <FormControlStyle component="fieldset">
          <FormLabel component="legend" className="text-14">
            Toolbar
          </FormLabel>
          <ThemeSelect value={settings.layout.theme.toolbar} name="theme.toolbar" handleThemeChange={handleChange} />
        </FormControlStyle>
        <FormControlStyle component="fieldset">
          <FormLabel component="legend" className="text-14">
            Footer
          </FormLabel>
          <ThemeSelect value={settings.layout.theme.footer} name="theme.footer" handleThemeChange={handleChange} />
        </FormControlStyle>
      </FormGroup>

      <FormControlStyle component="fieldset">
        <FormLabel component="legend" className="text-14">
          Custom Scrollbars
        </FormLabel>
        <Switch
          checked={settings.customScrollbars}
          onChange={handleChange}
          aria-label="Custom Scrollbars"
          name="customScrollbars"
        />
      </FormControlStyle>

      <FormControlStyle component="fieldset">
        <FormLabel component="legend" className="text-14">
          Animations
        </FormLabel>
        <Switch
          checked={settings.animations}
          onChange={handleChange}
          aria-label="Animations"
          name="animations"
        />
      </FormControlStyle>

      <DirectionSelect />
    </Root>
  );
}

FuseSettings.propTypes = {
  value : PropTypes.any,
  name : PropTypes.any,
  handleThemeChange : PropTypes.any
};

export default React.memo(FuseSettings);
