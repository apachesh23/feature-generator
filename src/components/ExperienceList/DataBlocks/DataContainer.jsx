// src/components/DataContainer.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Paper, Group, Text, ScrollArea } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import config from '../config.json';
import DataItem from './DataItem';
import { addItem, removeItem, toggleItemOption, toggleActiveExperience } from '../../../redux/actions/experienceListActions';
import AddItemButton from '../AddItemButton';

const DataContainer = ({ title, type }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) =>
    type === 'desktop' ? state.experienceList.desktopItems : state.experienceList.mobileItems
  );
  const activeExperience = useSelector((state) =>
    type === 'desktop' ? state.experienceList.desktopActiveExperience : state.experienceList.mobileActiveExperience
  );

  const icons = {
    desktop: TablerIcons.IconDevices2,
    mobile: TablerIcons.IconDeviceMobile,
    output: TablerIcons.IconClipboardList,
  };

  const IconComponent = icons[type];

  const handleAddItem = (itemId) => {
    const itemToAdd = config.items.find((item) => item.id === itemId);
    if (itemToAdd) {
      dispatch(addItem(itemToAdd, type));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId, type));
  };

  const handleToggleOption = (itemId, option, checked) => {
    dispatch(toggleItemOption(itemId, option, checked, type));
  };

  const handleToggleActive = (itemId) => {
    dispatch(toggleActiveExperience(itemId, type));
  };

  const addedItemIds = items.map(item => item.id);

  return (
    <Paper
      shadow="sm"
      padding="md"
      style={{ backgroundColor: '#F6F6F6', border: '1px solid #E9E9E9', height: 'calc(100vh - 200px)', overflow: 'hidden' }}
    >
      <Stack spacing="md">
        <Group
          position="apart"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '16px 20px',
            borderBottom: '1px solid #E9E9E9',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Group style={{ flexGrow: 1 }}>
            <IconComponent size={28} stroke={0.75} />
            <Text size="md" weight={500} style={{ color: '#332C2C', fontFamily: 'Roboto Mono, monospace' }}>
              {title}
            </Text>
          </Group>
          <Group style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <AddItemButton onAddItem={handleAddItem} addedItems={addedItemIds} />
          </Group>
        </Group>
        <ScrollArea offsetScrollbars scrollbarSize={4} style={{ height: 660 }}>
          <Stack spacing="md" p="md">
            {items.map((item) => (
              <DataItem
                key={item.id}
                id={item.id}
                title={item.title}
                icon={item.icon}
                defaultOptions={item.selectedOptions}
                isActive={activeExperience === item.id}
                onRemove={handleRemoveItem}
                onToggleOption={handleToggleOption}
                onToggleActive={() => handleToggleActive(item.id)}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Paper>
  );
};

export default DataContainer;
