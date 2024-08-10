import React, { useState, useRef, useEffect } from 'react';
import { Accordion, Paper, Checkbox, Group, Text, Box, CloseButton } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateItemOptions } from '../../../redux/actions/experienceListActions';

const DataItem = ({ title, icon, options, defaultOptions = [], onRemove, blockType, itemId }) => {
  const dispatch = useDispatch();

  // Инициализируем активные параметры из defaultOptions
  const [checkedItems, setCheckedItems] = useState(
    options.reduce((acc, option) => {
      acc[option] = defaultOptions[option] || false;
      return acc;
    }, {})
  );

  const [opened, setOpened] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const accordionRef = useRef(null);

  // Логирование изменений состояния checkedItems
  useEffect(() => {
    console.log('DataItem: dispatching updateItemOptions with:', { blockType, itemId, checkedItems });
    if (blockType && itemId) {
      dispatch(updateItemOptions(blockType, itemId, checkedItems));
    }
  }, [checkedItems, blockType, itemId, dispatch]);

  const IconComponent = TablerIcons[icon];

  const handleToggleAccordion = () => {
    setOpened((prev) => !prev);
  };

  const handleMouseLeaveAccordion = (event) => {
    const relatedTarget = event.relatedTarget;
    if (
      accordionRef.current &&
      relatedTarget instanceof Node &&
      !accordionRef.current.contains(relatedTarget)
    ) {
      setOpened(false);
    }
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const renderActiveCheckboxes = () => {
    return Object.keys(checkedItems)
      .filter((item) => checkedItems[item]) // Отображаем только активные параметры
      .map((item, index) => (
        <Checkbox
          key={index}
          label={item}
          checked={true}
          onChange={() => handleCheckboxChange(item)}
          style={{ marginBottom: '8px' }}
        />
      ));
  };

  const renderInactiveCheckboxes = () => {
    return options
      .filter((item) => !checkedItems[item]) // Отображаем только неактивные параметры
      .map((item, index) => (
        <Checkbox
          key={index}
          label={item}
          checked={false}
          onChange={() => handleCheckboxChange(item)}
          style={{ marginBottom: '8px' }}
        />
      ));
  };

  return (
    <Paper 
      shadow="xs" 
      padding="md" 
      style={{ marginBottom: '10px' }} 
      onMouseEnter={() => setShowCloseButton(true)} 
      onMouseLeave={() => setShowCloseButton(false)}
    >
      <Group 
        position="apart" 
        style={{ 
          padding: '12px 16px', 
          borderBottom: '1px solid #e0e0e0',
          position: 'relative'
        }}
      >
        <Group>
          {IconComponent && <IconComponent size={24} />} {/* Рендер иконки из пропсов */}
          <Text weight={700}>{title}</Text> {/* Жирный текст */}
        </Group>
        {showCloseButton && (
          <CloseButton 
            onClick={onRemove} 
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} 
          />
        )}
      </Group>

      <Box 
        style={{ 
          padding: '8px 16px', 
          borderRadius: '4px'
        }}
      >
        <Text size="xs" weight={500} style={{ marginBottom: '8px' }}>
          Active parameters
        </Text>
        {renderActiveCheckboxes()}
      </Box>

      <div ref={accordionRef} onMouseLeave={handleMouseLeaveAccordion}>
        <Accordion value={opened ? 'addMore' : null} variant="contained">
          <Accordion.Item value="addMore">
            <Accordion.Control 
              onClick={handleToggleAccordion} 
              style={{ textAlign: 'center', width: '100%', textTransform: 'uppercase' }}
            >
              <Text size="xs" style={{ width: '100%' }}>
                {opened ? 'Less' : 'Add more'}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              {renderInactiveCheckboxes()}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </Paper>
  );
};

export default DataItem;
