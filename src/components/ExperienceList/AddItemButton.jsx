// src/components/AddItemButton.jsx
import React, { useState } from 'react';
import { Button, Menu, rem, Overlay } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import config from './config.json';

const AddItemButton = ({ onAddItem, addedItems }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <Menu
        shadow="md"
        width={200}
        opened={menuOpened}
        onChange={setMenuOpened}
      >
        <Menu.Target>
          <Button size="xs" >Add Item</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Select Item</Menu.Label>
          {config.items.map((item) => {
            const ItemIcon = TablerIcons[item.icon];
            const isDisabled = addedItems.includes(item.id);
            return (
              <Menu.Item
                key={item.id}
                leftSection={<ItemIcon size={14} />}
                onClick={() => !isDisabled && onAddItem(item.id)}
                disabled={isDisabled}
              >
                {item.title}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>

      {menuOpened && (
        <Overlay
          color="#000"
          opacity={0.5}
          onClick={() => setMenuOpened(false)}
          style={{ position: 'fixed', inset: 0 }}
        />
      )}
    </>
  );
};

export default AddItemButton;
