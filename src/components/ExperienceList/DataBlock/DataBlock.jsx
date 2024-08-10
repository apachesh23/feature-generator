import React from 'react';
import { Paper, Title, Box, ScrollArea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconDevices2, IconDeviceMobile, IconClipboardList } from '@tabler/icons-react'; // Импорт иконок
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

  // Определяем иконку в зависимости от blockType
  const renderIcon = () => {
    switch (blockType) {
      case 'desktopItems':
        return <IconDevices2 size={20} stroke={1} />;
      case 'mobileItems':
        return <IconDeviceMobile size={20} stroke={1} />;
      default:
        return null;
    }
  };

  return (
    <Paper className={styles.dataBlock} radius="md">
      <div className={styles.header}>
        <Title 
          order={6} 
          weight={400} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Roboto Mono, monospace' }}
        >
          {renderIcon()}
          {title}
        </Title>
        <AddItemButton onAddItem={handleAddItem} items={config.items} blockType={blockType} />  {/* Передаем blockType */}
      </div>
      <ScrollArea style={{ height: '530px' }} offsetScrollbars scrollbarSize={4}>
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
      </ScrollArea>
    </Paper>
  );
};

export default DataBlock;
