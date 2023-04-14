import { Button, Empty, List } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from './contexts/ShoppingCartContext';
import CartItem from './components/CartItem';

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
    <>
      <List
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
        <>
          <div>
            <span> Cart Total: {cart.total}</span>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleProceedToCheckout}>
            Proceed To Checkout
          </Button>
        </>
      )}
    </>
  );
};

export default Cart;
