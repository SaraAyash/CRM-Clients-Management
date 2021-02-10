import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  client: {
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  },
   
  
}
const clients = {
  setFirstName(state, action) {    
    state.client.firstName = action.payload;
  },
  setLastName(state, action) {    
    state.client.lastName = action.payload;
  },
  setEmail(state, action) {
    state.client.email = action.payload;
  },
  setMobile(state, action) {
    state.client.mobile = action.payload;
  },

};

export default produce((state, action) => createReducer(state, action, clients), initialState);
