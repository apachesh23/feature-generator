import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Stack, JsonInput, Group, Text, ScrollArea, Button, CopyButton, ActionIcon, Tooltip, rem } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';
import { resetItems } from '../../../redux/actions/experienceListActions';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import config from '../config.json';

const DataContainerOutput = ({ title }) => {
  const dispatch = useDispatch();
  const desktopItems = useSelector((state) => state.experienceList.desktopItems || []);
  const mobileItems = useSelector((state) => state.experienceList.mobileItems || []);
  const desktopActiveExperience = useSelector((state) => state.experienceList.desktopActiveExperience);
  const mobileActiveExperience = useSelector((state) => state.experienceList.mobileActiveExperience);

  const formatItems = (items, activeExperience) => {
    if (!items || !Array.isArray(items)) {
      return null;
    }

    const availableExperiences = items.map((item) => {
      const configItem = config.items.find(configItem => configItem.id === item.id);
      return configItem ? configItem.json_name : item.id;
    });

    const availableModes = items.reduce((acc, item) => {
      const configItem = config.items.find(configItem => configItem.id === item.id);
      const jsonName = configItem ? configItem.json_name : item.id;
      
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        acc[jsonName] = item.selectedOptions;
      }
      return acc;
    }, {});

    const formatted = {};

    if (availableExperiences.length > 0) {
      formatted.availableExperiences = availableExperiences;
    }

    if (Object.keys(availableModes).length > 0) {
      formatted.availableModes = availableModes;
    }

    if (activeExperience) {
      const activeConfigItem = config.items.find(configItem => configItem.id === activeExperience);
      formatted.activeExperience = activeConfigItem ? activeConfigItem.json_name : activeExperience;
    }

    return Object.keys(formatted).length > 0 ? formatted : null;
  };

  const data = formatItems(desktopItems, desktopActiveExperience);
  const mobileData = formatItems(mobileItems, mobileActiveExperience);

  const jsonValue = JSON.stringify(
    {
      ...(data && { data }),
      ...(mobileData && { mobileData }),
    },
    null,
    2
  );

  const IconComponent = TablerIcons.IconClipboardList;

  const handleReset = () => {
    dispatch(resetItems());
  };

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
          <Group spacing="xs" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <CopyButton value={jsonValue} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip color="blue" label={copied ? 'Copied' : 'Copy'} withArrow position="top" openDelay={200} transitionProps={{ transition: 'pop', duration: 200 }}>
                  <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
            <Tooltip color="blue" openDelay={200} label="Reset all" withArrow position="top" transitionProps={{ transition: 'pop', duration: 200 }}>
              <Button onClick={handleReset} color="red" variant="outline" size="xs">
                Reset
              </Button>
            </Tooltip>
          </Group>
        </Group>
        <ScrollArea offsetScrollbars scrollbarSize={4} style={{ height: 660 }}>
          <JsonInput
            value={jsonValue}
            readOnly
            formatOnBlur
            autosize
            minRows={1}
            // maxRows={20}
          />
        </ScrollArea>
      </Stack>
    </Paper>
  );
};

export default DataContainerOutput;
