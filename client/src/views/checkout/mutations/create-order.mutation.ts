import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      status
      cartId
      deliveryAddress {
        shortDescription
      }
      items {
        productId
        productName
        quantity
        total
      }
      total
    }
  }
`;
