import React, { useState } from 'react';
import { Button, Menu, Overlay, Popover, Text } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import config from './config.json';
import { useDisclosure } from '@mantine/hooks';

const AddItemButton = ({ onAddItem, addedItems }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <Menu
        shadow="md"
        width={200}
        opened={menuOpened}
        onChange={setMenuOpened}
        transitionProps={{ transition: 'pop', duration: 200 }}
      >
        <Menu.Target>
          <Button size="xs">Add Item</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Select Item</Menu.Label>
          {config.items.map((item) => {
            const ItemIcon = TablerIcons[item.icon];
            const isDisabled = addedItems.includes(item.id);
            const [popoverOpened, { open, close }] = useDisclosure(false);

            return (
              <Popover
                key={item.id}
                width={200}
                position="right"
                offset={10}
                withArrow
                shadow="md"
                opened={popoverOpened}
              >
                <Popover.Target>
                  <Menu.Item
                    leftSection={<ItemIcon size={18} stroke={1} />}
                    onClick={() => !isDisabled && onAddItem(item.id)}
                    disabled={isDisabled}
                    onMouseEnter={open}
                    onMouseLeave={close}
                  >
                    {item.title}
                  </Menu.Item>
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                  <Text size="xs">
                    {item.description || 'No description available'}
                  </Text>
                </Popover.Dropdown>
              </Popover>
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
