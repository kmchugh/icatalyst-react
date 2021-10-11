import React, {useRef, useLayoutEffect, useState, useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '../IconButton';
import DropdownMenu from '../Menus/DropdownMenu';
import {generateHash} from '../../utilities';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      minWidth: theme.spacing(10)
    },
    content : {
      overflow : 'hidden',
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      padding : theme.spacing(.5),
    },
    spacer : {
      flex: 1
    },
    iconButton : {
      width : theme.spacing(4),
      height : theme.spacing(4),
    },
    menuWrapper : {
      display: 'flex',
      flexDirection: 'row',
      borderLeftStyle : 'solid',
      borderLeftColor : theme.palette.divider,
      borderLeftWidth : 'thin',
      marginLeft : theme.spacing(.5),
      paddingLeft : theme.spacing(.5),
      alignItems : 'center'
    },
    collapsedMenuWrapper : {
      borderLeftStyle : 'solid',
      borderLeftColor : theme.palette.divider,
      borderLeftWidth : 'thin',
      marginLeft : theme.spacing(.5),
    },
    collapsedMenuIconStyle : {
      marginLeft : theme.spacing(0),
    },
    componentWrapper : {
      display: 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      flex: 1
    }
  };
});

const CommandPanel = ({
  style,
  className,
  elevation = 1,
  primary = null,
  secondary = null,
})=>{
  const styles = useStyles();

  const contentRef = useRef(null);
  const [overflow, setOverflow] = useState(0);

  const [secondaryMenus, setSecondaryMenus] = useState(null);

  useEffect(()=>{
    setSecondaryMenus((menues)=>{
      const menuMap = (menues || []).reduce((acc, m)=>{
        acc[m.id] = m;
        return acc;
      }, {});
      return secondary ? secondary.map((m, m_index)=>{
        const items = m.map((i, i_index)=>{
          return React.isValidElement(i) ? {
            id: `__item_${m_index.toString()}_${i_index.toString()}__`,
            component : i
          } : {
            ...i,
            id: `__item_${m_index.toString()}_${i_index.toString()}__`,
          };
        });
        const id = generateHash(items.map((i)=>i.id).join('|')).toString();
        const previousMeasure = menuMap[id];
        return {
          id : id,
          items : items,
          w : previousMeasure ? previousMeasure.w : 0
        };
      }) : null;
    });
  }, [secondary]);

  const hasPrimary = primary && primary.length > 0;
  useLayoutEffect(()=>{
    if (secondaryMenus && overflow === 0 && contentRef.current) {
      // Measure the content area and decide what needs to be
      // pushed under the collapsible menu
      const containingElement = contentRef.current.parentNode;
      const contentElement = contentRef.current;
      const containerWidth = containingElement.clientWidth;
      const contentWidth = contentElement.scrollWidth;
      const overflow = (contentWidth - containerWidth);
      if (overflow > 0) {
        // The content needs to be collapsed
        setSecondaryMenus((menues)=>{
          return menues.map((m)=>{
            const updatedMenu = {
              ...m,
              items : m.items.map((i)=>{
                return {
                  ...i
                };
              })
            };
            updatedMenu.w = document.getElementById(m.id).clientWidth;
            return updatedMenu;
          });
        });
        setOverflow(overflow);
      } else {
        setOverflow(0);
      }
    }
  }, [secondaryMenus]);

  const secondaryItems = useMemo(()=>{
    // If there is no overflow then all items are visible
    if (overflow <= 0) {
      return {
        visible : secondaryMenus,
        collapsed : []
      };
    }
    return secondaryMenus.slice().reverse().reduce((acc, menuItem)=>{
      // Adding some padding
      if (acc.w >= -64) {
        acc.collapsed.unshift(menuItem);
      } else {
        acc.visible.unshift(menuItem);
      }
      acc.w-=menuItem.w;
      return acc;
    }, {
      visible : [],
      collapsed : [],
      w : overflow
    });
  }, [secondaryMenus]);

  return (
    <Paper
      style={style}
      elevation={elevation}
      className={clsx(
        styles.root,
        className
      )}>
      <div ref={contentRef} className={clsx(styles.content)}>
        {hasPrimary && (
          primary.map((i)=>{
            return (
              <IconButton
                className={clsx(styles.iconButton)}
                key={i.title}
                color={i.color}
                size="small"
                icon={i.icon}
                title={i.title}
                onClick={i.onClick}
              />
            );
          })
        )}
        <div className={clsx(styles.spacer)}/>
        { (secondaryMenus && secondaryMenus.length > 0) && (
        // Filter to the number of items with combined width less than overflow
          secondaryItems.visible.map((m)=>{
            return (
              <div
                key={m.id}
                className={clsx(styles.menuWrapper)}
                id={m.id}
              >
                {
                  m.items.map((i)=>{
                    return i.component ? i.component : (
                      <IconButton
                        id={i.id}
                        className={clsx(styles.iconButton)}
                        key={i.title}
                        color={i.color}
                        size="small"
                        icon={i.icon}
                        title={i.title}
                        onClick={i.onClick}
                      />
                    );
                  })
                }
              </div>
            );
          })
        )}
        {
          overflow > 0 && (
            <div
              className={clsx(styles.collapsedMenuWrapper)}
            >
              <DropdownMenu
                menu={secondaryItems.collapsed.flatMap((m, i, s)=>{
                  return [
                    ...m.items.map(i=>{
                      return i.component ? (
                        <div
                          className={clsx(styles.componentWrapper)}
                          onClick={(e)=>{
                            e.stopPropagation();
                          }}
                        >
                          {i.component}
                        </div>
                      ) : i;
                    }),
                    i === s.length-1 ? null : (
                      <Divider
                        style={{
                          height: '1px',
                          width: '100%'
                        }}
                        key={`divider_${i}`}
                        orientation="horizontal"
                      />
                    )
                  ];
                })}
                classes={{
                  menuIcon : clsx(styles.collapsedMenuIconStyle)
                }}
              />
            </div>
          )
        }
      </div>
    </Paper>
  );
};

const MenuItemPropTypes = PropTypes.shape({
  color : PropTypes.string,
  title : PropTypes.string,
  subtitle : PropTypes.string,
  icon : PropTypes.string
});

CommandPanel.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  elevation : PropTypes.number,
  primary : PropTypes.arrayOf(MenuItemPropTypes),
  secondary : PropTypes.arrayOf(
    PropTypes.arrayOf(MenuItemPropTypes)
  )
};

export default CommandPanel;
