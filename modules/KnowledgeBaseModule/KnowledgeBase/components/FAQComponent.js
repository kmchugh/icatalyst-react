import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { SingularityContext } from '@icatalyst/components/Singularity';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearableInput from '@icatalyst/components/ClearableInput';
import Icon from '@icatalyst/components/Icon';
import Image from '@icatalyst/components/Image';

import { definition as kbdefinition } from '@icatalyst/components/Singularity/store/reducers/knowledgeBase.reducer.js';
import { FuseLoading } from '@icatalyst/components/fuse';

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
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(2),
        },
      },
      '& .MuiIcon-root': {
        fontSize: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(2),
        },
      },
    },
    accordion: {
      [theme.breakpoints.down('sm')]: {
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
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
      '& .MuiAccordionSummary-content': {
        maxWidth: 'calc(100% - 40px)',
      },
    },
    title: {
      maxWidth: '100%',
      textTransform: 'capitalize',
      padding: `${theme.spacing(0)}px ${theme.spacing(3)}px`,
      fontSize: theme.spacing(2.5),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('xs')]: {
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
      marginTop: 10,
    },

    chip: {
      marginLeft: theme.spacing(3),
      background: theme.palette.primary[500]
        ? theme.palette.primary[500]
        : theme.palette.primary.main,
      color: theme.palette.getContrastText(
        theme.palette.primary[500]
          ? theme.palette.primary[500]
          : theme.palette.primary.main
      ),
    },
    accordionVideo: {
      width: '50%',
      height: 200,
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
      background: 'black',
      [theme.breakpoints.down('sm')]: {
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
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        marginLeft: 15,
      },
    },
    contentDetail: {
      marginLeft: '25px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
  };
});

const FAQComponent = ({
  className,
  placeholderImage = 'assets/images/placeholders/PlaceholderImage.jpg'
}) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [hasAccess, setHasAccess] = useState(true);
  const [searchData, setSearchData] = useState('');

  const dispatch = useDispatch();
  const { accessToken } = useContext(SingularityContext);

  console.log(placeholderImage);


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
  const FAQData = data.filter((item) =>
    item.includeinkb && applyFilter(item?.title, item?.content, item?.excerpt, item?.tags)
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
          title='Top Questions'
          className={clsx(classes.iconButton)}
        >
          question_answer
        </Icon>

        <Typography
          variant='h4'
          className="text-center ml-16 mr-16"
        >
          Top Questions
        </Typography>

        <Icon
          size='large'
          title='Top Questions'
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
          label='Search with Keywords.'
          icon='search'
          onChange={(searchValue) => setSearchData(searchValue)}
          value={searchData || ''}
        />
      </Box>

      {FAQData && FAQData.length > 0 ? (
        FAQData.map((element) => {
          return (
            <Accordion
              key={element.clientid}
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
                        <Typography variant='h6' className={classes.heading}>
                          Content Details
                        </Typography>
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
                      {element.tags.split(',').map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          className={clsx(classes.chip)}
                          onClick={() => setSearchData(item)}
                        />
                      ))}
                    </div>
                  )}
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
  placeholderImage: PropTypes.string
};

export default FAQComponent;
