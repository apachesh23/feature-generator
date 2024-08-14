// src/components/HelperItem.jsx
import React from 'react';
import { Card, Image, Text } from '@mantine/core';

const HelperItem = ({ image, description }) => {
  return (
    <Card shadow="sm" padding="md">
      {image && <Image src={image} alt="Helper image" />}
      <Text size="sm" mt="md">
        {description}
      </Text>
    </Card>
  );
};

export default HelperItem;

