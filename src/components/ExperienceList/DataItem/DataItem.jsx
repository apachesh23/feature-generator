import React, { useState, useRef, useEffect } from 'react';
import { Accordion, Paper, Checkbox, Group, Text, Box, CloseButton, Tooltip } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemOptions, toggleFavorite } from '../../../redux/actions/experienceListActions';

const DataItem = ({ title, icon, options, defaultOptions = [], onRemove, blockType, itemId }) => {
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState(
    options.reduce((acc, option) => {
      acc[option] = defaultOptions[option] || false;
      return acc;
    }, {})
  );

  const [opened, setOpened] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const accordionRef = useRef(null);

  const isFavorite = useSelector((state) => {
    const items = blockType === 'desktopItems' ? state.experienceList.desktopItems : state.experienceList.mobileItems;
    const item = items.find(i => i.id === itemId);
    return item ? item.isFavorite : false;
  });

  useEffect(() => {
    dispatch(updateItemOptions(blockType, itemId, { ...checkedItems, isFavorite }));
  }, [checkedItems, isFavorite, blockType, itemId, dispatch]);

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

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(blockType, itemId));
  };

  const renderActiveCheckboxes = () => {
    return Object.keys(checkedItems)
      .filter((item) => checkedItems[item])
      .map((item, index) => (
        <Checkbox
          key={index}
          label={item}
          checked={true}
          size="xs"
          onChange={() => handleCheckboxChange(item)}
          style={{ marginBottom: '8px' }}
        />
      ));
  };

  const renderInactiveCheckboxes = () => {
    return options
      .filter((item) => !checkedItems[item])
      .map((item, index) => (
        <Checkbox
          key={index}
          label={item}
          checked={false}
          size="xs"
          onChange={() => handleCheckboxChange(item)}
          style={{ marginBottom: '8px' }}
        />
      ));
  };

  const StarIcon = isFavorite ? TablerIcons.IconStarFilled : TablerIcons.IconStar;
  const starColor = isFavorite ? 'orange' : 'gray';
  const borderColor = isFavorite ? '1px solid #228BE6' : '1px solid rgba(34, 139, 230, 0)';

  return (
    <Paper 
      shadow="xs" 
      padding="md" 
      style={{ 
        marginBottom: '10px',
        border: borderColor,  // Добавляем условный бордер
        transition: 'border 0.3s ease', // Добавляем анимацию для плавного изменения
        userSelect: 'none'
      }} 
      onMouseEnter={() => setShowCloseButton(true)} 
      onMouseLeave={() => setShowCloseButton(false)}
    >
      {/* Заголовок блока */}
      <Group 
        position="apart" 
        style={{ 
          padding: '12px 16px', 
          borderBottom: '1px solid #e0e0e0',
          position: 'relative',
        }}
      >
        {/* Звездочка (favorite) */}
        <Tooltip 
          label="Active Experience"
          color="blue"
          openDelay={300}
          transitionProps={{ transition: 'pop', duration: 300 }}
          >
          <StarIcon 
            size={18} 
            onClick={handleFavoriteToggle} 
            style={{ cursor: 'pointer', color: starColor, marginRight: 8 }} 
          />   
        </Tooltip>


        {/* Группа иконки и текста заголовка */}
        <Group style={{ flexGrow: 1 }}>
          {IconComponent && <IconComponent size={32} stroke={0.5} style={{ color: 'black' }} />}
          <Text size="sm" fw={700} style={{ fontFamily: 'Roboto Mono, monospace' }}>{title}</Text>
        </Group>

        {/* Кнопка закрытия */}
        {showCloseButton && (
          <CloseButton 
            onClick={onRemove}
            size={20}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'red' }} 
          />
        )}
      </Group>

      {/* Блок активных параметров */}
      <Box 
        style={{ 
          padding: '8px 16px', 
          borderRadius: '4px'
        }}
      >
        <Text size="xs" weight={500} style={{ marginBottom: '8px', color: 'gray' }}>
          Active parameters
        </Text>
          {renderActiveCheckboxes()}
      </Box>

      {/* Accordion с неактивными параметрами */}
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
