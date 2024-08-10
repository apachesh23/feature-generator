import React from 'react';
import { Paper, Title, Box } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import styles from './DataBlock.module.css';
import DataItem from '../DataItem/DataItem';
import AddItemButton from '../AddItemButton/AddItemButton';
import config from '../config.json';  // Импорт конфигурации
import { addItem, removeItem } from '../../../redux/actions/experienceListActions'; // Импорт действий из Redux

const DataBlock = ({ title, blockType }) => {
  const dispatch = useDispatch();
  const currentItems = useSelector((state) => state.experienceList[blockType]);

  const handleAddItem = (itemId) => {
    const newItem = config.items.find(item => item.id === itemId);
    if (newItem) {
      dispatch(addItem(blockType, itemId, newItem.defaultOptions));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(blockType, itemId));
  };

  return (
    <Paper className={styles.dataBlock}>
      <div className={styles.header}>
        <Title order={6} weight={400}>
          {title}
        </Title>
        <AddItemButton onAddItem={handleAddItem} items={config.items} blockType={blockType} />  {/* Передаем blockType */}
      </div>
      <Box p="md" className={styles.content}>
        {currentItems.map((item, index) => (
          <DataItem 
            key={index} 
            title={item.title} 
            icon={item.icon}  
            options={config.options}  // Передаем полный список опций
            defaultOptions={item.options}  // Используем options из состояния Redux
            onRemove={() => handleRemoveItem(item.id)} 
            blockType={blockType}  // Передаем blockType
            itemId={item.id}  // Передаем itemId
          />
        ))}
      </Box>
    </Paper>
  );
};

export default DataBlock;
