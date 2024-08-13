import React, { useState, useRef } from 'react';
import * as TablerIcons from '@tabler/icons-react';
import { Card, Text, Checkbox, Stack, Group, CloseButton, ActionIcon, rem, Box, Accordion, Tooltip } from '@mantine/core';
import config from '../config.json';

const DataItem = ({ id, title, icon, defaultOptions = [], onRemove, onToggleOption, isActive, onToggleActive }) => {
  const [opened, setOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const accordionRef = useRef(null);

  const IconComponent = TablerIcons[icon];
  const StarIcon = isActive ? TablerIcons.IconStarFilled : TablerIcons.IconStar;

  const allOptions = config.options;
  const activeOptions = defaultOptions;
  const inactiveOptions = allOptions.filter(option => !activeOptions.includes(option));

  const handleCheckboxChange = (option, checked) => {
    onToggleOption(id, option, checked);
  };

  const handleToggleAccordion = () => {
    setOpened(!opened);
  };

  const handleMouseLeaveAccordion = () => {
    setOpened(false);
  };

  const renderActiveCheckboxes = () => {
    return activeOptions.map((option) => (
      <Checkbox
        key={option}
        label={option}
        size="xs"
        checked
        style={{ marginBottom: '8px' }}  // Отступ между чекбоксами
        onChange={(event) => handleCheckboxChange(option, event.currentTarget.checked)}
      />
    ));
  };

  const renderInactiveCheckboxes = () => {
    return inactiveOptions.map((option) => (
      <Checkbox
        key={option}
        label={option}
        size="xs"
        style={{ marginBottom: '8px' }}  // Отступ между чекбоксами
        onChange={(event) => handleCheckboxChange(option, event.currentTarget.checked)}
      />
    ));
  };

  return (
    <Card
      shadow="sm"
      withBorder
      style={{
        color: '#332C2C',
        borderColor: isActive ? '#228BE6' : '#E9E9E9',  // Синий бордер, если активен
        borderWidth: isActive ? '1px' : '1px',  // Увеличенный бордер, если активен
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Заголовок */}
      <Card.Section>
        <Group position="apart" style={{ borderBottom: '1px solid #E9E9E9', padding: '16px 16px', width: '100%', marginBottom: '8px' }}>
          {/* Кнопка активации режима Active Experience */}
          <Tooltip color="blue" openDelay={300} label="Active Experience" withArrow position="top">
            <ActionIcon
              color={isActive ? 'orange' : 'gray'}
              variant="transparent"
              onClick={onToggleActive}
            >
              <StarIcon size={20} />
            </ActionIcon>
          </Tooltip>

          {/* Иконка айтема и текст по центру */}
          {/* <Tooltip color="blue" openDelay={300} label="Remove item" withArrow position="top"></Tooltip> */}
          <Group style={{ color: '#228BE6' }}>
          
            {IconComponent && <IconComponent size={22} stroke={1} />}
            <Text weight={500} size="sm" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              {title}
            </Text>
          </Group>

          {/* Кнопка закрытия, видимая только при наведении */}
            {isHovered && (
              <Tooltip color="blue" openDelay={300} label="Remove item" withArrow position="top">
                <CloseButton
                  size="sm"
                  onClick={() => onRemove(id)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '16px',
                  }}
                />
              </Tooltip>

            )}
        </Group>
      </Card.Section>

      {/* Блок активных параметров */}
      <Card.Section>
        <Box
          className="no-drag"
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
          }}
        >
          {renderActiveCheckboxes()}
        </Box>
      </Card.Section>

      {/* Accordion с неактивными параметрами */}
      <Card.Section>
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
      </Card.Section>
    </Card>
  );
};

export default DataItem;
