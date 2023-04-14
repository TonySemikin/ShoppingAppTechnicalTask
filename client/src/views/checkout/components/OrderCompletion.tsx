import React from 'react';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { IOrderStatus } from '../queries/order.query';
import { Button } from 'antd';

interface OrderCompletionProps {
  status?: string;
  isActionsShown: boolean;
  backToShopping: () => void;
  proceedToOrder: () => void;
}

const OrderCompletionPending = () => (
  <>
    <InfoCircleOutlined />
    <span>Thank you!</span>
    <span>Awaiting Payment Confirmation for Your Order</span>
  </>
);

const OrderCompletion: React.FC<OrderCompletionProps> = ({
  status,
  isActionsShown,
  backToShopping,
  proceedToOrder,
}) => {
  return (
    <>
      {status === IOrderStatus.PAYMENT_PENDING && <OrderCompletionPending />}
      {status === IOrderStatus.COMPLETE && (
        <>
          <CheckCircleOutlined />
          <span>Thank you!</span>
          <span>Your Order is Complete.</span>
        </>
      )}
      {!status && <OrderCompletionPending />}
      <Button type="primary" htmlType="submit" onClick={backToShopping}>
        Back to shopping
      </Button>

      {isActionsShown && (
        <Button type="primary" htmlType="submit" onClick={proceedToOrder}>
          Track your order
        </Button>
      )}
    </>
  );
};

export default OrderCompletion;
