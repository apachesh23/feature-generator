import React from 'react';
import { Box, Grid } from '@mantine/core';

import DataContainer from './DataBlocks/DataContainer';
import DataContainerOutput from './DataBlocks/DataContainerOutput';
import PresetButtons from './PresetButtons';

const ExperienceList = () => {
  return (
    <Box
      style={{
        // height: '100vh',
        // padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        height: 'calc(100% - 80px)',
        marginTop: '40px',
        // backgroundColor: 'blue'
      }}
    >
      <PresetButtons type="desktop" />

      <Grid gutter="lg" style={{ width: '100%', marginTop: '0px' }}>
        <Grid.Col span={3.5}>
          <DataContainer title="Desktop" type="desktop" />
        </Grid.Col>
        <Grid.Col span={3.5}>
          <DataContainer title="Mobile" type="mobile" />
        </Grid.Col>
        <Grid.Col span={5}>
          <DataContainerOutput title="Output" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ExperienceList;
