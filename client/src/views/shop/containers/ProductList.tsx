import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Empty, List, Pagination, Skeleton } from 'antd';
import { GET_PRODUCTS, IProduct } from '../queries/products.query';
import Product from '../components/Product';
import { useShoppingCart } from '../../cart/contexts/ShoppingCartContext';
import { ICart } from '../../cart/queries/cart.query';

interface ProductListProps {
  selectedCategory: string;
}

const PAGE_SIZE_OPTIONS = [5, 10];

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
  //*** LOCAL STATE ***//

  const [query, setQuery] = useState({ from: 1, to: 6, size: 5, step: 1 });

  //*** CONTEXTS ***//

  const {
    cart,
    errorCreateCart,
    errorAddItemToCart,
    errorRemoveItemFromCart,
    addToCart,
    removeFromCart,
  } = useShoppingCart();

  //*** HOOKS ***//

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  //*** GRAPHQL ***//

  const { loading, error, data } = useQuery<{
    productsByCategory: { products: IProduct[]; totalCount: number };
  }>(GET_PRODUCTS, {
    variables: {
      filter: { categoryId: selectedCategory, from: query.from, to: query.to },
    },
  });

  //*** HELPER FUNCTIONS ***//

  const parseQueryParams = () => {
    const fromParam = searchParamsRef.current.get('from');
    const sizeParam = searchParamsRef.current.get('size');

    const from = fromParam ? parseInt(fromParam) : 1;
    const sizeProvided = sizeParam ? parseInt(sizeParam) : 5;
    const size = PAGE_SIZE_OPTIONS.includes(sizeProvided)
      ? sizeProvided
      : PAGE_SIZE_OPTIONS[0];

    return { from, size };
  };

  const findProductInCart = (cart: ICart | null, product: IProduct) => {
    if (!cart || cart.items.length === 0) return null;

    return cart.items.find((i) => i.productId === product.id) ?? null;
  };

  //*** HANDLERS ***//

  const onAddToCart = (productId: string, quantity: number) => {
    addToCart(productId, quantity);
  };

  const onRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const onPaginationChange = (step: number, size: number) => {
    const from = (step - 1) * size + 1;
    const to = from + size;

    setQuery({ from, to, step, size });
    navigate({
      search: createSearchParams({
        categoryId: selectedCategory,
        from: from.toString(),
        size: size.toString(),
      }).toString(),
    });
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (selectedCategory) {
      const { from, size } = parseQueryParams();

      const start = Math.ceil(from / size);

      navigate({
        search: createSearchParams({
          categoryId: selectedCategory,
          from: from.toString(),
          size: size.toString(),
        }).toString(),
      });

      onPaginationChange(start, query.size);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  if (!selectedCategory || loading) return <Skeleton active />;
  if (error)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={'Error occurred'}
      />
    );

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data?.productsByCategory.products}
        renderItem={(product, index) => (
          <List.Item>
            <Product
              product={product}
              cartItem={findProductInCart(cart, product)}
              key={product.id}
              index={index}
              onAddToCart={(quantity: number) =>
                onAddToCart(product.id, quantity)
              }
              onRemoveFromCart={() => onRemoveFromCart(product.id)}
              errorCreateCart={!!errorCreateCart}
              errorAddItemToCart={!!errorAddItemToCart}
              errorRemoveItemFromCart={!!errorRemoveItemFromCart}
            />
          </List.Item>
        )}
      />
      {!loading && data?.productsByCategory.totalCount && (
        <Pagination
          showSizeChanger
          onChange={onPaginationChange}
          defaultCurrent={query.step}
          defaultPageSize={query.size}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          total={data?.productsByCategory.totalCount ?? 0}
        />
      )}
    </>
  );
};

export default ProductList;
