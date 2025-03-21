import {env} from '../configs/env'
import store from '../store'
const {explorerNet} = store.getState().reducerGlobal

const getCustomBackendLink = () => {
	switch (explorerNet) {
		case 'mainnet':
			return env === 'development'
				? 'https://t.minascan.io/mainnet/api'
				: 'https://minascan.io/mainnet/api'
		case 'devnet':
			return env === 'development'
				? 'https://t.minascan.io/devnet/api'
				: 'https://minascan.io/devnet/api'
		default:
			return 'https://t.minascan.io/devnet/api'
	}
}

export default getCustomBackendLink
