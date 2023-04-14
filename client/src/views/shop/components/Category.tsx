import { Avatar, List } from 'antd';
import React from 'react';
import { ICategory } from '../queries/categories.query';
import { faker } from '@faker-js/faker';

interface CategoryProps {
  category: ICategory;
  selectedCategoryId: string;
  selectCategory: (id: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  selectedCategoryId,
  selectCategory,
}) => (
  <List.Item onClick={() => selectCategory(category.id)}>
    {category.id === selectedCategoryId && <span>Selected</span>}
    <List.Item.Meta
      avatar={<Avatar src={faker.image.food(250, 250, true)} />}
      title={category.name}
      description={category.description}
    />
  </List.Item>
);

export default Category;
