import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $bitcoin: Int!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      bitcoin: $bitcoin
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation Mutation($firstName: String, $lastName: String, $bitcoin: Int, $email: String) {
  updateUser(firstName: $firstName, lastName: $lastName, bitcoin: $bitcoin, email: $email) {
    _id
    firstName
    lastName
    email
    bitcoin
  }
}
  `;

export const UPDATE_PRODUCT = gql`
mutation Mutation($inventory: Int, $id: ID){
  updateProduct(_id:$id, quantity:$inventory){
    quantity
  }
}`  
