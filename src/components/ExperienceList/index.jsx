import React from 'react';
import DataBlock from './DataBlock/DataBlock';
import DataOutput from './DataBlock/DataOutput';
import { Box } from '@mantine/core';

const ExperienceList = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        <DataBlock title="DesktopData" blockType="desktopItems" />
        <DataBlock title="MobileData" blockType="mobileItems" />
        <DataOutput title="OutputData" />
      </div>
    </Box>
  );
};

export default ExperienceList;
