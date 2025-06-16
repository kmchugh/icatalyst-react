import React from 'react';
import PropTypes from 'prop-types';
import {styled, useTheme} from '@mui/styles';
import clsx from 'clsx';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Icon from '../Icon';
import DropdownMenu from '../Menus/DropdownMenu';

const PaperStyle = styled(Paper)(() => ({
  overflow : 'hidden',
  display : 'flex',
  flexDirection : 'column'
}));

const ContentHeader = styled('div')(({ theme }) => ({
  flexShrink : 0,
  flexGrow : 0,
  display: 'flex',
  flexDirection : 'row',
  alignItems : 'center',
  minHeight : theme.spacingNum(3)
}));

const Content = styled('div')(() => ({
  overflow : 'hidden',
  flexGrow : 1
}));

const DragHandle = styled('span')(({ theme }) => ({
  overflow : 'hidden',
  cursor : 'pointer',
  color : 'transparent',
  marginLeft : theme.spacingNum(.5),
  marginRight : theme.spacingNum(1),
  marginTop : theme.spacingNum(-0.5),
  flexShrink: 0
}));

const TitleWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection : 'row',
  flexGrow : 1,
  flexShrink : 1,
  alignItems : 'center',
  overflow: 'hidden',
  minHeight: theme.spacingNum(4)
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  paddingLeft: theme.spacingNum(1),
  paddingRight: theme.spacingNum(1),
  paddingTop : theme.spacingNum(.5)
}));

const GridItem = React.forwardRef(({
  className,
  style = {},
  children,
  variant = 'default',
  title,
  menuTitle,
  menu,
  icon,
  iconColor,
  showChrome = true,
  ...rest
}, ref)=>{
  const theme = useTheme();

  const isCompact = variant === 'compact';

  return (
    <PaperStyle
      ref={ref}
      className={clsx(className)}
      style={{...style}}
      {...rest}
    >
      {showChrome && (
        <ContentHeader>
          <DragHandle className="dragHandle">
            <Icon
              size={isCompact ? 'small' : 'medium'}
              title="drag"
              component="div"
              style={{
                // This is a fix for the browser updates for scrolling
                pointerEvents : 'none',
                position: 'absolute',
              }}
              color="secondary"
            >
              drag_indicator
            </Icon>
            tttt
          </DragHandle>
          <TitleWrapper>
            {
              React.isValidElement(title) ?
                title :
                <Tooltip title={title || ''}>
                  <Title
                    variant="subtitle1"
                    style={isCompact ? {
                      fontSize : theme.spacingNum(1.5)
                    } : {
                      fontSize : theme.spacingNum(2),
                    }}
                    noWrap
                    component="h2"
                  >
                    {title}
                  </Title>
                </Tooltip>
            }
            {icon && (
              <Icon
                color={iconColor}
                size={isCompact ? 'small' : 'medium'}>
                {icon}
              </Icon>
            )}
          </TitleWrapper>
          { menu && (
            <DropdownMenu
              menu={[]}
              size={isCompact ? 'small' : 'medium'}
              title={menuTitle}
            />
          )}
        </ContentHeader>
      )}
      <Content>
        {children}
      </Content>
    </PaperStyle>
  );
});

GridItem.displayName='GridItem';
GridItem.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  children : PropTypes.node,
  gridItemProps : PropTypes.object,
  variant : PropTypes.oneOf([
    'default',
    'compact'
  ]),
  title : PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  icon : PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  iconColor : PropTypes.string,
  menuTitle : PropTypes.string,
  menu : PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        title : PropTypes.string.isRequired,
        subtitle : PropTypes.string,
        key : PropTypes.string,
        onClick : PropTypes.func,
        icon : PropTypes.string,
        disabled : PropTypes.bool,
        selected : PropTypes.bool,
        iconColor : PropTypes.string,
        menu : PropTypes.array
      })
    ])
  ),
  showChrome : PropTypes.bool
};

export default GridItem;
