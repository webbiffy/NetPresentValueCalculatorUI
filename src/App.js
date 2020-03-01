import React, { useState, useRef } from 'react';
import './App.css';
import 'typeface-roboto';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useFormik } from 'formik';
import services from './services';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '-webkit-fill-available',
      flexGrow: 1
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '-webkit-fill-available'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  buttonWidth: {
    width: '-webkit-fill-available'
  }
}));

const errorStyles = {
  margin: 0,
  marginLeft: '24px',
  color: 'red'
};

const titleStyles = {
  textAlign: 'center'
};
function App() {
  const classes = useStyles('');

  const [netPresentValue, setNetPresentValue] = useState('');
  const [variableNetPresentValue, setVariableNetPresentValue] = useState({});

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const formik = useFormik({
    initialValues: {
      initialInvestment: '',
      discountRate: '',
      selectYears: 1,
      natureOfInflow: 'FIXED',
      lowerBound: '',
      upperBound: '',
      incrementRate: '',
      yearCashFlow: {}
    },
    validationSchema: Yup.object().shape({
      // initialInvestment: Yup.mixed()
      //   .required('Field must not be empty')
      //   .test(),
      // initialInvestment: Yup.string().required('Field must not be empty'),
      // initialInvestment: Yup.number().min(1, 'It must be a positive, non-zero number'),
      discountRate: Yup.string().required('Field must not be empty')
    }),

    onSubmit: values => {
      fetchDataFromAPI(values);
    }
  });

  const fetchDataFromAPI = async values => {
    const dataFromAPI = await services(values);
    if (dataFromAPI.natureOfInflow === 'FIXED') {
      setNetPresentValue(dataFromAPI);
    } else {
      setVariableNetPresentValue(dataFromAPI);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm'>
        <h1 style={titleStyles}>Net Present Value Calculator</h1>
        {netPresentValue !== '' && formik.natureOfInflow === 'FIXED' ? <h2 style={titleStyles}>Net Present Value: ₱{netPresentValue}</h2> : ''}
        <form onSubmit={formik.handleSubmit} className={classes.root} autoComplete='off'>
          <TextField id='initialInvestment' name='initialInvestment' label='Initial Investment' type='number' variant='outlined' value={formik.values.initialInvestment} onChange={formik.handleChange} />
          {formik.errors.initialInvestment && formik.touched.initialInvestment ? <div style={errorStyles}>{'* ' + formik.errors.initialInvestment}</div> : null}

          {formik.values.natureOfInflow === 'FIXED' ? <TextField id='discountRate' name='discountRate' label='Discount Rate' type='number' variant='outlined' value={formik.values.discountRate} onChange={formik.handleChange} /> : ''}

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel ref={inputLabel} id='selectYears'>
              Years
            </InputLabel>
            <Select labelId='selectYears' id='selectYears' name='selectYears' value={formik.values.selectYears} onChange={formik.handleChange} labelWidth={labelWidth}>
              {_.range(1, 10 + 1).map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel ref={inputLabel} id='natureOfInflowLabel'>
              Nature of Cash Inflows
            </InputLabel>
            <Select labelId='natureOfInflow' id='natureOfInflow' name='natureOfInflow' value={formik.values.natureOfInflow} onChange={formik.handleChange} labelWidth={labelWidth}>
              <MenuItem value={'FIXED'}>Yearly Fixed Cash Inflows</MenuItem>
              <MenuItem value={'VARIABLE'}>Yearly Variable Cash Inflows</MenuItem>
            </Select>
          </FormControl>

          {formik.values.natureOfInflow === 'VARIABLE' ? (
            <div className={classes.root}>
              <TextField id='lowerBound' name='lowerBound' label='Lower Bound' type='number' variant='outlined' value={formik.values.lowerBound} onChange={formik.handleChange} />
              <TextField id='upperBound' name='upperBound' label='Upper Bound' type='number' variant='outlined' value={formik.values.upperBound} onChange={formik.handleChange} />
              <TextField id='incrementRate' name='incrementRate' label='Increment Rate' type='number' variant='outlined' value={formik.values.incrementRate} onChange={formik.handleChange} />

              {_.range(1, formik.values.selectYears + 1).map(value => (
                <TextField key={value} id={`yearCashFlow[${value - 1}]`} name={`yearCashFlow[${value - 1}]`} label={'Year ' + value + ' Cash Flow'} type='number' variant='outlined' value={formik.values.yearCashFlow[value - 1]} onChange={formik.handleChange} />
              ))}
            </div>
          ) : (
            <TextField id={`yearCashFlow[0]`} name={`yearCashFlow[0]`} label={'Cash Flow'} type='number' variant='outlined' value={formik.values.yearCashFlow[0]} onChange={formik.handleChange} />
          )}

          <Grid container spacing={3}>
            <Grid item xs>
              <Button type='submit' variant='contained' color='primary' className={classes.buttonWidth}>
                Calculate
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant='contained' color='primary' className={classes.buttonWidth}>
                Save
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant='contained' color='primary' className={classes.buttonWidth}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default App;
