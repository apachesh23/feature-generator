// src/redux/reducers/experienceListReducer.js
import config from '../../components/ExperienceList/config.json';

const initialState = {
  desktopItems: [],
  mobileItems: [],
  desktopActiveExperience: null,
  mobileActiveExperience: null,
};

const experienceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = {
        ...action.payload.item,
        selectedOptions: action.payload.item.defaultOptions || [],
      };

      if (action.payload.containerType === 'desktop') {
        return {
          ...state,
          desktopItems: [...state.desktopItems, newItem],
        };
      } else if (action.payload.containerType === 'mobile') {
        return {
          ...state,
          mobileItems: [...state.mobileItems, newItem],
        };
      }
      return state;

    case 'REMOVE_ITEM':
      if (action.payload.containerType === 'desktop') {
        const updatedDesktopItems = state.desktopItems.filter(item => item.id !== action.payload.itemId);
        return {
          ...state,
          desktopItems: updatedDesktopItems,
          desktopActiveExperience: state.desktopActiveExperience === action.payload.itemId ? null : state.desktopActiveExperience,
        };
      } else if (action.payload.containerType === 'mobile') {
        const updatedMobileItems = state.mobileItems.filter(item => item.id !== action.payload.itemId);
        return {
          ...state,
          mobileItems: updatedMobileItems,
          mobileActiveExperience: state.mobileActiveExperience === action.payload.itemId ? null : state.mobileActiveExperience,
        };
      }
      return state;

    case 'TOGGLE_ITEM_OPTION':
      const updateItems = (items) =>
        items.map((item) =>
          item.id === action.payload.itemId
            ? {
                ...item,
                selectedOptions: action.payload.checked
                  ? [...item.selectedOptions, action.payload.option]
                  : item.selectedOptions.filter(option => option !== action.payload.option),
              }
            : item
        );

      if (action.payload.containerType === 'desktop') {
        return {
          ...state,
          desktopItems: updateItems(state.desktopItems),
        };
      } else if (action.payload.containerType === 'mobile') {
        return {
          ...state,
          mobileItems: updateItems(state.mobileItems),
        };
      }
      return state;

    case 'SET_ITEMS':
      if (action.itemType === 'desktop') {
        return {
          ...state,
          desktopItems: action.payload,
          desktopActiveExperience: null, // Сбрасываем активный опыт
        };
      } else if (action.itemType === 'mobile') {
        return {
          ...state,
          mobileItems: action.payload,
          mobileActiveExperience: null, // Сбрасываем активный опыт
        };
      }
      return state;

    case 'RESET_ITEMS':
      return {
        ...state,
        desktopItems: [],
        mobileItems: [],
        desktopActiveExperience: null,
        mobileActiveExperience: null,
      };

    case 'TOGGLE_ACTIVE_EXPERIENCE':
      if (action.payload.containerType === 'desktop') {
        return {
          ...state,
          desktopActiveExperience: state.desktopActiveExperience === action.payload.itemId ? null : action.payload.itemId,
        };
      } else if (action.payload.containerType === 'mobile') {
        return {
          ...state,
          mobileActiveExperience: state.mobileActiveExperience === action.payload.itemId ? null : action.payload.itemId,
        };
      }
      return state;

    case 'REORDER_ITEMS':
      if (action.payload.containerType === 'desktop') {
        return {
          ...state,
          desktopItems: action.payload.items,
        };
      } else if (action.payload.containerType === 'mobile') {
        return {
          ...state,
          mobileItems: action.payload.items,
        };
      }
      return state;

    default:
      return state;
  }
};

export default experienceListReducer;
