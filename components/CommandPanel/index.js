import React, {useRef, useLayoutEffect, useState, useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, styled} from '@mui/styles';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '../IconButton';
import DropdownMenu from '../Menus/DropdownMenu';
import {generateHash} from '../../utilities';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      minWidth: theme.spacingNum(10)
    },
    content : {
      overflow : 'hidden',
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      padding : theme.spacingNum(.5),
    },
    spacer : {
      flex: 1
    },
    iconButton : {
      width : theme.spacingNum(4),
      height : theme.spacingNum(4),
    },
    menuWrapper : {
      display: 'flex',
      flexDirection: 'row',
      borderLeftStyle : 'solid',
      borderLeftColor : theme.palette.divider,
      borderLeftWidth : 'thin',
      marginLeft : theme.spacingNum(.5),
      paddingLeft : theme.spacingNum(.5),
      alignItems : 'center'
    },
    collapsedMenuWrapper : {
      borderLeftStyle : 'solid',
      borderLeftColor : theme.palette.divider,
      borderLeftWidth : 'thin',
      marginLeft : theme.spacingNum(.5),
    },
    collapsedMenuIconStyle : {
      marginLeft : theme.spacingNum(0),
    },
    componentWrapper : {
      display: 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      flex: 1
    }
  };
});
const Root = styled(Paper)(({ theme }) => ({
  minWidth: theme.spacingNum(10)
}));
const ContentStyle = styled('div')(({ theme }) => ({
  overflow : 'hidden',
  display : 'flex',
  flexDirection : 'row',
  alignItems : 'center',
  padding : theme.spacingNum(.5),
}));
const Spacer = styled('div')({
  flex: 1
});
const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  width: theme.spacingNum(4),
  height: theme.spacingNum(4),
}));
const MenuWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderLeftStyle : 'solid',
  borderLeftColor : theme.palette.divider,
  borderLeftWidth : 'thin',
  marginLeft : theme.spacingNum(.5),
  paddingLeft : theme.spacingNum(.5),
  alignItems : 'center'
}));
const CollapsedMenuWrapper = styled('div')(({ theme }) => ({
  borderLeftStyle : 'solid',
  borderLeftColor : theme.palette.divider,
  borderLeftWidth : 'thin',
  marginLeft : theme.spacingNum(.5),
}));
const DropdownMenuStyle = styled(DropdownMenu)(({ theme }) => ({
'.menuIcon': {
  marginLeft : theme.spacingNum(0),
  },}));
const ComponentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection : 'row',
  alignItems : 'center',
  flex: 1
}));

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

  const renderMenu = (menu)=>{
    return menu.map((item, i)=>{
      if (Array.isArray(item)) {
        return (<MenuWrapper
          key={i}
          id={i}
        >
          {renderMenu(item)}
        </MenuWrapper>);
      } else {
        return item.component ? item.component : (
          <IconButtonStyle
            key={item.key || item.title}
            disabled={item.disabled}
            color={item.color}
            size="small"
            icon={item.icon}
            title={item.title}
            onClick={item.onClick}
          />
        );
      }
    });
  };

  return (
    <Root
      style={style}
      elevation={elevation}
      className={clsx(
        className
      )}>
      <ContentStyle ref={contentRef}>
        {hasPrimary && (renderMenu(primary))}
        <Spacer/>
        { (secondaryMenus && secondaryMenus.length > 0) && (
        // Filter to the number of items with combined width less than overflow
          (secondaryItems.visible.map((m)=>{
            return (
              <MenuWrapper
                key={m.id}
                id={m.id}
              >
                {
                  m.items.map((i)=>{
                    return i.component ? i.component : (
                      <IconButtonStyle
                        id={i.id}
                        disabled={i.disabled}
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
              </MenuWrapper>
            );
          }))
        )}
        {
          overflow > 0 && (
            <CollapsedMenuWrapper>
              <DropdownMenuStyle
                menu={secondaryItems.collapsed.flatMap((m, i, s)=>{
                  return [
                    ...m.items.map((i)=>{
                      return i.component ? (
                        <ComponentWrapper
                          key={`collapsed_${i.component.key}`}
                          onClick={(e)=>{
                            e.stopPropagation();
                          }}
                        >
                          {i.component}
                        </ComponentWrapper>
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
            </CollapsedMenuWrapper>
          )
        }
      </ContentStyle>
    </Root>
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
  primary : PropTypes.array,
  secondary : PropTypes.arrayOf(
    PropTypes.arrayOf(MenuItemPropTypes)
  )
};

export default CommandPanel;
