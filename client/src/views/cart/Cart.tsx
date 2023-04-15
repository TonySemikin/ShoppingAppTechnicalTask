import { Button, Empty, List } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from './contexts/ShoppingCartContext';
import CartItem from './components/CartItem';
import './Cart.scss';

interface CartProps {
  onSubmitted: () => void;
}

const Cart: React.FC<CartProps> = ({ onSubmitted }) => {
  //*** HOOKS ***//
  const { cart, removeFromCart } = useShoppingCart();
  const navigate = useNavigate();

  //*** HANDLERS ***//

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleProceedToCheckout = async () => {
    navigate('/checkout');
    onSubmitted();
  };

  return (
    <div className="cart">
      <List
        className="cart__list"
        itemLayout="horizontal"
        dataSource={cart?.items}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'Cart is empty'}
            />
          ),
        }}
        renderItem={(cartItem, index) => (
          <List.Item>
            <CartItem
              cartItem={cartItem}
              key={cartItem.productId}
              index={index}
              onRemoveFromCart={() => handleRemoveFromCart(cartItem.productId)}
            />
          </List.Item>
        )}
      />
      {cart?.items && cart?.items.length > 0 && (
        <div className="cart__footer">
          <div className="cart__footer-total">
            <span>Cart Total: </span>
            <span className="cart__footer-total-currency">€</span>
            <span>{cart.total.toFixed(2)}</span>
          </div>
          <Button
            className="cart__footer-button"
            type="primary"
            htmlType="submit"
            onClick={handleProceedToCheckout}>
            Proceed To Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
