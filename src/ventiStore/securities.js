import client from '../lib/hotwalletClient'
import { normalize } from 'normalizr'
import * as schema from '../ventiStore/schema'
import debounce from 'lodash/debounce'
import { state } from 'venti'

const fetchSecuritiesDebounced = debounce(() => {
  state.set('securities.metadata', { ...state.get('securities.metadata', {}), isFetching: true })

  const baseCurrency = state.get('user.baseCurrency', 'USD')
  client.get('/securities', { baseCurrency, limit: 2000 })
    .then(response => {
      const data = normalize(response, schema.arrayOfSecurities)
      state.set('securities.allSymbols', data)

      const bySymbol = state.get('securities.bySymbol', {})
      state.set('securities.bySymbol', { ...bySymbol, ...data.entities.security })

      const metadata = state.get('securities.metadata', {})
      const newMeta = { ...metadata, isFetching: false, failureMessage: undefined }
      state.set('securities.metadata', newMeta)
    })
    .catch(error => {
      state.set('securities.metadata', {
        ...state.get('securities.metadata', {}),
        isFetching: false,
        failureMessage: error.message || 'Unknown price fetch failure'
      })
    })
}, 1000)

export const fetchSecurities = () => fetchSecuritiesDebounced()

export const updateSecurity = (security) => {
  const symbol = Object.keys(security.entities.security)[0]
  if (state.get(`securities.bySymbol.${symbol}.price`) !== security.entities.security[symbol].price) {
    state.set('securities.bySymbol', { ...state.get('securities.bySymbol'), ...security.entities.security })
    state.set('securities.metadata', { ...state.get('securities.metadata'), updatedAt: new Date().toISOString(), failureMessage: undefined })
  }
}

export const showBalancesOnly = balancesOnly => state.set('securities.metadata.balancesOnly', balancesOnly)

const initialState = {
  allSymbols: [],
  bySymbol: {},
  metadata: { isFetching: false, failureMessage: undefined, updatedAt: new Date().toISOString() }
}

export default state.set('securities', initialState)
