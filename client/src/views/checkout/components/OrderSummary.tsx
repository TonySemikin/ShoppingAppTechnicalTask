import { Button, List } from 'antd';
import React from 'react';
import OrderItem from './OrderItem';
import { IOrderItem } from '../queries/order.query';
import { ICartItem } from '../../cart/queries/cart.query';

interface OrderSummaryProps {
  items: IOrderItem[] | ICartItem[];
  total: number;
  isActionsShown: boolean;
  proceed: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total,
  isActionsShown,
  proceed,
}) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item>
            <OrderItem item={item} key={item.productId} index={index} />
          </List.Item>
        )}
      />
      <span>Order Total: {total}</span>
      {isActionsShown && (
        <Button type="primary" htmlType="submit" onClick={proceed}>
          Provide delivery address
        </Button>
      )}
    </>
  );
};

export default OrderSummary;
