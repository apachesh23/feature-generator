import React, { useState } from 'react';
import { Menu, Button } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import { useSelector } from 'react-redux';

const AddItemButton = ({ onAddItem, items, blockType }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Проверяем, что blockType передан и определен
  if (!blockType) {
    console.error('blockType is not defined or passed incorrectly.');
    return null;
  }

  const currentItems = useSelector((state) => state.experienceList[blockType]);

  // Логируем текущие элементы для проверки
  console.log('AddItemButton: currentItems in block:', currentItems);

  const showOverlay = () => setOverlayVisible(true);
  const hideOverlay = () => setOverlayVisible(false);

  return (
    <>
      {/* Оверлей */}
      {overlayVisible && <div style={overlayStyles} onClick={hideOverlay}></div>}

      <Menu
        shadow="md"
        width={200}
        transitionProps={{ transition: 'pop', duration: 300 }}
        onOpen={showOverlay}
        onClose={hideOverlay}
      >
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
                leftSection={IconComponent ? <IconComponent size={22} stroke={1} style={{ color: 'black' }} /> : null}
                onClick={() => onAddItem(item.id)}
                disabled={isDisabled}  // Отключаем пункт меню, если элемент уже добавлен
              >
                {item.title}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

// Стили для оверлея
const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1, // Убедитесь, что оверлей находится над всеми элементами
};

export default AddItemButton;
