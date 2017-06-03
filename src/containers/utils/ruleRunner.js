/**
 * Created by mandy on 5/10/17.
 */

export const ruleRunner = (field, name, ...validations) => (state) =>{

  for (let v of validations) {
      let errorMessageFunction = v(state[field], name, state);
        if(errorMessageFunction)
      {
        return({[field] : errorMessageFunction});
      }
    }
    return null;
};

export const run = (state, runners) => {

  return runners.reduce((memo, runner) =>{
    return Object.assign(memo, runner(state));
  }, {});

};






