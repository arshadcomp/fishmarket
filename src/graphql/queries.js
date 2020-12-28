/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      image
      price
      unit
      stock
      orders {
        items {
          id
          userID
          productID
          status
          quantity
          amount
          time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        price
        unit
        stock
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      userID
      productID
      status
      quantity
      amount
      time
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        productID
        status
        quantity
        amount
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byStatusByUser = /* GraphQL */ `
  query ByStatusByUser(
    $status: String
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byStatusByUser(
      status: $status
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        productID
        status
        quantity
        amount
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byStatusByUserByTime = /* GraphQL */ `
  query ByStatusByUserByTime(
    $status: String
    $userIDTime: ModelOrderByStatusByUserByTimeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byStatusByUserByTime(
      status: $status
      userIDTime: $userIDTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        productID
        status
        quantity
        amount
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUserByTime = /* GraphQL */ `
  query ByUserByTime(
    $userID: ID
    $time: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUserByTime(
      userID: $userID
      time: $time
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        productID
        status
        quantity
        amount
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byProduct = /* GraphQL */ `
  query ByProduct(
    $productID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byProduct(
      productID: $productID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        productID
        status
        quantity
        amount
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
