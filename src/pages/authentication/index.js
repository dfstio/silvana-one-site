import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useFetch, useLocalStorage, getServerUrl} from '@staketab/lib'
import BackendErrorMessages from './components/backendErrorMessages'
import './auth.sass'

const Authentication = (props) => {
	const pageTitle = 'Sign In'
	const apiUrl = getServerUrl() + '/auth/login'
	const [password, setPassword] = useState('')
	const [login, setLogin] = useState('')
	const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
	const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
	const [, setToken] = useLocalStorage('token')
	const [, setRefreshToken] = useLocalStorage('refreshToken')
	const history = useHistory()

	const handleSubmit = (event) => {
		event.preventDefault()
		doFetch({
			method: 'post',
			data: {password, login},
		})
	}

	useEffect(() => {
		if (!response) {
			return
		}
		setRefreshToken(response.refresh_token)
		setToken(response.access_token)
		setIsSuccessfullSubmit(true)
	}, [response, setToken])

	if (isSuccessfullSubmit) {
		history.goBack()
		setTimeout(() => {
			window.location.reload()
		}, 500)
	}

	return (
		<div className="container auth-container">
			<h1>{pageTitle}</h1>
			{error && <BackendErrorMessages backendErrors={error.errors} />}
			<form onSubmit={handleSubmit}>
				<fieldset>
					<fieldset className="form-group">
						<input
							type="text"
							placeholder="Username"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
						/>
					</fieldset>
					<fieldset className="form-group">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</fieldset>
					<button disabled={isLoading} type="submit">
						{pageTitle}
					</button>
				</fieldset>
			</form>
		</div>
	)
}

export default Authentication
