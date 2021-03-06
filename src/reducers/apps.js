import {
  ADD_APP,
  REMOVE_APP
} from '../actions/apps'

export const allApps = [
  {
    id: 'hotwallet-app-news',
    icon: 'world',
    uri: '/apps/news',
    name: 'Crypto News'
  },
  {
    id: 'ledger',
    image: 'https://chnnl.s3.amazonaws.com/tarragon/hardware/128x128/ledger.png',
    uri: '/ledger',
    name: 'Ledger Connect'
  },
  {
    id: 'trezor',
    image: 'https://chnnl.s3.amazonaws.com/tarragon/hardware/64x64/trezor.png',
    uri: '/trezor',
    name: 'Trezor Connect'
  },
  {
    id: 'binance',
    image: 'https://chnnl.s3.amazonaws.com/tarragon/exchanges/64x64/binance.png',
    uri: '/binance',
    name: 'Binance Connect'
  }
]

const initialState = {
  enabled: ['ledger', 'trezor', 'binance', 'hotwallet-app-news']
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_APP:
      const enabled = [...state.enabled, action.appId]
      return { ...state, enabled: enabled.filter((item, pos) => enabled.indexOf(item) === pos) }
    case REMOVE_APP:
      return { ...state, enabled: state.enabled.filter(appId => appId !== action.appId) }
    default:
      return state
  }
}
