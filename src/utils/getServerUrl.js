import netsConfig from '../configs/netsConfig'
import store from './../store/index'

export default function getServerUrl() {
  const {explorerNet, explorerChain} = store.getState().reducerGlobal
  let url = netsConfig[explorerChain].nets.filter(
    (elem) => elem.name === explorerNet
  )[0]
  return url?.url
}
