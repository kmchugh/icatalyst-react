import {
  TooltipComponent,
} from 'echarts/components';

import * as echarts from 'echarts/core';
import _ from '../../../@lodash';


// Register the required components
echarts.use(
  [TooltipComponent]
);

const cssStyles = {
  title : {
    fontSize: '16px',
    color: '#666',
    fontWeight: 400,
    lineHeight: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0 0 10px 0',
  },
  content : {
    lineHeight: 1,
    display : 'flex',
    flexDirection : 'row',
    overflow: 'hidden'
  },
  marker : {
    flexShrink: 0,
  },
  name : {
    margin: '0 0 10px 0',
    paddingBottom: '2px',
    fontSize: '14px',
    color: '#666',
    fontWeight: 400,
    lineHeight: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    '-webkit-box-orient': 'vertical'
  },
  valueWrapper : {
    marginLeft: '10px',
    fontSize: '14px',
    color: '#666',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '2px',
  },
  value : {
    fontWeight: 900,
    flexGrow: 1,
  },
  summary : {
    flexShrink: 0,
  }
};

const styleString = (style = {})=>{
  return Object.entries(style)
    .map(([k, v])=>{
      const key = k.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
      return `${key}:${v}`;
    })
    .join(';');
};

const Tooltip = (params)=>{
  const config = _.merge({}, params);

  const {
    trigger = 'item',
    title = '',
    width = 200,
    total = null,
    showCount = true,
    showValue = true,
    showPercent = true,
    getCount = (value)=>{
      return Array.isArray(value) ?
        value[value.length-1] :
        (
          value.count ?
            value.count :
            value
        );
    },
    getDisplayValue = (value/*, data*/)=>{
      return Array.isArray(value) ?
        value.slice(0, value.length-1) :
        value;
    },
    ...tooltipConfig
  } = config;

  const percentString = (count)=>{
    return (total && count) ? (
      ` (${Math.round((count/(total+Number.EPSILON))*10000)/100}%)`
    ) : '';
  };

  const valueString = (value)=>{
    if (value === null || value === undefined) {
      return '';
    }
    return Array.isArray(value) ? value.join(', ') : value;
  };

  return {
    ...tooltipConfig,
    trigger: trigger,
    extraCssText: `width:${width}px; white-space:pre-wrap;`,
    formatter: (params)=>{
      const {data, marker, seriesName, value} = Array.isArray(params) ? params[0] : params;
      const count = getCount(value);
      const displayValue = getDisplayValue(value, data);

      return (title ?
        `<div style="${styleString(cssStyles.title)}">${title}</div>` :
        ''
      ) +

      (seriesName ?
        `<div style="${styleString(cssStyles.name)}">${seriesName}</div>`:
        ''
      ) +

      `<div style="${styleString(cssStyles.content)}">` +
        `<span style="${styleString(cssStyles.marker)}">${marker}</span>` +
        `<span style="${styleString(cssStyles.valueWrapper)}">` +
          (showValue ? `<span style="${styleString(cssStyles.value)}">${valueString(displayValue)}</span>` : '') +
          `<span style="${styleString(cssStyles.summary)}">${showCount ? count : ''}${showPercent ? percentString(count) : ''}</span>` +
        '</span>' +
      '</div>';
    }
  };
};

export default Tooltip;
