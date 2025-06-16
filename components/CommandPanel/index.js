import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import IconButton from '../IconButton';
import DropdownMenu from '../Menus/DropdownMenu';
import { generateHash } from '../../utilities';

const Root = styled(Paper)(({ theme }) => ({
  minWidth: theme.spacing(10),
}));

const Content = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(0.5),
}));

const Spacer = styled('div')(() => ({ flex: 1 }));

const MenuWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderLeft: `thin solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(0.5),
  paddingLeft: theme.spacing(0.5),
  alignItems: 'center',
}));

const CollapsedMenuWrapper = styled('div')(({ theme }) => ({
  borderLeft: `thin solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(0.5),

  '& .menuIcon': {
    marginLeft : theme.spacing(0),
  }
}));

const CollapsedMenuIcon = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(0),
}));

const ComponentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

const CommandPanel = ({
  style,
  className,
  elevation = 1,
  primary = null,
  secondary = null,
}) => {
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

  const renderMenu = (menu) => menu.map((item, i) =>
    Array.isArray(item) ? (
      <MenuWrapper key={i} id={i.toString()}>{renderMenu(item)}</MenuWrapper>
    ) : item.component ? (
      item.component
    ) : (
      <StyledIconButton
        key={item.key || item.title}
        id={item.id}
        disabled={item.disabled}
        color={item.color}
        size="small"
        icon={item.icon}
        title={item.title}
        onClick={item.onClick}
      />
    )
  );

  return (
    <Root style={style} elevation={elevation} className={clsx(className)}>
      <Content ref={contentRef}>
        {hasPrimary && renderMenu(primary)}
        <Spacer />
        {secondaryItems.visible.map((m) => (
          <MenuWrapper key={m.id} id={m.id}>
            {m.items.map((i) =>
              i.component ? (
                i.component
              ) : (
                <StyledIconButton
                  key={i.title}
                  id={i.id}
                  disabled={i.disabled}
                  color={i.color}
                  size="small"
                  icon={i.icon}
                  title={i.title}
                  onClick={i.onClick}
                />
              )
            )}
          </MenuWrapper>
        ))}
        {overflow > 0 && (
          <CollapsedMenuWrapper>
            <DropdownMenu
              menu={secondaryItems.collapsed.flatMap((m, i, s) => [
                ...m.items.map((i) =>
                  i.component ? (
                    <ComponentWrapper
                      key={`collapsed_${i.component.key}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {i.component}
                    </ComponentWrapper>
                  ) : i
                ),
                i === s.length - 1
                  ? null
                  : <Divider key={`divider_${i}`} style={{ width: '100%' }} />,
              ])}
              classes={{
                menuIcon: CollapsedMenuIcon.className,
              }}
            />
          </CollapsedMenuWrapper>
        )}
      </Content>
    </Root>
  );
};

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
  secondary : PropTypes.array,
};

export default CommandPanel;
