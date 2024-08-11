// src/redux/ExperienceList/actions/experienceListActions.js
export const addItem = (blockType, itemId, defaultOptions) => {
    return {
      type: 'ADD_ITEM',
      payload: { blockType, itemId, defaultOptions },
    };
  };
  
export const removeItem = (blockType, itemId) => ({
    type: 'REMOVE_ITEM',
    payload: { blockType, itemId },
});

export const updateItemOptions = (blockType, itemId, options) => ({
    type: 'UPDATE_ITEM_OPTIONS',
    payload: { blockType, itemId, options },
});

export const reorderItems = (blockType, reorderedItems) => ({
    type: 'REORDER_ITEMS',
    payload: { blockType, reorderedItems },
});

export const toggleFavorite = (blockType, itemId) => ({
    type: 'TOGGLE_FAVORITE',
    payload: { blockType, itemId },
  });

export const applyPreset = (presetId, blockType) => ({
    type: 'APPLY_PRESET',
    payload: { presetId, blockType }
});
  