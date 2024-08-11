import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Title } from '@mantine/core';
import { IconClipboardList } from '@tabler/icons-react';
import { JsonInput } from '@mantine/core';
import styles from './DataBlock.module.css';
import { updateItemOptions, toggleFavorite } from '../../../redux/actions/experienceListActions';

const DataOutput = ({ title }) => {
  const dispatch = useDispatch();
  const desktopItems = useSelector((state) => state.experienceList.desktopItems);
  const mobileItems = useSelector((state) => state.experienceList.mobileItems);

  const [jsonValue, setJsonValue] = useState('');

  useEffect(() => {
    const formatData = (items) => {
      const availableExperiences = items.map(item => item.title);
      const availableModes = items.reduce((acc, item) => {
        const activeModes = Object.keys(item.options)
          .filter(option => option !== 'isFavorite' && item.options[option]); 
        if (activeModes.length > 0) {
          acc[item.title] = activeModes;
        }
        return acc;
      }, {});
      const activeExperience = items.find(item => item.isFavorite)?.title || undefined;

      const formattedData = {
        availableExperiences: availableExperiences.length > 0 ? availableExperiences : undefined,
        availableModes: Object.keys(availableModes).length > 0 ? availableModes : undefined,
        activeExperience: activeExperience || undefined,
      };

      return Object.fromEntries(Object.entries(formattedData).filter(([_, v]) => v !== undefined));
    };

    const data = {
      data: formatData(desktopItems),
      mobileData: formatData(mobileItems),
    };

    setJsonValue(JSON.stringify(data, null, 2));
  }, [desktopItems, mobileItems]);

  const handleJsonChange = (value) => {
    setJsonValue(value);
  };

  const handleJsonBlur = () => {
    try {
        const parsedData = JSON.parse(jsonValue);

        console.log('DataOutput: Parsed JSON data:', parsedData);

        if (parsedData.data) {
            console.log('DataOutput: Updating desktopItems');
            updateDataBlock(parsedData.data, 'desktopItems');
        }

        if (parsedData.mobileData) {
            console.log('DataOutput: Updating mobileItems');
            updateDataBlock(parsedData.mobileData, 'mobileItems');
        }
    } catch (error) {
        console.error("Invalid JSON format", error);
    }
};

const updateDataBlock = (dataBlock, blockType) => {
    const items = blockType === 'desktopItems' ? desktopItems : mobileItems;

    items.forEach(item => {
        const isActiveExperience = dataBlock.activeExperience === item.title;
        const modes = dataBlock.availableModes?.[item.title] || [];

        const newOptions = Object.keys(item.options).reduce((acc, option) => {
            acc[option] = modes.includes(option);
            return acc;
        }, {});

        console.log(`DataOutput: Updating item ${item.id} in ${blockType} with new options:`, newOptions);

        dispatch(updateItemOptions(blockType, item.id, newOptions));

        if (isActiveExperience) {
            dispatch(toggleFavorite(blockType, item.id));
        }
    });
};


  return (
    <Paper className={styles.dataBlock}>
      <div className={styles.header}>
        <Title 
          order={6} 
          weight={400} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Roboto Mono, monospace' }}
        >
          <IconClipboardList size={20} stroke={1} />
          {title}
        </Title>
      </div>
      <div style={{ padding: '10px' }}>
        <JsonInput
          value={jsonValue}
          onChange={handleJsonChange}
          onBlur={handleJsonBlur}
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={10}
          maxRows={20}
          style={{ fontFamily: 'monospace', fontSize: '12px' }}
        />
      </div>
    </Paper>
  );
};

export default DataOutput;
