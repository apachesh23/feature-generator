// src/components/PageSelect.jsx
import React from 'react';
import { Select, Group, rem } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconBook, IconBrush, IconCheck, IconComponents } from '@tabler/icons-react';

const icon = <IconComponents style={{ width: rem(16), height: rem(16) }} />;

const iconProps = {
  stroke: 1.5,
  color: 'currentColor',
  opacity: 0.6,
  size: 18,
};

const icons = {
  ExperienceList: <IconBook {...iconProps} />,
  UX4: <IconBrush {...iconProps} />,
};

const renderSelectOption = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <IconCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />}
  </Group>
);

const PageSelect = () => {
  const dispatch = useDispatch();
  const selectedPage = useSelector((state) => state.page.selectedPage); // Учитываем структуру редюсера

  const handlePageChange = (value) => {
    dispatch({ type: 'SET_PAGE', payload: value });
  };

  return (
    <Select
      data={[
        { value: 'ExperienceList', label: 'Experience List' },
        { value: 'UX4', label: 'UX4' },
      ]}
      value={selectedPage}
      onChange={handlePageChange}
      allowDeselect={false}
      size="md"
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
      renderOption={renderSelectOption}
      leftSection={icon}
    />
  );
};

export default PageSelect;
