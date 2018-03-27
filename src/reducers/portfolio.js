import {
  PORTFOLIO_SET_DATE_RANGE,
  UPDATE_PRICE_HISTORY_DATA
} from '../actions/portfolio'

const initialState = {
  range: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PORTFOLIO_SET_DATE_RANGE:
      return { ...state, range: action.range }
    case UPDATE_PRICE_HISTORY_DATA:
      return { ...state, priceHistoryData: action.priceHistoryData }
    default:
      return state
  }
}
