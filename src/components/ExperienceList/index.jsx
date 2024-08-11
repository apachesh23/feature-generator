import React from 'react';
import DataBlock from './DataBlock/DataBlock';
import DataOutput from './DataBlock/DataOutput';
import PresetButtons from './PresetButtons/PresetButtons';
import { Box, Stack } from '@mantine/core';

const ExperienceList = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column', // Изменяем направление на колонку
      }}
    >
      {/* Добавляем PresetButtons */}
      <PresetButtons />

      {/* Контейнер для DataBlock и DataOutput */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <DataBlock title="Desktop" blockType="desktopItems" />
        <DataBlock title="Mobile" blockType="mobileItems" />
        <DataOutput title="Output" />
      </div>
    </Box>
  );
};

export default ExperienceList;
