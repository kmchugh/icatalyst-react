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
  },
  content : {
    margin: '10px 0 0',
    lineHeight: 1,
    display : 'flex',
    flexDirection : 'row',
    overflow: 'hidden'
  },
  marker : {
    flexShrink: 0,
  },
  name : {
    paddingBottom: '2px',
    fontSize: '14px',
    color: '#666',
    fontWeight: 400,
    lineHeight: 1,
    margin: '10px 0 0',
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
    title = null,
    width = 200,
    total = null,
    getCount = (value)=>{
      return Array.isArray(value) ? value[value.length-1] : value.count;
    },
    getDisplayValue = (value)=>{
      return Array.isArray(value) ?
        value.slice(0, value.length-1) :
        value;
    }
  } = config;

  const percentString = (count)=>{
    return (total && count) ? (
      `(${Math.round((count/total)*10000)/100}%)`
    ) : '';
  };

  const valueString = (value)=>{
    if (value === null || value === undefined) {
      return '';
    }
    return Array.isArray(value) ? value.join(', ') : value;
  };

  return {
    trigger: trigger,
    extraCssText: `width:${width}px; white-space:pre-wrap;`,
    formatter: ({marker, seriesName, value})=>{
      const count = getCount(value);
      const displayValue = getDisplayValue(value);

      return `<div style="${styleString(cssStyles.title)}">` +
                (title || '') +
              '</div>' +
              (seriesName ?
                `<div style="${styleString(cssStyles.name)}">${seriesName}</div>`:
                ''
              ) +
              `<div style="${styleString(cssStyles.content)}">` +
                `<span style="${styleString(cssStyles.marker)}">${marker}</span>` +
                `<span style="${styleString(cssStyles.valueWrapper)}">` +
                  `<span style="${styleString(cssStyles.value)}">${valueString(displayValue)}</span>` +
                  `<span style="${styleString(cssStyles.summary)}">${count}${percentString(count)}</span>` +
                '</span>' +
              '</div>';
    }
  };
};

export default Tooltip;
