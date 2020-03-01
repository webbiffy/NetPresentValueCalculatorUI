import axios from 'axios';

const services = values => {
  values = JSON.stringify(values);
  const data = axios
    .post('/temporary/endpoint')
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
  return data;
};
export default services;
