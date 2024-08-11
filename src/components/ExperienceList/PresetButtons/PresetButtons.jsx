import React from 'react';
import { Button, Group } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { applyPreset } from '../../../redux/actions/experienceListActions';
import config from '../config.json';

const PresetButtons = () => {
  const dispatch = useDispatch();

  const handleApplyPreset = (presetId) => {
    dispatch(applyPreset(presetId, 'desktopItems')); // Применяем пресет к desktopItems
  };

  return (
    <Group spacing="sm">
      {Object.keys(config.presets).map((presetId) => (
        <Button
        key={presetId}
        size="sm"
        variant="default"
        onClick={() => handleApplyPreset(presetId)}
        styles={(theme) => ({
            root: {
                fontSize: '12px',
            },
        })}
        >
          {config.presets[presetId].title}  {/* Отображаем тайтл на кнопке */}
        </Button>


      ))}
    </Group>
  );
};

export default PresetButtons;