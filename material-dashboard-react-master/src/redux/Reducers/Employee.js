import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  employee: {     
    first_name: "atara",
    last_name: "",
    email: "",
    phone: "",     
   
  },


}
const employees = {

  
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
