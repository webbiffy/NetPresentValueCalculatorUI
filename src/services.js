import axios from 'axios';
import npvMapper from './npv-mapper';

const services = values => {
  var hostURL = 'http://localhost:44347/api/nvp';
  if (values.natureOfInflow === 'FIXED') {
    const params = npvMapper.fixed(values);
    const data = axios
      .post(hostURL + '/fix/calculate', JSON.stringify(params))
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
    return data;
  } else if (values.natureOfInflow === 'VARIABLE') {
    const params = npvMapper.variable(values);
    const data = axios
      .post(hostURL + '/incremental/calculate', JSON.stringify(params))
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
    return data;
  }
};
export default services;
