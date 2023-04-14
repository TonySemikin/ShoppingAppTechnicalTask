import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface CartIconProps {
  handleClick(): void;
}

const CartIcon: React.FC<CartIconProps> = ({ handleClick }) => (
  <ShoppingCartOutlined
    onClick={handleClick}
    style={{ fontSize: 26, marginRight: 20 }}
  />
);

export default CartIcon;
