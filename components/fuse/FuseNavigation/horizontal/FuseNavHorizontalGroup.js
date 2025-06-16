import React, {useState, useContext} from 'react';
import {Grow, Paper, Icon, IconButton, ListItem, ListItemText} from '@mui/material';
import {styled} from '@mui/styles';
import useDebounce from '@icatalyst/hooks/fuse/useDebounce';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Manager, Reference, Popper} from 'react-popper';
import * as ReactDOM from 'react-dom';
import FuseNavHorizontalCollapse from './FuseNavHorizontalCollapse';
import FuseNavHorizontalItem from './FuseNavHorizontalItem';
import FuseNavHorizontalLink from './FuseNavHorizontalLink';
import {SingularityContext} from '@icatalyst/components/Singularity';

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  color              : theme.palette.text.primary,
  '& .list-item-text': {
    padding: '0 0 0 16px'
  },
  '&.level-0'        : {
    height      : 48,
    borderRadius: 4,
    '&:hover'   : {
      background: 'transparent'
    },
  },
  '&.dense'          : {
    padding            : '8px 12px 8px 12px',
    minHeight          : 40,
    '&.level-0'        : {
      height: 44
    },
    '& .list-item-text': {
      padding: '0 0 0 8px'
    }
  }
  
}));

const Children = styled('ul')(() => ({}));

const StyledPopper = styled('div', {
  shouldForwardProp: (prop) => !['opened'].includes(prop),
})(({ opened }) => ({
  zIndex: 999,
  pointerEvents: opened ? 'auto' : 'none',
}));


function FuseNavHorizontalGroup(props)
{
  const singularityContext = useContext(SingularityContext);
  const {isInRole} = singularityContext;

  const [opened, setOpened] = useState(false);
  const {item, nestedLevel, dense} = props;

  const handleToggle = useDebounce((open) => {
    setOpened(open);
  }, 150);

  if ( !isInRole(item.auth) ){
    return null;
  }

  return (
    <Manager>
      <Reference>
        {({ref}) => (
          <div ref={ref}>
            <ListItemStyle
              button
              className={clsx('list-item', 'relative', 'level-' + nestedLevel, dense && 'dense')}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
              aria-owns={opened ? 'menu-list-grow' : null}
              aria-haspopup="true"
            >
              {item.icon && (
                <Icon color="action" className="text-16 flex-shrink-0">{item.icon}</Icon>
              )}
              <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
              {nestedLevel > 0 && (
                <IconButton disableRipple className="w-16 h-16 ml-4 p-0" size="large">
                  <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                </IconButton>
              )}
            </ListItemStyle>
          </div>
        )}
      </Reference>
      {ReactDOM.createPortal(
        <Popper
          placement={nestedLevel === 0 ? 'bottom-start' : 'right'}
          eventsEnabled={opened}
          positionFixed
        >
          {({ref, style, placement}) => (
            opened && (
              <StyledPopper
                ref={ref}
                opened={opened}
                style={{
                  ...style,
                  zIndex: 999 + nestedLevel
                }}
                data-placement={placement}
              >
                <Grow in={opened} id="menu-list-grow" style={{transformOrigin: '0 0 0'}}>
                  <Paper
                    onMouseEnter={() => handleToggle(true)}
                    onMouseLeave={() => handleToggle(false)}
                  >
                    {item.children && (
                      <Children className={clsx('pl-0')}>
                        {
                          item.children.map((item) => (
                            <React.Fragment key={item.id}>

                              {item.type === 'group' && (
                                <NavHorizontalGroup item={item} nestedLevel={nestedLevel} dense={dense}/>
                              )}

                              {item.type === 'collapse' && (
                                <FuseNavHorizontalCollapse item={item} nestedLevel={nestedLevel} dense={dense}/>
                              )}

                              {item.type === 'item' && (
                                <FuseNavHorizontalItem item={item} nestedLevel={nestedLevel} dense={dense}/>
                              )}

                              {item.type === 'link' && (
                                <FuseNavHorizontalLink item={item} nestedLevel={nestedLevel} dense={dense}/>
                              )}
                            </React.Fragment>
                          ))
                        }
                      </Children>
                    )}
                  </Paper>
                </Grow>
              </StyledPopper>
            )
          )}
        </Popper>,
        document.querySelector('#root')
      )}
    </Manager>
  );
}

FuseNavHorizontalGroup.propTypes = {
  item: PropTypes.shape(
    {
      id      : PropTypes.string.isRequired,
      title   : PropTypes.string,
      icon    : PropTypes.string,
      type    : PropTypes.string,
      children: PropTypes.array,
      auth : PropTypes.array
    }),
  nestedLevel : PropTypes.number,
  dense       : PropTypes.bool
};

FuseNavHorizontalGroup.defaultProps = {};

const NavHorizontalGroup = withRouter(React.memo(FuseNavHorizontalGroup));

export default NavHorizontalGroup;
