import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`

export const ADMIN_LOGIN_MUTATION = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      user {
        _id
        isAdmin
      }
    }
  }
`;


export const ADD_USER_MUTATION = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        properties {
          _id
          name
          address
          images
          night_cost
          isAvailable
          room
          house
          description
        }
      }
    }
  }
`;


export const SIGNUP_ADMIN = gql`
  mutation SignupAdmin($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signupAdmin(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        isAdmin
      }
    }
  }
`;

export const GET_PROPERTIES = gql`
  query {
    properties {
      _id
      name
      address
      user_id
      images
      night_cost
      isAvailable
      startDate
      endDate
      description
    }
  }
`;

export const GET_PROPERTY = gql`
  query GetProperty($propertyId: ID!) {
    property(_id: $propertyId) {
      _id
      name
      address
      user_id
      images
      night_cost
      isAvailable
      room
      house
      max_guests
      bed_number
      bath_number
      startDate
      endDate
      location {
        type
        coordinates
      }
      description
    }
  }
`;


export const GET_PROPERTIES_LOC = gql`
  query {
    properties {
      location {
        coordinates
      }
    }
  }
`;


export const ADD_PROPERTY = gql`
mutation AddProperty($user_id: ID!, $name: String!, $images: [String!]!, $night_cost: Float!, $isAvailable: Boolean!,$startDate:String!,$endDate:String!, $room: Boolean!, $house: Boolean!, $max_guests: Int!, $bed_number: Int!, $bath_number: Int!, $location: LocationInput!, $address: String!, $description: String!) {
  addProperty(user_id: $user_id, name: $name, images: $images, night_cost: $night_cost, isAvailable: $isAvailable,startDate:$startDate,endDate:$endDate, room: $room, house: $house, max_guests: $max_guests, bed_number: $bed_number, bath_number: $bath_number, location: $location, address: $address, description: $description) {
    _id
    user_id
    name
    images
    night_cost
    isAvailable
    room
    house
    max_guests
    bed_number
    bath_number
    startDate
    endDate
    location {
      type
      coordinates
    }
    address
    description
  }
}


`;


export const USER_PROPERTIES_QUERY = gql`
  query UserProperties($user_id: ID!) {
    userProperties(user_id: $user_id) {
      _id
      images
      name
      night_cost
      isAvailable
      room
      description
      house
      max_guests
      bed_number
    }
  }
`;


export const DELETE_PROPERTY = gql`
mutation DeleteProperty($_id: ID!) {
  deleteProperty(_id: $_id) {
    _id
    name
  }
}
`;


export const UPDATE_PROPERTY_MUTATION = gql`
  mutation UpdateProperty(
    $_id: ID!
    $images: [String]!
    $name: String!
    $address: String!
    $night_cost: Float!
    $max_guests: Int!
    $bed_number: Int!
    $bath_number: Int!
    $isAvailable:Boolean!
    $location: LocationInput!
    $description: String!
  ) {
    updateProperty(
      _id: $_id
      images: $images
      name: $name
      address: $address
      night_cost: $night_cost
      isAvailable:$isAvailable
      max_guests: $max_guests
      bed_number: $bed_number
      bath_number: $bath_number
      location: $location
      description: $description
    ) {
      _id
      name
      address
      night_cost
      max_guests
      bed_number
      bath_number
      location {
        coordinates
      }
      description
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
mutation createCheckoutSession($propertyId: ID!, $nights: Int!) {
  createCheckoutSession(propertyId: $propertyId, nights: $nights) {
    id
    url
  }
}

`