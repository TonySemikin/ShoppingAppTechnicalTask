import { Avatar, List } from 'antd';
import React from 'react';
import { ICategory } from '../queries/categories.query';
import { faker } from '@faker-js/faker';
import './scss/Category.scss';

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
  <List.Item
    onClick={() => selectCategory(category.id)}
    className={category.id === selectedCategoryId ? 'selected' : ''}>
    <List.Item.Meta
      avatar={<Avatar src={faker.image.abstract(250, 250, true)} />}
      title={category.name}
      description={category.description}
    />
  </List.Item>
);

export default Category;
