import config from '../../components/ExperienceList/config.json';  // Импорт конфигурации

const initialState = {
  desktopItems: [],
  mobileItems: [],
};

const experienceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { blockType, itemId, defaultOptions } = action.payload;
      const itemConfig = config.items.find(item => item.id === itemId);

      if (!itemConfig) {
        console.error(`experienceListReducer: Item with ID ${itemId} not found in config`);
        return state;
      }

      const newItem = {
        id: itemId,
        title: itemConfig.title,
        icon: itemConfig.icon,
        options: (defaultOptions || []).reduce((acc, option) => {
          acc[option] = true;
          return acc;
        }, {}),
        isFavorite: false,  // Добавляем isFavorite по умолчанию false
      };

      if (blockType === 'desktopItems') {
        const newState = { ...state, desktopItems: [...state.desktopItems, newItem] };
        return newState;
      } else if (blockType === 'mobileItems') {
        const newState = { ...state, mobileItems: [...state.mobileItems, newItem] };
        return newState;
      }
      return state;
    }

    case 'REMOVE_ITEM': {
      const { blockType, itemId } = action.payload;

      if (blockType === 'desktopItems') {
        const newState = { ...state, desktopItems: state.desktopItems.filter(item => item.id !== itemId) };
        return newState;
      } else if (blockType === 'mobileItems') {
        const newState = { ...state, mobileItems: state.mobileItems.filter(item => item.id !== itemId) };
        return newState;
      }
      return state;
    }

    case 'UPDATE_ITEM_OPTIONS': {
      const { blockType, itemId, options } = action.payload;
      console.log('experienceListReducer: UPDATE_ITEM_OPTIONS received:', action.payload);

      const items = blockType === 'desktopItems' ? state.desktopItems : state.mobileItems;
      const itemIndex = items.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], options };
        console.log('experienceListReducer: Updated items:', updatedItems);
        return blockType === 'desktopItems'
          ? { ...state, desktopItems: updatedItems }
          : { ...state, mobileItems: updatedItems };
      }
      return state;
    }

    case 'REORDER_ITEMS': {
      const { blockType, reorderedItems } = action.payload;

      const newState = blockType === 'desktopItems'
        ? { ...state, desktopItems: reorderedItems }
        : { ...state, mobileItems: reorderedItems };

      return newState;
    }

    case 'TOGGLE_FAVORITE': {
        const { blockType, itemId } = action.payload;
    
        const items = blockType === 'desktopItems' ? state.desktopItems : state.mobileItems;
    
        const updatedItems = items.map(item => ({
          ...item,
          isFavorite: item.id === itemId ? !item.isFavorite : false,
        }));
    
        return blockType === 'desktopItems'
          ? { ...state, desktopItems: updatedItems }
          : { ...state, mobileItems: updatedItems };
    }
    
    default:
      return state;
  }
};

export default experienceListReducer;
