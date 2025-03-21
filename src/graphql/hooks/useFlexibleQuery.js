import {useQuery, gql} from '@apollo/client'
import {useEffect} from 'react'

export const useFlexibleQuery = (queryText, variables) => {
	const QUERY = gql`
		${queryText}
	`

	const {loading, error, data, refetch} = useQuery(QUERY, {variables})

	useEffect(() => {
		refetch(variables)
	}, [JSON.stringify(variables)])

	return {loading, error, data}
}
