import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  employee: {   
    employee_id: '',  
    first_name: "",
    last_name: "",
    email: "",
    phone: "",     
   
  },


}
const employees = {

  setId(state, action) {
    state.employee.employee_id = action.payload;
  },
  setFirstName(state, action) {
    state.employee.first_name = action.payload;
  },
  setLastName(state, action) {
    state.employee.last_name = action.payload;
  },
  setEmail(state, action) {
    state.employee.email = action.payload;
  },
  setPhone(state, action) {
    state.employee.phone = action.payload;
  },
  
  

};

export default produce((state, action) => createReducer(state, action, employees), initialState);
