import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { SingularityContext } from '../../../components/Singularity';
import {
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import {alpha} from '@material-ui/core/styles/colorManipulator';
import { ClearableInput, IconButton, Image } from '../../../components';

import { definition as kbdefinition } from '../../../components/Singularity/store/reducers/knowledgeBase.reducer.js';
import { FuseLoading } from '../../../components/fuse';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      // Fix for safari flexbox
      minHeight: '600px',
    },
    searchWrapper: {
      width: '60%',
      margin: theme.spacing(2),
      height: theme.spacing(8),
      '& input': {
        fontSize: theme.spacing(4),
      },
      '& .MuiIcon-root': {
        fontSize: theme.spacing(4),
      },
    },
    accordion: {
      width: '60%',
    },
    accordionSummary: {
      margin: theme.spacing(1),
    },
    title: {
      width: 'fit-content',
      maxWidth: 700,
      textTransform: 'capitalize',
      padding: `${theme.spacing(0)}px ${theme.spacing(3)}px`,
      fontSize: theme.spacing(2.5),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '& :first-child': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    excerpt: {
      fontSize: theme.spacing(1.5),
    },
    accordionContent: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      fontSize: theme.spacing(3.5),
      textAlign: 'justify',
    },
    accordionChip: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
    },

    chip: {
      marginLeft: theme.spacing(3),
      // background: '#6f4021'
      background: theme.palette.primary[500] ? theme.palette.primary[500] : theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary[500] ? theme.palette.primary[500] : theme.palette.primary.main),
    },
    accordionVideo: {
      width: 390,
      height: 225,
      marginTop: theme.spacing(2),
      background: 'black',
    },
    iconButton: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      margin: `auto ${theme.spacing(1)}px`,
    },
    featureImg: {
      width: 80,
      height: 50,
      // imageRendering: 'pixelated',
      objectFit: 'cover',
    },
    heading: {
      color: theme.palette.secondary[500] ? theme.palette.secondary[500] : theme.palette.secondary.main,
    }
  };
});

const FAQComponent = ({ className }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [hasAccess, setHasAccess] = useState(true);
  const [searchData, setSearchData] = useState('');

  const dispatch = useDispatch();

  const reducer = useSelector(kbdefinition.getReducerRoot);
  const { accessToken } = useContext(SingularityContext);

  console.log(reducer);

  useEffect(() => {
    dispatch(
      kbdefinition.operations['RETRIEVE_ENTITIES'](
        (err, res) => {
          setData(res);
          setHasAccess(false);
        },
        {
          accessToken,
        }
      )
    );
  }, []);

  const applyFilter = (...toSearch) => {
    const regex = /(<[^>]+>|<[^>]>|<\/[^>]>)/g;

    const str = toSearch.reduce((acc, item) => {
      if (!item) {
        return '';
      }
      const htmlEscapedStr = item.replace(regex, '');
      return `${acc} ${htmlEscapedStr}`;
    }, '');
    const index = str.toLowerCase().search(searchData.toLocaleLowerCase());

    if (index > -1) {
      return true;
    }

    return false;
  };

  return hasAccess ? (
    <FuseLoading title='Loading...' />
  ) : (
    <div className={clsx(classes.root, className)}>
      <Typography variant='h4' className={clsx((className = 'text-center'))}>
        <IconButton
          className={clsx(classes.iconButton)}
          size='large'
          icon='question_answer'
          title='Top Questions'
        />
        Top Questions
        <IconButton
          className={clsx(classes.iconButton)}
          size='large'
          icon='question_answer'
          title='Top Questions'
        />
      </Typography>
      <Divider style={{ color: 'red' }} />
      <div className={clsx(classes.searchWrapper)}>
        <ClearableInput
          label='Search with Keywords.'
          icon='search'
          onChange={(searchValue) => setSearchData(searchValue)}
          value={searchData || ''}
        />
      </div>
      {data
        .filter((item) =>
          applyFilter(item?.title, item?.content, item?.excerpt)
        )
        .map((element) => {
          return (
            <Accordion
              key={element.clientid}
              className={clsx(classes.accordion, className)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className={clsx(classes.accordionSummary)}>
                  <Grid container spacing={4}>
                    <Image
                      className={classes.featureImg}
                      src={element.featureimageurl}
                      defaultSrc='assets/images/placeholders/PlaceholderImage.jpg'
                    />
                    <Grid>
                      <Typography
                        className={clsx(classes.title)}
                        dangerouslySetInnerHTML={{
                          __html: element.title,
                        }}
                      />
                      <Typography
                        className={clsx(classes.title, classes.excerpt)}
                        dangerouslySetInnerHTML={{
                          __html: element.excerpt,
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={clsx(classes.accordionContent)}>
                  <Grid container>
                    {element.mediaurl && (
                      <Grid xs={6}>
                        <video
                          className={clsx(classes.accordionVideo)}
                          controls
                        >
                          <source src={element.mediaurl} type='video/mp4' />
                        </video>
                      </Grid>
                    )}
                    {element.content && (
                      <Grid xs={element.mediaurl ? 6 : 10}>
                        <Typography variant='h6' className={classes.heading}>Content Details</Typography>
                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: element.content,
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>

                  {element.tags && (
                    <div className={clsx(classes.accordionChip)}>
                      <Typography variant='subtitle2'>Tags :</Typography>
                      <Chip
                        //  key={email}
                        label={element.tags}
                        className={clsx(classes.chip)}
                      />
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

FAQComponent.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default FAQComponent;
