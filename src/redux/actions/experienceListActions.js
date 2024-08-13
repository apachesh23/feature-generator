// src/redux/actions/experienceListActions.js
import config from '../../components/ExperienceList/config.json';

export const addItem = (item, containerType) => ({
  type: 'ADD_ITEM',
  payload: { item, containerType },
});

export const removeItem = (itemId, containerType) => ({
  type: 'REMOVE_ITEM',
  payload: { itemId, containerType },
});

export const toggleItemOption = (itemId, option, checked, containerType) => ({
  type: 'TOGGLE_ITEM_OPTION',
  payload: { itemId, option, checked, containerType },
});

export const setItems = (items, type) => {
  return {
    type: 'SET_ITEMS',
    payload: items,
    itemType: type,
  };
};

export const resetItems = () => ({
  type: 'RESET_ITEMS',
});

export const toggleActiveExperience = (itemId, containerType) => ({
  type: 'TOGGLE_ACTIVE_EXPERIENCE',
  payload: { itemId, containerType },
});
