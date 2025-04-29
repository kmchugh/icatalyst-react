import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { SingularityContext } from '@icatalyst/components/Singularity';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearableInput from '@icatalyst/components/ClearableInput';
import Icon from '@icatalyst/components/Icon';
import Image from '@icatalyst/components/Image';

import { definition as kbdefinition } from '@icatalyst/components/Singularity/store/reducers/knowledgeBase.reducer.js';
import { FuseLoading } from '@icatalyst/components/fuse';
import { getCleanText } from '@icatalyst/utilities/getCleanText';

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
      margin: theme.spacing(2),
      height: theme.spacing(8),
      '& input': {
        fontSize: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
          fontSize: theme.spacing(2),
        },
      },
      '& .MuiIcon-root': {
        fontSize: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
          fontSize: theme.spacing(2),
        },
      },
    },
    accordion: {
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '80%',
      },
      [theme.breakpoints.up('md')]: {
        width: '60%',
      },
    },
    accordionSummary: {
      maxWidth: '100%',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        '& .MuiIconButton-edgeEnd': {
          marginRight: 0,
        },
      },
      '& .MuiAccordionSummary-content': {
        maxWidth: 'calc(100% - 56px)',
      },
    },
    title: {
      maxWidth: '100%',
      textTransform: 'capitalize',
      padding: `${theme.spacing(0)} ${theme.spacing(3)}`,
      fontSize: theme.spacing(2.5),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0.75),
      },
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
    },
    chip: {
      marginLeft: theme.spacing(1),
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    accordionVideo: {
      width: '50%',
      height: 200,
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
      background: 'black',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '300px',
      },
    },
    iconButton: {
      marginTop: theme.spacing(1),
    },
    featureImg: {
      width: 80,
      height: 50,
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        height: 40,
        width: 40,
      },
    },
    heading: {
      color: theme.palette.secondary[500]
        ? theme.palette.secondary[500]
        : theme.palette.secondary.main,
    },
    headerTitle: {
      width: 'calc(100% - 80px)',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 40px)',
      },
    },
    headTitle: {
      display: 'flex',
      whiteSpace: 'nowrap',
      alignItems : 'center'
    },
    titleContainer: {
      maxWidth: 'calc(100% - 30px)',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 15,
      },
    },
    contentDetail: {
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(1.5),

      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
      },
    },
    tagArea : {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection : 'column',

      [theme.breakpoints.up('md')]: {
        flexDirection : 'row',
      },
    },
    category : {
      marginTop: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'flex-start',

      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        marginTop: 0,
      },
    }
  };
});

const FAQComponent = ({
  className,
  placeholderImage = 'assets/images/placeholders/PlaceholderImage.jpg',
  title
}) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [hasAccess, setHasAccess] = useState(true);
  const [searchData, setSearchData] = useState('');

  const dispatch = useDispatch();
  const { accessToken } = useContext(SingularityContext);

  useEffect(() => {
    dispatch(
      kbdefinition.operations['RETRIEVE_ENTITIES'](
        (err, res) => {
          setData(res || []);
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
        return acc;
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
  const faqData = data.filter((item) =>
    item.includeinkb && applyFilter(item?.title, item?.content, item?.excerpt, item?.tags, item?.category)
  );

  return hasAccess ? (
    <FuseLoading title='Loading...' />
  ) : (
    <div className={clsx(classes.root, className)}>
      <div
        variant='h4'
        className={clsx(classes.headTitle)}
      >
        <Icon
          size='large'
          className={clsx(classes.iconButton)}
        >
          question_answer
        </Icon>

        <Typography
          variant='h4'
          className="text-center ml-16 mr-16"
        >
          {title || kbdefinition.labelPlural}
        </Typography>

        <Icon
          size='large'
          className={clsx(classes.iconButton)}
        >
          question_answer
        </Icon>
      </div>
      <Box
        sx={{
          width: { xs: '100%', sm: '80%', md: '60%' },
        }}
        className={clsx(classes.searchWrapper)}
      >
        <ClearableInput
          label='Search with Keywords'
          icon='search'
          onChange={(searchValue) => setSearchData(searchValue)}
          value={searchData || ''}
        />
      </Box>

      {faqData && faqData.length > 0 ? (
        faqData.map((element) => {
          return (
            <Accordion
              key={element.guid}
              className={clsx(classes.accordion)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
                className={clsx(classes.accordionSummary)}
              >
                <Grid container className={classes.titleContainer}>
                  <Image
                    className={classes.featureImg}
                    src={element.featureimageurl}
                    defaultSrc={placeholderImage}
                  />
                  <Grid className={classes.headerTitle}>
                    <Typography
                      className={clsx(classes.title)}
                      dangerouslySetInnerHTML={{
                        __html: getCleanText(element.title),
                      }}
                    />
                    <Typography
                      className={clsx(classes.title, classes.excerpt)}
                      dangerouslySetInnerHTML={{
                        __html: getCleanText(element.excerpt),
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <div className={clsx(classes.accordionContent)}>
                  <Grid container>
                    {element.mediaurl && (
                      <video className={clsx(classes.accordionVideo)} controls>
                        <source src={element.mediaurl} type='video/mp4' />
                      </video>
                    )}
                    {element.content && (
                      <Grid
                        sm={12}
                        md={element.mediaurl ? 5 : 10}
                        className={clsx(classes.contentDetail)}
                      >
                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: getCleanText(element.content),
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>

                  <div className={clsx(classes.tagArea)}>
                    {element.tags && (
                      <div className={clsx(classes.accordionChip)}>
                        <Typography variant='subtitle2'>Tags :</Typography>
                        {element.tags.split(';').map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            className={clsx(classes.chip)}
                            onClick={() => setSearchData(item)}
                          />
                        ))}
                      </div>
                    )}

                    {element.category && (
                      <div className={clsx(classes.category)}>
                        <Typography variant='subtitle2'>Category :</Typography>
                        <Chip
                          label={element.category}
                          className={clsx(classes.chip)}
                          onClick={() => setSearchData(element.category)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography variant='h4'>
          No results
          <Typography variant='body1'>
            Please check your spelling or try another term
          </Typography>
        </Typography>
      )}
    </div>
  );
};

FAQComponent.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  placeholderImage: PropTypes.string,
  title : PropTypes.string
};

export default FAQComponent;
