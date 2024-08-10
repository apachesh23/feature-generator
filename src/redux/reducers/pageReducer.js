// src/redux/pageReducer.js

const initialState = {
    selectedPage: 'ExperienceList',
  };
  
  const pageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PAGE':
        return { ...state, selectedPage: action.payload };
      default:
        return state;
    }
  };
  
  export default pageReducer;
  