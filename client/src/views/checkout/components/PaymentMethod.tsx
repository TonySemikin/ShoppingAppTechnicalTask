import { Button } from 'antd';
import React from 'react';

interface PaymentMethodProps {
  isActionsShown: boolean;
  proceedToPaymentLoading: boolean;
  proceed: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  isActionsShown,
  proceedToPaymentLoading,
  proceed,
}) => {
  return (
    <>
      <p>
        No worries, Tony & Jacando will cover all payments for you! So you can
        enjoy your limitless shopping!
      </p>

      {isActionsShown && (
        <Button
          loading={proceedToPaymentLoading}
          type="primary"
          htmlType="submit"
          onClick={proceed}>
          Proceed with Payment
        </Button>
      )}
    </>
  );
};

export default PaymentMethod;
