import React, { useEffect, useContext } from 'react';
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
import { ClearableInput } from '../../../components';

import { definition as kbdefinition } from '../../../components/Singularity/store/reducers/knowledgeBase.reducer.js';

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
    title: {},
    searchWrapper: {
      width: '60%',
      margin: theme.spacing(2),
    },
    accordion: {
      width: '60%',
    },
    accordionSummary: {
      margin: theme.spacing(1),
    },
    accordionHeading: {
      textTransform: 'capitalize',
      fontSize: '15px',
    },
    accordionContent: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      textAlign: 'left',
    },
    accordionChip: {
      display: 'flex',
      flexDirection: 'row',
    },

    chip: {
      margin: theme.spacing(1),
    },
  };
});

const FAQComponent = ({ className }) => {
  const classes = useStyles();

  console.log(kbdefinition);
  const dispatch = useDispatch();

  const reducer = useSelector(kbdefinition.getReducerRoot);
  const { accessToken } = useContext(SingularityContext);

  console.log(reducer);

  useEffect(() => {
    dispatch(
      kbdefinition.operations['RETRIEVE_ENTITIES'](
        (err, res) => {
          console.log(err, res);
        },
        {
          accessToken,
        }
      )
    );
  }, []);

  return (
    <div className={clsx(classes.root, className)}>
      <Typography
        variant='h4'
        className={clsx(classes.title, (className = 'text-center'))}
      >
        Top Questions
      </Typography>
      <Divider style={{ color: 'red' }} />
      <div className={clsx(classes.searchWrapper)}>
        <ClearableInput
          label='Search with Keywords.'
          icon='search'
          // value={searchFilter}
          // onChange={setSearchFilter}
        />
      </div>
      <Accordion className={clsx(classes.accordion, className)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <div className={clsx(classes.accordionSummary)}>
            <Grid container spacing={4}>
              <Grid xs={2}>
                <img src='https://via.placeholder.com/100x100' />
              </Grid>
              <Grid xs={8}>
                <Typography className={clsx(classes.accordionHeading)}>
                  Question Title 1 Experts
                </Typography>
              </Grid>
            </Grid>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={clsx(classes.accordionContent)}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <img src='https://via.placeholder.com/350x250' />
              </Grid>
              <Grid xs={4}>
                <Typography variant='h6'>Content Details</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </Grid>
            </Grid>
            <br />
            <div className={clsx(classes.accordionChip)}>
              <Typography variant='h6'>Tags :</Typography>
              <Chip
                //  key={email}
                label='tag1'
                className={clsx(classes.chip)}
              />
              <Chip
                //  key={email}
                label='tag2'
                className={clsx(classes.chip)}
              />
              <Chip
                //  key={email}
                label='tag2'
                className={clsx(classes.chip)}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className={clsx(classes.accordion, className)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <div className={clsx(classes.accordionSummary)}>
            <Grid container spacing={4}>
              <Grid xs={2}>
                <img src='https://via.placeholder.com/100x100' />
              </Grid>
              <Grid xs={8}>
                <Typography className={clsx(classes.accordionHeading)}>
                  Question Title 1 Experts
                </Typography>
              </Grid>
            </Grid>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={clsx(classes.accordionContent)}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <img src='https://via.placeholder.com/350x250' />
              </Grid>
              <Grid xs={4}>
                <Typography variant='h6'>Content Details</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </Grid>
            </Grid>
            <br />
            <div className={clsx(classes.accordionChip)}>
              <Typography variant='h6'>Tags :</Typography>
              <Chip
                //  key={email}
                label='tag1'
                className={clsx(classes.chip)}
              />
              <Chip
                //  key={email}
                label='tag2'
                className={clsx(classes.chip)}
              />
              <Chip
                //  key={email}
                label='tag2'
                className={clsx(classes.chip)}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
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
