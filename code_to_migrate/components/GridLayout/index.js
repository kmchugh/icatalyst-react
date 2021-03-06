import React, {useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import getFromLocalStore  from 'icatalyst/utilities/localstorage';
import saveToLocalStore  from 'icatalyst/utilities/localstorage';


// import {getFromLocalStore, saveToLocalStore} from 'icatalyst/utilities/localstorage';
import _ from 'icatalyst/@lodash';

import { Responsive, WidthProvider } from 'react-grid-layout';
import GridItem from './GridItem';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      height: '100%',
      overflowX : 'hidden',
      overflowY : 'auto'
    },
    gridRoot : {
      ['& .react-grid-item.react-grid-placeholder'] : {
        backgroundColor : theme.palette.divider
      }
    }
  };
});
console.log(GridLayout);

const GridLayout = React.forwardRef(({
  className,
  style = {},
  data,
  ItemWrapperComponent = GridItem,
  margin,
  containerPadding,
  dragHandleClass = 'dragHandle',
  rowHeight,
  onLayoutChange,
  compactType = 'vertical',
  localStorageKey = null,
  isDroppable = false,
  onDrop,
  onDrag,
  onDragStart,
  gridClassName
}, ref)=>{
  const styles = useStyles();

  const minmax = (value = 0, min = 1, max = 1)=>{
    return Math.min(Math.max(value, min), max);
  };

  // The layout is expected to be an object with
  // keys matching the key of the item being layed out
  const parseLayout = (layout)=>{
    return layout ? Object.keys(layout).reduce((acc, key)=>{
      acc.push({
        i : key,
        ...layout[key],
        x: layout[key].x || 0,
        y: layout[key].y || 0,
        w: minmax(layout[key].w, layout[key].minW, layout[key].maxW),
        h: minmax(layout[key].h, layout[key].minH, layout[key].maxH)
      });
      return acc;
    }, []) : [];
  };

  const getFromLS = ()=>{
    return getFromLocalStore(localStorageKey);
  };

  const saveToLS = (value) => {
    saveToLocalStore(localStorageKey, value);
  };

  const layoutRef = useRef(
    parseLayout(data.layout ? data.layout : (
      localStorageKey ? getFromLS(localStorageKey) : {}
    ))
  );

  useEffect(()=>{
    if (localStorageKey) {
      layoutRef.current = parseLayout(getFromLS(localStorageKey) || {});
    } else {
      layoutRef.current = parseLayout(data.layout);
    }
  }, [localStorageKey]);

  useEffect(()=>{
    if (data.layout) {
      layoutRef.current = parseLayout(data.layout);
    }
  }, [data]);

  const gridLayout = useMemo(()=>{
    // Extract the properties so they are comparable
    const childConfig = data.children.map(c=>{
      const {config} = c.props;
      return {
        i : config.id,
        h : config.h,
        w : config.w,
        maxH : config.maxH,
        maxW : config.maxW,
        minW : config.minW,
        minH : config.minH
      };
    }).sort((a, b)=>a.i.localeCompare(b.i));
    const layoutConfig = layoutRef.current.map(c=>{
      return {
        i : c.i,
        h : c.h,
        w : c.w,
        maxH : c.maxH,
        maxW : c.maxW,
        minW : c.minW,
        minH : c.minH
      };
    }).sort((a, b)=>a.i.localeCompare(b.i));

    const firstDiff = childConfig.find((c, i)=>{
      return !_.isEqual(c, layoutConfig[i]);
    });

    // If there is a mismatch between the layout and children
    // then we need to update the layout
    if (!firstDiff) {
      return layoutRef.current;
    } else {
      setTimeout(
        ()=>{
          window.dispatchEvent(new Event('resize'));
        },
        1000
      );
      return parseLayout(data.layout);
    }
  }, [data]);

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <ResponsiveGridLayout
        ref={ref}
        style={{
          height : '100vh',
        }}
        margin={margin}
        containerPadding={containerPadding}
        className={clsx(styles.gridRoot, gridClassName)}
        draggableHandle={`.${dragHandleClass}`}
        isDroppable={isDroppable}
        onDrop={onDrop}
        onDrag={onDrag}
        onDragStart={onDragStart}
        rowHeight={rowHeight}
        autoSize={false}
        isBounded={false}
        breakpoints={{
          lg : 1200,
        }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
        onLayoutChange={(layoutData/*, breakpoints*/)=>{
          const parsedLayout = layoutData.reduce((acc, l)=>{
            acc[l.i] = {
              h : l.h,
              w : l.w,
              x : l.x,
              y : l.y
            };
            return acc;
          }, {});
          layoutRef.current = layoutData;
          if (!_.isEqual(parsedLayout, data.layout)) {
            if (localStorageKey) {
              saveToLS(layoutData);
            }
            onLayoutChange && onLayoutChange(parsedLayout);
          }
        }}
        layouts={{
          lg : gridLayout
        }}
        compactType={compactType === 'none' ? null : compactType}
      >
        {data.children.map((child, i)=>{
          const {
            key = i
          } = child;

          const {
            gridItemProps = {}
          } = child.props;

          return (
            <ItemWrapperComponent
              key={key}
              {...gridItemProps}
            >
              {child}
            </ItemWrapperComponent>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
});

GridLayout.displayName = 'GridLayout';
GridLayout.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  gridClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  data : PropTypes.shape({
    children : PropTypes.arrayOf(PropTypes.node).isRequired,
    layout : PropTypes.object.isRequired
  }).isRequired,
  ItemWrapperComponent : PropTypes.element,
  margin : PropTypes.arrayOf(PropTypes.number),
  containerPadding : PropTypes.arrayOf(PropTypes.number),
  dragHandleClass : PropTypes.string,
  rowHeight : PropTypes.number,
  onLayoutChange : PropTypes.func,
  compactType : PropTypes.oneOf([
    'vertical',
    'horizontal',
    'none'
  ]),
  localStorageKey : PropTypes.string,
  isDroppable : PropTypes.bool,
  onDrop : PropTypes.func,
  onDrag : PropTypes.func,
  onDragStart : PropTypes.func
};

export default GridLayout;
