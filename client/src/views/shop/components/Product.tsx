import { Avatar, Button, InputNumber, List, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { IProduct } from '../queries/products.query';
import { ICartItem } from '../../cart/queries/cart.query';
import { faker } from '@faker-js/faker';

interface ProductProps {
  cartItem: ICartItem | null;
  product: IProduct;
  index: number;
  onAddToCart: (quantity: number) => void;
  onRemoveFromCart: () => void;
  errorCreateCart: boolean;
  errorAddItemToCart: boolean;
  errorRemoveItemFromCart: boolean;
}

const Product: React.FC<ProductProps> = ({
  cartItem,
  product,
  onAddToCart,
  onRemoveFromCart,
  errorCreateCart,
  errorAddItemToCart,
  errorRemoveItemFromCart,
}) => {
  //*** LOCAL STATE ***//

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingRemoveFromCart, setLoadingRemoveFromCart] = useState(false);

  //*** HANDLERS ***//

  const handleQuantityChange = (value: number | null) => {
    if (value != null) setSelectedQuantity(value);
  };

  const handleAddToCart = () => {
    setLoadingAddToCart(true);
    onAddToCart(selectedQuantity);
  };

  const handleRemoveFromCart = () => {
    setLoadingRemoveFromCart(true);
    onRemoveFromCart();
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (cartItem) {
      setSelectedQuantity(cartItem.quantity);
    }

    if (cartItem && loadingAddToCart) {
      setLoadingAddToCart(false);
    }

    if (!cartItem && loadingRemoveFromCart) {
      setLoadingRemoveFromCart(false);
    }
  }, [cartItem, loadingAddToCart, loadingRemoveFromCart]);

  useEffect(() => {
    if (errorCreateCart || errorAddItemToCart) {
      setLoadingAddToCart(false);
    }

    if (errorRemoveItemFromCart) {
      setLoadingRemoveFromCart(false);
    }
  }, [errorCreateCart, errorAddItemToCart, errorRemoveItemFromCart]);

  return (
    <>
      <div>
        {product.id}
        <List.Item.Meta
          avatar={<Avatar src={faker.image.food(250, 250, true)} />}
          title={product.name}
          description={product.description}
        />
        <span>{product.price}</span>
      </div>
      {loadingRemoveFromCart && <Spin />}
      <InputNumber
        disabled={!!cartItem}
        min={1}
        value={selectedQuantity}
        onChange={handleQuantityChange}
      />
      <Button
        disabled={!!cartItem}
        loading={loadingAddToCart}
        type="primary"
        onClick={handleAddToCart}>
        {cartItem ? 'Added To Cart' : 'Add To Cart'}
      </Button>
      {cartItem && <DeleteOutlined onClick={handleRemoveFromCart} />}
    </>
  );
};

export default Product;
