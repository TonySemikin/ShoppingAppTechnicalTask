import React, { useState } from 'react';
import { Layout, Space } from 'antd';
import CategoryList from './containers/CategoryList';
import ProductList from './containers/ProductList';

const { Sider, Content } = Layout;

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const onCategorySelected = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Sider>
          <CategoryList onCategorySelected={onCategorySelected} />
        </Sider>
        <Content>
          <ProductList selectedCategory={selectedCategory} />
        </Content>
      </Layout>
    </Space>
  );
};

export default Shop;
