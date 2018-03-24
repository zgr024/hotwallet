import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Counter extends React.Component {
  componentDidMount() {}

  render() {
    const props = this.props
    return (
      <div>
        <h1>Count: {props.count}</h1>

        <div className="pad">
          <p>
            <button onClick={props.increment}>Increment {props.size}</button>
          </p>

          <p>
            <button onClick={props.decrement}>Decrement {props.size}</button>
          </p>

          <input
            type="number"
            defaultValue={props.size}
            onChange={e => props.setSize(e.target.value)}
          />

          <p>
            Transactions: {props.transactions.length}
          </p>

          <p>
            <button onClick={() => props.goto('/settings')}>
              Go to Settings
            </button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  size: state.counter.size,
  transactions: state.transactions
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment: actions.incrementCounter,
      decrement: actions.decrementCounter,
      setSize: actions.setCounterSize,
      goto: uri => push(uri)
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Counter)