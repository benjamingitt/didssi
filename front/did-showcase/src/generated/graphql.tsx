/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Json: any;
};

/** Account (one DID = one account) */
export type Account = Node & {
  __typename?: 'Account';
  createdAt: Scalars['Date'];
  /** Decentralized ID, ex.: 978cae5ccb0048de4bf6c76ffba5c2686987fd72494137de8373a84e5f720063 */
  did: Scalars['String'];
  id: Scalars['Int'];
  sessions?: Maybe<Array<AccountSession>>;
  status: AccountStatus;
  updatedAt: Scalars['Date'];
};

/** Account session for authenticate user */
export type AccountSession = Node & {
  __typename?: 'AccountSession';
  account: Account;
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  expiresAt: Scalars['Date'];
  id: Scalars['Int'];
  ipAddr: Scalars['String'];
  updatedAt: Scalars['Date'];
  userAgent?: Maybe<UserAgent>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export type AuthResult = {
  __typename?: 'AuthResult';
  account: Account;
  token: Scalars['String'];
};

export type CostComplexity = {
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type GenerateEmailCodeResult = {
  __typename?: 'GenerateEmailCodeResult';
  expiresAt: Scalars['Date'];
  result: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Just test backend available. Return provided text */
  echo: Scalars['String'];
  /** Generate data to sign */
  loginGenerate: Scalars['String'];
  /** Auth method. Request for verify signed data */
  loginVerify: AuthResult;
  /** Logout. Required providing actual token in headers */
  logout: Scalars['Boolean'];
  vcCreateProofOfEthAddress: Vc;
  vcCreateProofOfFunfairAccount: Vc;
  vcCreateProofOfStateId: Vc;
  vcCreateProofOfTaxResidency: Vc;
  /** Request for generate one-time message to sign by user's wallet */
  vcCreateProofOfTonAddressGenerate: Scalars['String'];
  /** Check user's wallet signature and create Verifiable Claim in success case */
  vcCreateProofOfTonAddressVerify: Vc;
  vcCreateProofOfTwitterAccount: Vc;
  vcCreateProofOfUniswapAccount: Vc;
};


export type MutationEchoArgs = {
  text: Scalars['String'];
};


export type MutationLoginGenerateArgs = {
  did: Scalars['String'];
};


export type MutationLoginVerifyArgs = {
  did: Scalars['String'];
  signatureHex: Scalars['String'];
};


export type MutationLogoutArgs = {
  sessionIds?: Maybe<Array<Scalars['Int']>>;
};


export type MutationVcCreateProofOfTonAddressVerifyArgs = {
  signatureHex: Scalars['String'];
  walletAddress: Scalars['String'];
};

/** Abstract declaration of every database object */
export type Node = {
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  /** Request for getting account session info by provided token in headers */
  currentSession: AccountSession;
  /** Just test backend available. Return provided text */
  echo: Scalars['String'];
  /** Get service by id */
  service: Service;
  /** Get services ex.: TON Swap */
  services?: Maybe<Array<Service>>;
  /** Get Verifiable Claim template by id */
  vcTemplate: VcTemplate;
  /** Get Verifiable Claims template sections */
  vcTemplateSections?: Maybe<Array<VcTemplateSection>>;
  version?: Maybe<Scalars['String']>;
  /** Request for getting account info by provided token in headers */
  whoami: Account;
};


export type QueryEchoArgs = {
  text: Scalars['String'];
};


export type QueryServiceArgs = {
  id: Scalars['Int'];
};


export type QueryServicesArgs = {
  filter?: Maybe<ServicesFilter>;
};


export type QueryVcTemplateArgs = {
  id: Scalars['Int'];
};

/** Service that uses verifiable representation, ex.: TON Swap */
export type Service = Node & {
  __typename?: 'Service';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['Int'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  pros: Scalars['String'];
  updatedAt: Scalars['Date'];
  vcTemplates?: Maybe<Array<VcTemplate>>;
};

export type ServicesFilter = {
  vcTemplateId?: Maybe<Scalars['Int']>;
};

export type UserAgent = {
  __typename?: 'UserAgent';
  browser?: Maybe<UserAgentBrowser>;
  cpu?: Maybe<UserAgentCpu>;
  engine?: Maybe<UserAgentEngine>;
  os?: Maybe<UserAgentOs>;
  ua?: Maybe<Scalars['String']>;
};

export type UserAgentBrowser = {
  __typename?: 'UserAgentBrowser';
  major?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UserAgentCpu = {
  __typename?: 'UserAgentCpu';
  architecture?: Maybe<Scalars['String']>;
};

export type UserAgentEngine = {
  __typename?: 'UserAgentEngine';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UserAgentOs = {
  __typename?: 'UserAgentOs';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

/** Verifiable Claim */
export type Vc = Node & {
  __typename?: 'VC';
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  owner: Account;
  updatedAt: Scalars['Date'];
  value: Scalars['Json'];
  vcTemplate: VcTemplate;
};

/** Verifiable Claim Template, ex.: PROOF_OF_TON_ADDRESS */
export type VcTemplate = Node & {
  __typename?: 'VCTemplate';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['Int'];
  issuer: Scalars['String'];
  sections?: Maybe<Array<VcTemplateSection>>;
  services?: Maybe<Array<Service>>;
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
  vc?: Maybe<Vc>;
};

/** Verifiable Claim Template section, that can contain many templates inside */
export type VcTemplateSection = Node & {
  __typename?: 'VCTemplateSection';
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  vcTemplates?: Maybe<Array<VcTemplate>>;
};

/** Verifiable Claim template variants */
export enum VcTemplateType {
  ProofOfEthAddress = 'PROOF_OF_ETH_ADDRESS',
  ProofOfFunfairAccount = 'PROOF_OF_FUNFAIR_ACCOUNT',
  ProofOfStateId = 'PROOF_OF_STATE_ID',
  ProofOfTaxResidency = 'PROOF_OF_TAX_RESIDENCY',
  ProofOfTonAddress = 'PROOF_OF_TON_ADDRESS',
  ProofOfTwitterAccount = 'PROOF_OF_TWITTER_ACCOUNT',
  ProofOfUniswapAccount = 'PROOF_OF_UNISWAP_ACCOUNT'
}

export type MySomeQueryVariables = Exact<{
  some: Scalars['String'];
}>;


export type MySomeQuery = { __typename?: 'Query', echo: string };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoami: { __typename?: 'Account', did: string } };

export type CurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSessionQuery = { __typename?: 'Query', currentSession: { __typename?: 'AccountSession', id: number } };

export type ServicesQueryVariables = Exact<{
  vcTemplateId?: Maybe<Scalars['Int']>;
}>;


export type ServicesQuery = { __typename?: 'Query', services?: Maybe<Array<{ __typename?: 'Service', id: number, name: string, description: string, logoUrl: string, pros: string, vcTemplates?: Maybe<Array<{ __typename?: 'VCTemplate', id: number, title: string, vc?: Maybe<{ __typename?: 'VC', id: number, value: any }> }>> }>> };

export type ServiceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ServiceQuery = { __typename?: 'Query', service: { __typename?: 'Service', id: number, name: string, description: string, logoUrl: string, pros: string, vcTemplates?: Maybe<Array<{ __typename?: 'VCTemplate', id: number, type: string, title: string, vc?: Maybe<{ __typename?: 'VC', id: number, value: any }> }>> } };

export type VcTemplateQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VcTemplateQuery = { __typename?: 'Query', vcTemplate: { __typename?: 'VCTemplate', id: number, type: string, title: string, description: string, issuer: string, vc?: Maybe<{ __typename?: 'VC', id: number, value: any }> } };

export type VcTemplateSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type VcTemplateSectionsQuery = { __typename?: 'Query', vcTemplateSections?: Maybe<Array<{ __typename?: 'VCTemplateSection', id: number, title: string, vcTemplates?: Maybe<Array<{ __typename?: 'VCTemplate', id: number, title: string, vc?: Maybe<{ __typename?: 'VC', id: number }> }>> }>> };

export type LogoutMutationVariables = Exact<{
  sessionIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type LoginGenerateMutationVariables = Exact<{
  did: Scalars['String'];
}>;


export type LoginGenerateMutation = { __typename?: 'Mutation', loginGenerate: string };

export type LoginVerifyMutationVariables = Exact<{
  did: Scalars['String'];
  signedMessage: Scalars['String'];
}>;


export type LoginVerifyMutation = { __typename?: 'Mutation', loginVerify: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, did: string } } };

export type VcCreateProofOfTonAddressGenerateMutationVariables = Exact<{ [key: string]: never; }>;


export type VcCreateProofOfTonAddressGenerateMutation = { __typename?: 'Mutation', vcCreateProofOfTonAddressGenerate: string };

export type VcCreateProofOfTonAddressVerifyMutationVariables = Exact<{
  signatureHex: Scalars['String'];
  walletAddress: Scalars['String'];
}>;


export type VcCreateProofOfTonAddressVerifyMutation = { __typename?: 'Mutation', vcCreateProofOfTonAddressVerify: { __typename?: 'VC', id: number, value: any } };


export const MySomeDocument = gql`
    query MySome($some: String!) {
  echo(text: $some)
}
    `;

/**
 * __useMySomeQuery__
 *
 * To run a query within a React component, call `useMySomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySomeQuery({
 *   variables: {
 *      some: // value for 'some'
 *   },
 * });
 */
export function useMySomeQuery(baseOptions: Apollo.QueryHookOptions<MySomeQuery, MySomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySomeQuery, MySomeQueryVariables>(MySomeDocument, options);
      }
export function useMySomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySomeQuery, MySomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySomeQuery, MySomeQueryVariables>(MySomeDocument, options);
        }
export type MySomeQueryHookResult = ReturnType<typeof useMySomeQuery>;
export type MySomeLazyQueryHookResult = ReturnType<typeof useMySomeLazyQuery>;
export type MySomeQueryResult = Apollo.QueryResult<MySomeQuery, MySomeQueryVariables>;
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoami {
    did
  }
}
    `;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
      }
export function useWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;
export const CurrentSessionDocument = gql`
    query CurrentSession {
  currentSession {
    id
  }
}
    `;

/**
 * __useCurrentSessionQuery__
 *
 * To run a query within a React component, call `useCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<CurrentSessionQuery, CurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentSessionQuery, CurrentSessionQueryVariables>(CurrentSessionDocument, options);
      }
export function useCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentSessionQuery, CurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentSessionQuery, CurrentSessionQueryVariables>(CurrentSessionDocument, options);
        }
export type CurrentSessionQueryHookResult = ReturnType<typeof useCurrentSessionQuery>;
export type CurrentSessionLazyQueryHookResult = ReturnType<typeof useCurrentSessionLazyQuery>;
export type CurrentSessionQueryResult = Apollo.QueryResult<CurrentSessionQuery, CurrentSessionQueryVariables>;
export const ServicesDocument = gql`
    query Services($vcTemplateId: Int) {
  services(filter: {vcTemplateId: $vcTemplateId}) {
    id
    name
    description
    logoUrl
    pros
    vcTemplates {
      id
      title
      vc {
        id
        value
      }
    }
  }
}
    `;

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      vcTemplateId: // value for 'vcTemplateId'
 *   },
 * });
 */
export function useServicesQuery(baseOptions?: Apollo.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
      }
export function useServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = Apollo.QueryResult<ServicesQuery, ServicesQueryVariables>;
export const ServiceDocument = gql`
    query Service($id: Int!) {
  service(id: $id) {
    id
    name
    description
    logoUrl
    pros
    vcTemplates {
      id
      type
      title
      vc {
        id
        value
      }
    }
  }
}
    `;

/**
 * __useServiceQuery__
 *
 * To run a query within a React component, call `useServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useServiceQuery(baseOptions: Apollo.QueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, options);
      }
export function useServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, options);
        }
export type ServiceQueryHookResult = ReturnType<typeof useServiceQuery>;
export type ServiceLazyQueryHookResult = ReturnType<typeof useServiceLazyQuery>;
export type ServiceQueryResult = Apollo.QueryResult<ServiceQuery, ServiceQueryVariables>;
export const VcTemplateDocument = gql`
    query VcTemplate($id: Int!) {
  vcTemplate(id: $id) {
    id
    type
    title
    description
    issuer
    vc {
      id
      value
    }
  }
}
    `;

/**
 * __useVcTemplateQuery__
 *
 * To run a query within a React component, call `useVcTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useVcTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVcTemplateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVcTemplateQuery(baseOptions: Apollo.QueryHookOptions<VcTemplateQuery, VcTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VcTemplateQuery, VcTemplateQueryVariables>(VcTemplateDocument, options);
      }
export function useVcTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VcTemplateQuery, VcTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VcTemplateQuery, VcTemplateQueryVariables>(VcTemplateDocument, options);
        }
export type VcTemplateQueryHookResult = ReturnType<typeof useVcTemplateQuery>;
export type VcTemplateLazyQueryHookResult = ReturnType<typeof useVcTemplateLazyQuery>;
export type VcTemplateQueryResult = Apollo.QueryResult<VcTemplateQuery, VcTemplateQueryVariables>;
export const VcTemplateSectionsDocument = gql`
    query VcTemplateSections {
  vcTemplateSections {
    id
    title
    vcTemplates {
      id
      title
      vc {
        id
      }
    }
  }
}
    `;

/**
 * __useVcTemplateSectionsQuery__
 *
 * To run a query within a React component, call `useVcTemplateSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVcTemplateSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVcTemplateSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useVcTemplateSectionsQuery(baseOptions?: Apollo.QueryHookOptions<VcTemplateSectionsQuery, VcTemplateSectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VcTemplateSectionsQuery, VcTemplateSectionsQueryVariables>(VcTemplateSectionsDocument, options);
      }
export function useVcTemplateSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VcTemplateSectionsQuery, VcTemplateSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VcTemplateSectionsQuery, VcTemplateSectionsQueryVariables>(VcTemplateSectionsDocument, options);
        }
export type VcTemplateSectionsQueryHookResult = ReturnType<typeof useVcTemplateSectionsQuery>;
export type VcTemplateSectionsLazyQueryHookResult = ReturnType<typeof useVcTemplateSectionsLazyQuery>;
export type VcTemplateSectionsQueryResult = Apollo.QueryResult<VcTemplateSectionsQuery, VcTemplateSectionsQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout($sessionIds: [Int!]) {
  logout(sessionIds: $sessionIds)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      sessionIds: // value for 'sessionIds'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginGenerateDocument = gql`
    mutation LoginGenerate($did: String!) {
  loginGenerate(did: $did)
}
    `;
export type LoginGenerateMutationFn = Apollo.MutationFunction<LoginGenerateMutation, LoginGenerateMutationVariables>;

/**
 * __useLoginGenerateMutation__
 *
 * To run a mutation, you first call `useLoginGenerateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGenerateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGenerateMutation, { data, loading, error }] = useLoginGenerateMutation({
 *   variables: {
 *      did: // value for 'did'
 *   },
 * });
 */
export function useLoginGenerateMutation(baseOptions?: Apollo.MutationHookOptions<LoginGenerateMutation, LoginGenerateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginGenerateMutation, LoginGenerateMutationVariables>(LoginGenerateDocument, options);
      }
export type LoginGenerateMutationHookResult = ReturnType<typeof useLoginGenerateMutation>;
export type LoginGenerateMutationResult = Apollo.MutationResult<LoginGenerateMutation>;
export type LoginGenerateMutationOptions = Apollo.BaseMutationOptions<LoginGenerateMutation, LoginGenerateMutationVariables>;
export const LoginVerifyDocument = gql`
    mutation LoginVerify($did: String!, $signedMessage: String!) {
  loginVerify(did: $did, signatureHex: $signedMessage) {
    token
    account {
      id
      did
    }
  }
}
    `;
export type LoginVerifyMutationFn = Apollo.MutationFunction<LoginVerifyMutation, LoginVerifyMutationVariables>;

/**
 * __useLoginVerifyMutation__
 *
 * To run a mutation, you first call `useLoginVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginVerifyMutation, { data, loading, error }] = useLoginVerifyMutation({
 *   variables: {
 *      did: // value for 'did'
 *      signedMessage: // value for 'signedMessage'
 *   },
 * });
 */
export function useLoginVerifyMutation(baseOptions?: Apollo.MutationHookOptions<LoginVerifyMutation, LoginVerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginVerifyMutation, LoginVerifyMutationVariables>(LoginVerifyDocument, options);
      }
export type LoginVerifyMutationHookResult = ReturnType<typeof useLoginVerifyMutation>;
export type LoginVerifyMutationResult = Apollo.MutationResult<LoginVerifyMutation>;
export type LoginVerifyMutationOptions = Apollo.BaseMutationOptions<LoginVerifyMutation, LoginVerifyMutationVariables>;
export const VcCreateProofOfTonAddressGenerateDocument = gql`
    mutation VcCreateProofOfTonAddressGenerate {
  vcCreateProofOfTonAddressGenerate
}
    `;
export type VcCreateProofOfTonAddressGenerateMutationFn = Apollo.MutationFunction<VcCreateProofOfTonAddressGenerateMutation, VcCreateProofOfTonAddressGenerateMutationVariables>;

/**
 * __useVcCreateProofOfTonAddressGenerateMutation__
 *
 * To run a mutation, you first call `useVcCreateProofOfTonAddressGenerateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVcCreateProofOfTonAddressGenerateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vcCreateProofOfTonAddressGenerateMutation, { data, loading, error }] = useVcCreateProofOfTonAddressGenerateMutation({
 *   variables: {
 *   },
 * });
 */
export function useVcCreateProofOfTonAddressGenerateMutation(baseOptions?: Apollo.MutationHookOptions<VcCreateProofOfTonAddressGenerateMutation, VcCreateProofOfTonAddressGenerateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VcCreateProofOfTonAddressGenerateMutation, VcCreateProofOfTonAddressGenerateMutationVariables>(VcCreateProofOfTonAddressGenerateDocument, options);
      }
export type VcCreateProofOfTonAddressGenerateMutationHookResult = ReturnType<typeof useVcCreateProofOfTonAddressGenerateMutation>;
export type VcCreateProofOfTonAddressGenerateMutationResult = Apollo.MutationResult<VcCreateProofOfTonAddressGenerateMutation>;
export type VcCreateProofOfTonAddressGenerateMutationOptions = Apollo.BaseMutationOptions<VcCreateProofOfTonAddressGenerateMutation, VcCreateProofOfTonAddressGenerateMutationVariables>;
export const VcCreateProofOfTonAddressVerifyDocument = gql`
    mutation VcCreateProofOfTonAddressVerify($signatureHex: String!, $walletAddress: String!) {
  vcCreateProofOfTonAddressVerify(
    signatureHex: $signatureHex
    walletAddress: $walletAddress
  ) {
    id
    value
  }
}
    `;
export type VcCreateProofOfTonAddressVerifyMutationFn = Apollo.MutationFunction<VcCreateProofOfTonAddressVerifyMutation, VcCreateProofOfTonAddressVerifyMutationVariables>;

/**
 * __useVcCreateProofOfTonAddressVerifyMutation__
 *
 * To run a mutation, you first call `useVcCreateProofOfTonAddressVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVcCreateProofOfTonAddressVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vcCreateProofOfTonAddressVerifyMutation, { data, loading, error }] = useVcCreateProofOfTonAddressVerifyMutation({
 *   variables: {
 *      signatureHex: // value for 'signatureHex'
 *      walletAddress: // value for 'walletAddress'
 *   },
 * });
 */
export function useVcCreateProofOfTonAddressVerifyMutation(baseOptions?: Apollo.MutationHookOptions<VcCreateProofOfTonAddressVerifyMutation, VcCreateProofOfTonAddressVerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VcCreateProofOfTonAddressVerifyMutation, VcCreateProofOfTonAddressVerifyMutationVariables>(VcCreateProofOfTonAddressVerifyDocument, options);
      }
export type VcCreateProofOfTonAddressVerifyMutationHookResult = ReturnType<typeof useVcCreateProofOfTonAddressVerifyMutation>;
export type VcCreateProofOfTonAddressVerifyMutationResult = Apollo.MutationResult<VcCreateProofOfTonAddressVerifyMutation>;
export type VcCreateProofOfTonAddressVerifyMutationOptions = Apollo.BaseMutationOptions<VcCreateProofOfTonAddressVerifyMutation, VcCreateProofOfTonAddressVerifyMutationVariables>;