import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { ICategory, GET_CATEGORIES } from '../queries/categories.query';
import { Empty, List, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Category from '../components/Category';

interface CategoryListProps {
  onCategorySelected: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategorySelected }) => {
  //*** LOCAL STATE ***//

  const [selectedCategory, setSelectedCategory] = useState('');

  //*** HOOKS ***//

  let [searchParams] = useSearchParams();

  //*** GRAPHQL ***//

  const { loading, error, data } = useQuery<{ categories: ICategory[] }>(
    GET_CATEGORIES,
  );

  //*** HANDLERS ***//

  const selectCategory = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      onCategorySelected(categoryId);
    },
    [onCategorySelected],
  );

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (data?.categories && data?.categories.length > 0 && !selectedCategory) {
      const categoryId = searchParams.get('categoryId');

      /**
       * @note setting selected category to one provided in the URL, but only if it has a valid ID
       */
      if (categoryId && data.categories.find((c) => c.id === categoryId)) {
        selectCategory(categoryId);
      } else {
        selectCategory(data.categories[0].id);
      }
    }
  }, [data, searchParams, selectCategory, selectedCategory]);

  if (loading) return <Skeleton active />;
  if (error)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={'Error occurred'}
      />
    );

  return (
    <List
      itemLayout="horizontal"
      dataSource={data?.categories}
      renderItem={(category) => (
        <Category
          category={category}
          selectCategory={selectCategory}
          selectedCategoryId={selectedCategory}
        />
      )}
    />
  );
};

export default CategoryList;
