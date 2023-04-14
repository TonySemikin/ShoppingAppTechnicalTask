import { Avatar, List } from 'antd';
import { faker } from '@faker-js/faker';
import { IOrderItem } from '../queries/order.query';

interface OrderItemProps {
  index: number;
  item: IOrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ index, item }) => {
  return (
    <>
      <div>
        {item.productId}
        <List.Item.Meta
          avatar={<Avatar src={faker.image.food(250, 250, true)} />}
          title={item.productName}
        />
        <span>{item.quantity}</span>
      </div>
      <span> Quantity: {item.quantity}</span>
      <span> Total: {item.total}</span>
    </>
  );
};

export default OrderItem;
