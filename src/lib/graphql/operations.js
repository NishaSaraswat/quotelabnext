import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
    signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myprofile {
      _id
      firstName
      lastName
      email
      quotes {
        name
        by
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      quotes {
        name
        by
      }
    }
  }
`;

export const GET_ALL_QUOTES = gql`
  query GetAllQuotes {
    quotes {
      name
      by {
        _id
        firstName
      }
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation CreateQuote($name: String!) {
    createQuote(name: $name)
  }
`;
