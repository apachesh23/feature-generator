import React from 'react';
import { Menu, Button } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import { useSelector } from 'react-redux';

const AddItemButton = ({ onAddItem, items, blockType }) => {
  // Проверяем, что blockType передан и определен
  if (!blockType) {
    console.error('blockType is not defined or passed incorrectly.');
    return null;
  }

  const currentItems = useSelector((state) => state.experienceList[blockType]);

  // Логируем текущие элементы для проверки
  console.log('AddItemButton: currentItems in block:', currentItems);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs">Add Item</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item) => {
          const IconComponent = TablerIcons[item.icon];
          const isDisabled = currentItems?.some(currentItem => currentItem.id === item.id);

          return (
            <Menu.Item
              key={item.id}
              leftSection={IconComponent ? <IconComponent size={14} /> : null}
              onClick={() => onAddItem(item.id)}
              disabled={isDisabled}  // Отключаем пункт меню, если элемент уже добавлен
            >
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default AddItemButton;
