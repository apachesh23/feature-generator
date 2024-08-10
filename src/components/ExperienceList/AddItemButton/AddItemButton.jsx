import React from 'react';
import { Menu, Button } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';  // Импортируем все иконки

const AddItemButton = ({ onAddItem, items }) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs">Add Item</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item) => {
          const IconComponent = TablerIcons[item.icon];
          return (
            <Menu.Item
              key={item.id}
              leftSection={IconComponent ? <IconComponent size={14} /> : null}
              onClick={() => onAddItem(item.id)}
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
