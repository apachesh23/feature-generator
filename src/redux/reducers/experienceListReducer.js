import config from '../../components/ExperienceList/config.json';  // Импорт конфигурации

const initialState = {
  desktopItems: [],
  mobileItems: [],
};

const experienceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      console.log('experienceListReducer: ADD_ITEM action received:', action);

      const { blockType, itemId, defaultOptions } = action.payload;

      console.log('experienceListReducer: blockType:', blockType);
      console.log('experienceListReducer: itemId:', itemId);
      console.log('experienceListReducer: defaultOptions:', defaultOptions);

      const itemConfig = config.items.find(item => item.id === itemId);

      if (!itemConfig) {
        console.error(`experienceListReducer: Item with ID ${itemId} not found in config`);
        return state;
      }

      console.log('experienceListReducer: itemConfig found:', itemConfig);

      const newItem = {
        id: itemId,
        title: itemConfig.title,
        icon: itemConfig.icon,
        options: (defaultOptions || []).reduce((acc, option) => {
          acc[option] = true;
          return acc;
        }, {}),
      };

      console.log('experienceListReducer: newItem being added:', newItem);

      if (blockType === 'desktopItems') {
        const newState = { ...state, desktopItems: [...state.desktopItems, newItem] };
        console.log('experienceListReducer: New state for desktopItems:', newState);
        return newState;
      } else if (blockType === 'mobileItems') {
        const newState = { ...state, mobileItems: [...state.mobileItems, newItem] };
        console.log('experienceListReducer: New state for mobileItems:', newState);
        return newState;
      }
      return state;
    }

    case 'REMOVE_ITEM': {
      const { blockType, itemId } = action.payload;

      console.log('experienceListReducer: REMOVE_ITEM action received:', action.payload);

      if (blockType === 'desktopItems') {
        const newState = { ...state, desktopItems: state.desktopItems.filter(item => item.id !== itemId) };
        console.log('experienceListReducer: New state for desktopItems after removal:', newState);
        return newState;
      } else if (blockType === 'mobileItems') {
        const newState = { ...state, mobileItems: state.mobileItems.filter(item => item.id !== itemId) };
        console.log('experienceListReducer: New state for mobileItems after removal:', newState);
        return newState;
      }
      return state;
    }

    case 'UPDATE_ITEM_OPTIONS': {
      const { blockType, itemId, options } = action.payload;

      console.log('experienceListReducer: UPDATE_ITEM_OPTIONS action received:', action.payload);

      const items = blockType === 'desktopItems' ? state.desktopItems : state.mobileItems;
      const itemIndex = items.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], options };
        const newState = blockType === 'desktopItems'
          ? { ...state, desktopItems: updatedItems }
          : { ...state, mobileItems: updatedItems };

        console.log('experienceListReducer: New state after updating item options:', newState);
        return newState;
      }
      return state;
    }

    case 'REORDER_ITEMS': {
      const { blockType, reorderedItems } = action.payload;

      console.log('experienceListReducer: REORDER_ITEMS action received:', action.payload);

      const newState = blockType === 'desktopItems'
        ? { ...state, desktopItems: reorderedItems }
        : { ...state, mobileItems: reorderedItems };

      console.log('experienceListReducer: New state after reordering items:', newState);
      return newState;
    }

    default:
      console.log('experienceListReducer: No matching action type found, returning current state');
      return state;
  }
};

export default experienceListReducer;
