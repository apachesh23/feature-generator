// src/components/PresetButtons.jsx
import React from 'react';
import { Button, Group } from '@mantine/core';
import { useDispatch } from 'react-redux';
import config from './config.json';
import { setItems, toggleActiveExperience } from '../../redux/actions/experienceListActions';

const PresetButtons = ({ type }) => {
  const dispatch = useDispatch();

  const handlePresetClick = (presetKey) => {
    const preset = config.presets[presetKey];

    const presetItems = preset.items.map(presetItem => {
      const itemConfig = config.items.find(item => item.id === presetItem.id);
      return {
        ...itemConfig,
        selectedOptions: presetItem.options
      };
    });

    // Очищаем текущие элементы и устанавливаем новые с их опциями
    dispatch(setItems(presetItems, type));

    // Устанавливаем activeExperience, если он есть в пресете
    if (preset.activeExperience) {
      dispatch(toggleActiveExperience(preset.activeExperience, type));
    } else {
      dispatch(toggleActiveExperience(null, type)); // Сброс, если activeExperience не указан
    }
  };

  return (
    <Group justify="space-between" style={{ width: '100%' }}>
      {Object.keys(config.presets).map((presetKey) => (
        <Button size="sm" variant="outline" style={{ fontSize: '12px', padding: '0px 12px' }} key={presetKey} onClick={() => handlePresetClick(presetKey)}>
          {config.presets[presetKey].title}
        </Button>
      ))}
    </Group>
  );
};

export default PresetButtons;
