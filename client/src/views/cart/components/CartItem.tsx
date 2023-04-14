import { Avatar, List, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ICartItem } from '../queries/cart.query';
import { useEffect, useState } from 'react';

interface CartItemProps {
  index: number;
  cartItem: ICartItem;
  onRemoveFromCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  index,
  cartItem,
  onRemoveFromCart,
}) => {
  //*** HOOKS ***//

  const [loadingRemoveFromCart, setLoadingRemoveFromCart] = useState(false);

  //*** HANDLERS ***//

  const handleRemoveFromCart = () => {
    setLoadingRemoveFromCart(true);
    onRemoveFromCart();
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (!cartItem && loadingRemoveFromCart) {
      setLoadingRemoveFromCart(false);
    }
  }, [cartItem, loadingRemoveFromCart]);

  return (
    <>
      <div>
        {cartItem.productId}
        <List.Item.Meta
          avatar={
            <Avatar
              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
            />
          }
          title={cartItem.productName}
        />
        <span>{cartItem.quantity}</span>
      </div>
      <span> Quantity: {cartItem.quantity}</span>
      <span> Total: {cartItem.total}</span>
      {loadingRemoveFromCart && <Spin />}

      {cartItem && <DeleteOutlined onClick={handleRemoveFromCart} />}
    </>
  );
};

export default CartItem;
