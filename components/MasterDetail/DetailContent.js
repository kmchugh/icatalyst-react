import React, {useState, useEffect, useMemo} from 'react';
import {ModelPropTypes} from '../../utilities/createModel';
import EntityView from '../EntityView';
import PropTypes from 'prop-types';
import {Button, Tabs, Tab} from '@material-ui/core';
import Icon from '../Icon';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useForm} from '../../hooks/fuse';
import {useSharedDetail} from './useSharedDetail';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MasterDetailPage from './index';
import {FuseAnimateGroup} from '../fuse';
import PageBase from '../../pages/PageBase';
import IconButton from '../IconButton';

const useStyles = makeStyles((theme) => {
  return {
    root : {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection : 'column',
      overflow: 'hidden'
    },
    toolbarWrapper : {
      height: theme.spacing(9),
      flexShrink: 0,
      background: theme.palette.secondary.main,
      display: 'flex',
      alignItems: 'center'
    },
    backButton: {
      marginLeft : theme.spacing(1),
      marginRight : theme.spacing(1),
    },
    tabBar : {
      height: theme.spacing(9),
      width: '100%',
    },
    tab : {
      height : theme.spacing(9),
      textTransform : 'none'
    },
    contentWrapper: {
      display: 'flex',
      flex: 1,
      flexShrink: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    entityWrapper: {
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')] : {
        padding : theme.spacing(2),
        paddingTop: theme.spacing(3),
      },
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 0%',
      overflow: 'auto'
    },
    actionWrapper : {
      display: 'flex',
      justifyContent : 'flex-end',
    },
    actionButton : {
      marginLeft : theme.spacing(2)
    },
    actionButtonIcon : {
      marginRight : theme.spacing(1)
    },
    entityView : {
      overflow: 'auto',
      marginBottom : theme.spacing(1)
    }
  };
});

const DetailContent = ({
  definition,
  entity,
  readonly,
  onChange,
  match,
  history,
  auth,
  config,
  backUrl
})=>{
  const classes = useStyles();

  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const {update} = useSharedDetail();
  const { form, handleChange, resetForm } = useForm(entity || definition.generateModel());
  const theme = useTheme();
  const transitionLength = theme.transitions.duration.shortest;

  const reset = ()=>{
    setModified(false);
    resetForm();
    onChange && onChange(form);
  };

  const canBeSubmitted = modified &&
      Object.keys(errors).flatMap(k=>errors[k]).length === 0;

  useEffect(()=>{
    if (form) {
      setErrors(definition.validate(form));
      update(form);
    }
  }, [form]);

  const tabs = useMemo(()=>{
    return [
      {
        icon : definition.icon,
        label : `${definition.label} Details`,
        visible : auth.retrieveAll,
        component  : <div>Tab1</div>,
      },
      ...(definition.children ? (
        definition.children.map((child)=>{
          return {
            icon : child.icon,
            path : child.name,
            label : child.labelPlural,
            visible : auth.retrieveAll,
            component  : child.component || MasterDetailPage,
            definition : child
          };
        })
      ) : [])
    ].filter(t=>t.visible);
  }, [definition]);

  const [selectedTab, setSelectedTab] = useState({
    prev : 0,
    current : Math.max(0, tabs.findIndex(t=>location.pathname.startsWith(match.url + '/' + t.path)))
  });

  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.toolbarWrapper)}>
        {
          // If the mode is chromeless then we need a way to get back
          config.mode === 'chromeless' && (
            <IconButton className={clsx(classes.backButton)}
              onClick={()=>{
                history.push(backUrl);
              }}
              icon={theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
              title="back"
            />
          )
        }
        {
          tabs && (
            <Tabs
              value={selectedTab.current}
              selectionFollowsFocus={true}
              onChange={(e, index)=>{
                if (index !== selectedTab.index) {
                  setSelectedTab((selected)=>{
                    return {
                      prev : selected.current,
                      current : index
                    };
                  });
                  const path = tabs[index].path;
                  if (!path) {
                    history.push(match.url);
                  } else {
                    history.push(!match.url.endsWith('/') ? `${match.url}/${path}` : `${match.url}${path}`);
                  }
                }
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              className={clsx(classes.tabBar)}
            >
              {
                tabs.map(({icon, label, path})=>{
                  return (
                    <Tab
                      key={path || ''}
                      className={clsx(classes.tab)}
                      icon={<Icon fontSize="small">{icon}</Icon>}
                      label={label}
                    />
                  );
                })
              }
            </Tabs>
          )
        }
      </div>

      <div className={clsx(classes.contentWrapper)}>
        {definition && tabs && (
          <Switch key={location.pathname} location={location}>
            {tabs.filter(t=>t.path).map((t)=>{
              return (
                <Route key={t.path}
                  path={`${match.path}/${t.path}`}
                  render={(routeParams)=>{
                    const Component = t.component;
                    return (
                      <FuseAnimateGroup
                        className="w-full h-full flex flex-col"
                        runOnMount={true}
                        enter={{
                          delay: transitionLength, duration: transitionLength,
                          animation: selectedTab.prev >= selectedTab.current ?
                            'transition.slideRightBigIn' :
                            'transition.slideLeftBigIn'
                        }}
                        leave={{
                          duration: transitionLength,
                          animation: selectedTab.prev > selectedTab.current ?
                            'transition.slideLeftBigOut' :
                            'transition.slideRightBigOut'
                        }}
                      >
                        <Component
                          contained={true}
                          definition={t.definition}
                          {...routeParams}
                        />
                      </FuseAnimateGroup>
                    );
                  }}
                />
              );
            })}
            <Route render={()=>{
              return (
                <div className={clsx(classes.entityWrapper)}>
                  <FuseAnimateGroup
                    className="w-full h-full flex flex-col"
                    runOnMount={true}
                    enter={{
                      delay: transitionLength, duration: transitionLength,
                      animation: selectedTab.prev > selectedTab.current ?
                        'transition.slideRightBigIn' :
                        'transition.slideLeftBigIn'
                    }}
                    leave={{
                      duration: transitionLength,
                      animation: selectedTab.prev > selectedTab.current ?
                        'transition.slideLeftBigOut' :
                        'transition.slideRightBigOut'
                    }}
                  >
                    <EntityView
                      className={clsx(classes.entityView)}
                      definition={definition}
                      model={form}
                      readonly={!auth.update || (!auth.create /* && !isNew */)}
                      errors={errors}
                      onChange={(e)=>{
                        handleChange(e);
                        setModified(true);
                        onChange && onChange(form);
                      }}
                    />
                    <div className="flex flex-1"/>
                    { (auth.update || (auth.create /* && !isNew */)) &&
                      <div className={clsx(classes.actionWrapper)}>
                        <Button
                          className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                          variant="contained"
                          color="primary"
                          disabled={!canBeSubmitted || readonly}
                          onClick={() => {
                            console.log('clicked');
                          }}
                        >
                          <Icon className={clsx(classes.actionButtonIcon)}>save</Icon>
                          Save
                        </Button>

                        <Button
                          className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                          variant="contained"
                          color="secondary"
                          disabled={!canBeSubmitted || readonly}
                          onClick={reset}
                        >
                          <Icon className={clsx(classes.actionButtonIcon)}>cancel</Icon>
                        Cancel
                        </Button>
                      </div>
                    }
                  </FuseAnimateGroup>
                </div>
              );
            }}/>
          </Switch>
        )}
      </div>
    </div>
  );
};

DetailContent.propTypes = {
  definition : ModelPropTypes.isRequired,
  entity : PropTypes.object,
  onChange : PropTypes.object,
  readonly : PropTypes.bool,
  match : PropTypes.object,
  location : PropTypes.object,
  history : PropTypes.object,
  backUrl :PropTypes.string,
  auth : PropTypes.shape({
    create : PropTypes.bool,
    retrieve : PropTypes.bool,
    update : PropTypes.bool,
    delete : PropTypes.bool,
    retrieveAll : PropTypes.bool,
    route : PropTypes.bool,
  }),
  config : PageBase.propTypes.config
};


export default React.memo(withRouter(DetailContent));
