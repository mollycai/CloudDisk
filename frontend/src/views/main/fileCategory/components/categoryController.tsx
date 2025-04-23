import { Flex, Tag } from 'antd';
import React, { useEffect } from 'react';
import { CategoryControllerProps, TagItem } from '../types';

const CategoryController: React.FC<CategoryControllerProps> = ({ tagsList, selectedTags, handleChange }) => {
  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  return (
    <Flex gap={10} wrap align="center">
      <span className="mr-4 text-lg font-semibold">分类</span>
      {tagsList.map((tag: TagItem) => (
        <Tag.CheckableTag
          className={`text-sm ${selectedTags.includes(tag.id) ? '' : 'bg-gray-100'}`}
          key={tag.id}
          checked={selectedTags.includes(tag.id)}
          onChange={(checked) => handleChange(tag.id, checked)}
        >
          {tag.name}
        </Tag.CheckableTag>
      ))}
    </Flex>
  );
};

export default CategoryController;
