import axios from 'axios';

const services = values => {
  const data = axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(function(response) {
      return 1500;
    })
    .catch(function(error) {
      return error;
    });
  return data;
};
export default services;
