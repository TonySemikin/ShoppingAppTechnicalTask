import React from 'react';
import { Button, Form, Input } from 'antd';

interface UserFormProps {
  savedDeliveryAddress: { shortDescription: string } | undefined;
  inputDeliveryAddress: string;
  isActionsShown: boolean;
  createOrderLoading: boolean;
  onChange: (address: string) => void;
  proceed: () => void;
}

const DeliveryAddressForm: React.FC<UserFormProps> = ({
  savedDeliveryAddress,
  inputDeliveryAddress,
  isActionsShown,
  createOrderLoading,
  onChange,
  proceed,
}) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <>
      {savedDeliveryAddress ? (
        <>
          <h2>Your order will be delivered to:</h2>
          <p>{savedDeliveryAddress.shortDescription}</p>
        </>
      ) : (
        <>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onChange={handleChange}
            autoComplete="off">
            <Form.Item
              label="Delivery Address"
              name="address"
              rules={[
                {
                  required: true,
                  message:
                    'Please input your delivery address (can be anything)!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Form>
          {isActionsShown && (
            <Button
              disabled={!inputDeliveryAddress}
              loading={createOrderLoading}
              type="primary"
              htmlType="submit"
              onClick={proceed}>
              Select payment method
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default DeliveryAddressForm;
