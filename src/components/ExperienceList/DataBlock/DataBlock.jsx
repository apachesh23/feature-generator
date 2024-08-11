import React from 'react';
import { Paper, Title, Box, ScrollArea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconDevices2, IconDeviceMobile } from '@tabler/icons-react';
import { List, arrayMove } from 'react-movable';
import styles from './DataBlock.module.css';
import DataItem from '../DataItem/DataItem';
import AddItemButton from '../AddItemButton/AddItemButton';
import config from '../config.json';
import { addItem, removeItem, reorderItems } from '../../../redux/actions/experienceListActions';

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

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const reorderedItems = arrayMove(currentItems, oldIndex, newIndex);
    dispatch(reorderItems(blockType, reorderedItems));
  };

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
        <AddItemButton onAddItem={handleAddItem} items={config.items} blockType={blockType} />
      </div>
      <ScrollArea style={{ height: '530px' }} offsetScrollbars scrollbarSize={4}>
        <Box p="md" className={styles.content}>
          <List
            values={currentItems}
            onChange={({ oldIndex, newIndex }) => handleSortEnd({ oldIndex, newIndex })}
            lockVertically
            renderList={({ children, props }) => <div {...props}>{children}</div>}
            renderItem={({ value, props, index }) => (
              <div
                {...props}
                key={value.id}
                onPointerDown={(event) => {
                  const isStar = event.target.closest('.is-favorite');
                  if (isStar) {
                    event.preventDefault(); // Предотвращаем драг
                    event.stopPropagation(); // Останавливаем распространение события
                  }
                }}
              >
                <DataItem 
                  title={value.title} 
                  icon={value.icon}  
                  options={config.options}
                  defaultOptions={value.options}
                  onRemove={() => handleRemoveItem(value.id)} 
                  blockType={blockType}
                  itemId={value.id}
                />
              </div>
            )}
          />
        </Box>
      </ScrollArea>
    </Paper>
  );
};

export default DataBlock;
