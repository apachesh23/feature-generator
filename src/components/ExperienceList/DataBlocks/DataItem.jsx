import React, { useState, useRef } from 'react';
import * as TablerIcons from '@tabler/icons-react';
import { Card, Text, Checkbox, Group, CloseButton, ActionIcon, Box, Accordion, Tooltip, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
    setOpened((prev) => !prev);
  };

  const handleMouseLeaveAccordion = () => {
    setOpened(false);
  };

  const renderOptionWithTooltip = (option) => {
    const [popoverOpened, { open, close }] = useDisclosure(false);
  
    return (
      <Group key={option} spacing="xs" style={{ marginBottom: '8px', justifyContent: 'space-between' }}>
        <Checkbox
          label={option}
          size="xs"
          checked={activeOptions.includes(option)}
          onChange={(event) => handleCheckboxChange(option, event.currentTarget.checked)}
          style={{ flex: 1 }}
        />
        <Popover
          width={200}
          position="right"
          offset={10}
          withArrow
          shadow="md"
          opened={popoverOpened}
        >
          <Popover.Target>
            <ActionIcon
              size="sm"
              radius="xl"
              variant="light"
              color="yellow"
              style={{ marginLeft: '8px', transition: 'background-color 0.3s ease' }}
              onMouseEnter={(e) => {
                open();
                e.currentTarget.style.backgroundColor = '#FFE9B2';
              }}
              onMouseLeave={(e) => {
                close();
                e.currentTarget.style.backgroundColor = '#FEF7E6';
              }}
            >
              ?
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown style={{ pointerEvents: 'none' }}>
            <Text size="xs">{config.explanations[option]}</Text>
          </Popover.Dropdown>
        </Popover>
      </Group>
    );
  };
  
  const renderActiveCheckboxes = () => {
    return activeOptions.map(renderOptionWithTooltip);
  };

  const renderInactiveCheckboxes = () => {
    return inactiveOptions.map(renderOptionWithTooltip);
  };

  return (
    <Card
      shadow="sm"
      withBorder
      style={{
        color: '#332C2C',
        borderColor: isActive ? '#228BE6' : '#E9E9E9',
        borderWidth: isActive ? '1px' : '1px',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Section>
        <Group position="apart" style={{ borderBottom: '1px solid #E9E9E9', padding: '16px 16px', width: '100%', marginBottom: '8px' }}>
          <Tooltip color="blue" openDelay={200} label="Active Experience" withArrow position="top" transitionProps={{ transition: 'pop', duration: 200 }}>
            <ActionIcon
              color={isActive ? 'orange' : 'gray'}
              variant="transparent"
              onClick={onToggleActive}
            >
              <StarIcon size={20} />
            </ActionIcon>
          </Tooltip>

          <Group style={{ color: '#228BE6' }}>
            {IconComponent && <IconComponent size={22} stroke={1} />}
            <Text weight={500} size="sm" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              {title}
            </Text>
          </Group>

          {isHovered && (
            <Tooltip color="blue" openDelay={200} label="Remove item" withArrow position="top" transitionProps={{ transition: 'pop', duration: 200 }}>
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
