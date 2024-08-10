import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Text } from '@mantine/core';
import styles from './DataBlock.module.css';

const DataOutput = ({ title }) => {
  const desktopItems = useSelector((state) => state.experienceList.desktopItems);
  const mobileItems = useSelector((state) => state.experienceList.mobileItems);

  // Логирование данных при изменении desktopItems или mobileItems
  useEffect(() => {
    console.log('DataOutput: desktopItems изменились:', desktopItems);
    console.log('DataOutput: mobileItems изменились:', mobileItems);
  }, [desktopItems, mobileItems]);
  

  const renderItems = (items, blockType) => {
    return items.map((item, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <Text size="xs" weight={500}>
          {`${blockType} - ${item.title}`}
        </Text>
        <Text size="xs">
          Параметры: {Object.keys(item.options).filter(option => item.options[option]).join(', ') || 'Нет активных параметров'}
        </Text>
      </div>
    ));
  };

  return (
    <Paper className={styles.dataBlock}>
      <div className={styles.header}>
        <Text size="xs" weight={700}>
          {title}
        </Text>
      </div>
      <div style={{ padding: '10px' }}>
        <Text size="xs" weight={500}>Desktop Items:</Text>
        {renderItems(desktopItems, 'Desktop')}
        <Text size="xs" weight={500} style={{ marginTop: '10px' }}>Mobile Items:</Text>
        {renderItems(mobileItems, 'Mobile')}
      </div>
    </Paper>
  );
};

export default DataOutput;
