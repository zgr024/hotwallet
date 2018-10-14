import React from 'react'
import { connect } from 'react-redux'
import { contentMinHeight } from './App'
import { mapDispatchToProps } from '../actions'

class Iframe extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      appId: props.match.params.appId,
      height: contentMinHeight
    }
  }

  handleWindowMessage = event => {
    if (event.data.height) {
      const height = event.data.height || contentMinHeight
      return this.setState({ height })
    }
    if (event.data.action) {
      const actionFunctionName = event.data.action
      // TODO: check if this.appId has permission to perform this action
      this.iframe.contentWindow.postMessage({
        rpcId: event.data.rpcId,
        response: this.props[actionFunctionName](event.data.payload)
      }, '*')
    }
  }

  addListenerOnce() {
    if (this.listener) return
    this.listener = true
    window.addEventListener('message', this.handleWindowMessage, false)
  }

  componentDidMount() {
    this.addListenerOnce()
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleWindowMessage, false)
  }

  render() {
    if (!this.state.appId) return
    const height = Math.max(contentMinHeight, this.state.height)
    return (
      <iframe
        sandbox="allow-scripts allow-forms"
        ref={f => this.iframe = f}
        style={{
          border: 'none',
          margin: 0,
          padding: 0
        }}
        width="100%"
        height={height}
        title={this.state.appId}
        src={`/iframe.html?${this.state.appId}`}
      />
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Iframe)
