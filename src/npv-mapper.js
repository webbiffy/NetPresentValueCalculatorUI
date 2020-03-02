const NPVMapper = () => {
  const fixed = values => {
    const { initialInvestment, selectYears, discountRate, yearCashFlow } = values;

    const request = {
      initial_investment: initialInvestment,
      number_of_year: selectYears,
      discount_rate_percentage: discountRate,
      cash_inflow: yearCashFlow[1]
    };
    return request;
  };

  const variable = values => {
    const { initialInvestment, selectYears, netPresentValueFormik, lowerBound, upperBound, incrementRate, mappedYearCashFlow } = values;
    const request = {
      initial_investment: initialInvestment,
      number_of_year: selectYears,
      net_present_value: netPresentValueFormik,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      increment_rate: incrementRate,
      cash_inflow: {
        Year: mappedYearCashFlow.Year,
        cash: mappedYearCashFlow.cash
      }
    };
    return request;
  };

  return {
    fixed,
    variable
  };
};
export default NPVMapper();
