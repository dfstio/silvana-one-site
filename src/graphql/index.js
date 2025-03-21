import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client'
import getCustomBackendLink from '../utils/getCustomBackendLink'
import { STRAPI_URL } from '../utils/constants'

const backend = new HttpLink({
	uri: getCustomBackendLink() + '/graphql',
})

const strapi = new HttpLink({
	uri: STRAPI_URL + '/graphql',
})

// const client = new ApolloClient({
// 	uri: STRAPI_URL + '/graphql',
// 	cache: new InMemoryCache(),
// })

const client = new ApolloClient({
	link: ApolloLink.split(
		(operation) => operation.getContext().clientName === 'backend',
		backend,
		strapi
	),
	cache: new InMemoryCache(),
})

export default client
