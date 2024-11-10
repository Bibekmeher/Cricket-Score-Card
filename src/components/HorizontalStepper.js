import { TextField, Step, StepLabel, Stepper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  formContainer: {
    margin: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '1.5rem',
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  textField: {
    width: '100%',
  },
  stepper: {
    padding: '1rem 0',
    backgroundColor: 'transparent',
  },
}));

const HorizontalStepper = () => {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const steps = ['Team Selection', 'Overs', 'Batting Choice'];
  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const initialValues = { team1: '', team2: '', maxOver: '', batting: '' };
  const validationSchema = [
    Yup.object({
      team1: Yup.string().required('Team Name is required'),
      team2: Yup.string().required('Team Name is required'),
    }),
    Yup.object({
      maxOver: Yup.number().required('Over is required').positive().integer(),
    }),
    Yup.object({
      batting: Yup.string().required('Please choose who is Batting'),
    }),
  ];

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = () => activeStep === steps.length - 1;

  return (
    <div className={classes.mainContainer}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        initialValues={initialValues}
        validationSchema={currentValidationSchema}
        onSubmit={(values, actions) => {
          handleNext();
          actions.setTouched({});
          actions.setSubmitting(false);
          if (isLastStep()) {
            setSubmitting(true);
            localStorage.setItem('gameData', JSON.stringify(values));
            history.push('/score');
            setSubmitting(false);
          }
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.formContainer}>
              {activeStep === 0 && (
                <>
                  <TextField
                    id="team1"
                    name="team1"
                    label="Team 1 Name"
                    variant="outlined"
                    value={values.team1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.team1 && errors.team1}
                    error={touched.team1 && !!errors.team1}
                    className={classes.textField}
                  />
                  <Typography align="center" variant="h6" style={{ margin: '1rem 0' }}>
                    VS
                  </Typography>
                  <TextField
                    id="team2"
                    name="team2"
                    label="Team 2 Name"
                    variant="outlined"
                    value={values.team2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.team2 && errors.team2}
                    error={touched.team2 && !!errors.team2}
                    className={classes.textField}
                  />
                </>
              )}
              {activeStep === 1 && (
                <TextField
                  id="maxOver"
                  name="maxOver"
                  label="Number of Overs"
                  type="number"
                  variant="outlined"
                  value={values.maxOver}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.maxOver && errors.maxOver}
                  error={touched.maxOver && !!errors.maxOver}
                  className={classes.textField}
                />
              )}
              {activeStep === 2 && (
                <FormControl component="fieldset" className={classes.formGroup}>
                  <FormLabel component="legend">Who is Batting?</FormLabel>
                  <RadioGroup
                    name="batting"
                    value={values.batting}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="team1"
                      control={<Radio />}
                      label={values.team1 || 'Team 1'}
                    />
                    <FormControlLabel
                      value="team2"
                      control={<Radio />}
                      label={values.team2 || 'Team 2'}
                    />
                  </RadioGroup>
                </FormControl>
              )}
              <div className={classes.buttonContainer}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="outlined"
                  color="primary"
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isLastStep() ? 'Start Game' : 'Next'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default HorizontalStepper;
