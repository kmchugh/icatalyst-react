import React, { useEffect, useRef, useState, useContext } from 'react';
import FuseAnimateGroup from '../FuseAnimateGroup';
import FuseUtils from '../FuseUtils';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
// import { updateUserShortcuts } from 'app/auth/store/userSlice';
// import { selectNavigation } from 'app/store/fuse/navigationSlice';
import PropTypes from 'prop-types';
import {SingularityContext} from '@icatalyst/components/Singularity';

import { amber } from '@mui/material/colors';
import { styled } from '@mui/styles';

const Root = styled('div')({
  '&.horizontal': {},
  '&.vertical': {
    flexDirection: 'column'
  }
});

const LinkStyle = styled(Link)({
  textDecoration: 'none!important',
  color: 'inherit'
});

const AddIcon = styled(Icon)({
  color: amber[600]
});

function FuseShortcuts(props) {
  const singularityContext = useContext(SingularityContext);
  const {user} = singularityContext;
  const shortcuts = user && user.data && user.data.shortcuts || [];

  const navigationData = []; // useSelector(selectNavigation);

  const searchInputRef = useRef(null);
  const [addMenu, setAddMenu] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [navigation, setNavigation] = useState(null);
  const shortcutItems = shortcuts ? shortcuts.map(id => FuseUtils.findById(navigationData, id)) : [];

  useEffect(() => {
    function flattenNavigation() {
      setNavigation(FuseUtils.getFlatNavigation(navigationData));
    }

    // TODO: Remove if
    if (flattenNavigation === null) {
      flattenNavigation();
    }
  }, [props.location, navigationData]);

  function addMenuClick(event) {
    setAddMenu(event.currentTarget);
  }

  function addMenuClose() {
    setAddMenu(null);
  }

  function search(ev) {
    const newSearchText = ev.target.value;

    setSearchText(newSearchText);

    if (newSearchText.length !== 0 && navigation) {
      setSearchResults(navigation.filter(item => item.title.toLowerCase().includes(newSearchText.toLowerCase())));
      return;
    }
    setSearchResults(null);
  }

  function toggleInShortcuts(id) {
    let newShortcuts = [...shortcuts];
    newShortcuts = newShortcuts.includes(id) ? newShortcuts.filter(_id => id !== _id) : [...newShortcuts, id];
    console.log(newShortcuts);
    // dispatch(updateUserShortcuts(newShortcuts));
  }

  function ShortcutMenuItem({ item, onToggle }) {
    return (
      <LinkStyle to={item.url} role="button">
        <MenuItem key={item.id}>
          <ListItemIcon className="min-w-40">
            {item.icon ? (
              <Icon>{item.icon}</Icon>
            ) : (
              <span className="text-20 font-bold uppercase text-center">{item.title[0]}</span>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <IconButton
            onClick={ev => {
              ev.preventDefault();
              ev.stopPropagation();
              onToggle(item.id);
            }}
            size="large">
            <Icon color="action">{shortcuts.includes(item.id) ? 'star' : 'star_border'}</Icon>
          </IconButton>
        </MenuItem>
      </LinkStyle>
    );
  }
  ShortcutMenuItem.propTypes = {
    item : PropTypes.shape({
      id : PropTypes.string,
      title : PropTypes.string,
      url: PropTypes.string,
      icon: PropTypes.icon,
    }),
    onToggle: PropTypes.func
  };

  return (
    <Root
      className={clsx(
        props.variant,
        'flex flex-1',
        props.variant === 'vertical' && 'flex-grow-0 flex-shrink',
        props.className
      )}
    >
      <FuseAnimateGroup
        enter={{
          animation: 'transition.expandIn'
        }}
        className={clsx('flex flex-1', props.variant === 'vertical' && 'flex-col')}
      >
        <>
          {shortcutItems.map(
            item =>
              item && (
                <LinkStyle to={item.url} key={item.id}  role="button">
                  <Tooltip
                    title={item.title}
                    placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
                  >
                    <IconButton className="w-40 h-40 p-0" size="large">
                      {item.icon ? (
                        <Icon>{item.icon}</Icon>
                      ) : (
                        <span className="text-20 font-bold uppercase">{item.title[0]}</span>
                      )}
                    </IconButton>
                  </Tooltip>
                </LinkStyle>
              )
          )}

          <Tooltip
            title="Click to add/remove shortcut"
            placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
          >
            <IconButton
              className="w-40 h-40 p-0"
              aria-owns={addMenu ? 'add-menu' : null}
              aria-haspopup="true"
              onClick={addMenuClick}
              size="large">
              <AddIcon>star</AddIcon>
            </IconButton>
          </Tooltip>
        </>
      </FuseAnimateGroup>
      <Menu
        id="add-menu"
        anchorEl={addMenu}
        open={Boolean(addMenu)}
        onClose={addMenuClose}
        classes={{
          paper: 'mt-48'
        }}
        TransitionProps={{
          onEntered: () => {
            searchInputRef.current.focus();
          },

          onExited: () => {
            setSearchText('');
          }
        }}>
        <div className="p-16 pt-8">
          <Input
            inputRef={searchInputRef}
            value={searchText}
            onChange={search}
            placeholder="Search for an app or page"
            className=""
            fullWidth
            inputProps={{
              'aria-label': 'Search'
            }}
          />
        </div>

        <Divider />

        {
          searchText.length !== 0 &&
					searchResults &&
					searchResults.map(item => (<ShortcutMenuItem key={item.id} item={item} onToggle={() => toggleInShortcuts(item.id)} />))
        }

        {searchText.length !== 0 && searchResults.length === 0 && (
          <Typography color="textSecondary" className="p-16 pb-8">
						No results..
          </Typography>
        )}

        {searchText.length === 0 &&
          shortcutItems.map(item => item && (
            <ShortcutMenuItem
              key={item.id}
              item={item}
              onToggle={() => toggleInShortcuts(item.id)}
            />
          ))
        }
      </Menu>
    </Root>
  );
}

FuseShortcuts.propTypes = {
  variant : PropTypes.oneOf(['vertical', 'horizontal']),
  className : PropTypes.string,
  location : PropTypes.object,
};
FuseShortcuts.defaultProps = {
  variant: 'horizontal'
};

export default React.memo(FuseShortcuts);
