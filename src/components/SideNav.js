import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavLink from './NavLink'
import { withRouter } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import { sidebarWidth, darkBlue } from '../lib/styles'
import { allApps } from '../reducers/apps'
import getPathName from '../lib/getPathName'
import { withTheme, compose } from '../contexts'

const portfolioNavItem = { icon: 'pie chart', uri: '/', name: 'Portfolio' }

const lastNavItem = { icon: 'add', uri: '/apps', name: 'Apps' }

const ulStyle = {
  position: 'absolute',
  height: '100%',
  margin: 0,
  padding: 0,
  listStyleType: 'none'
}

class SideNav extends React.PureComponent {
  render() {
    const width = this.props.width || sidebarWidth
    return (
      <div>
        <ul style={{ ...ulStyle, width }}>
          {this.getNavLinks()}
        </ul>
      </div>
    )
  }

  getNavLinks() {
    const isMobile = this.props.isMobile
    const navItems = [portfolioNavItem]
      .concat(this.props.enabledApps)
      .concat([lastNavItem])
    return navItems.map((navItem, i) => {
      const isActive = getPathName(this.props.location) === navItem.uri
      const mobileItem = (
        <div style={{ lineHeight: '1.5em' }}>
          {navItem.icon ? (
            <Icon
              size="large"
              name={navItem.icon}
              style={{
                verticalAlign: 'top',
                marginRight: 10
              }}
            />
          ) : (
            <Image
              src={navItem.image}
              style={{
                display: 'inline-block',
                width: 24,
                marginRight: 10
              }}
            />
          )}
          {navItem.name}
        </div>
      )
      const item = navItem.icon ? (
        <Icon
          size="large"
          name={navItem.icon}
          style={{ margin: '0 0 0 -3px' }}
        />
      ) : (
        <Image
          src={navItem.image}
          style={{
            width: 24,
            margin: '0 auto'
          }}
        />
      )
      const value = isMobile ? mobileItem : item
      const delay = i * 0.05 + 0.075
      const transparent = 'rgba(0,0,0,0)'
      const style = {
        opacity: this.props.opacity || 1,
        padding: 0,
        transition: 'opacity .5s',
        transitionDelay: `${delay}s`,
        borderLeft: `3px solid ${isActive ? darkBlue : transparent}`,
        borderRight: `3px solid ${transparent}`
      }
      return (
        <li key={i} style={style}>
          {navItem.uri === '/apps' ? <hr /> : ''}
          <NavLink
            onClick={this.props.onClick}
            to={navItem.uri}
            name={navItem.name}
            value={value}
          />
        </li>
      )
    })
  }
}

SideNav.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.string,
  opacity: PropTypes.number,
  location: PropTypes.object.isRequired
}

const getEnabledApps = apps => allApps.filter(app => apps.enabled.includes(app.id))

const mapStateToProps = state => ({
  enabledApps: getEnabledApps(state.apps)
})

export default compose(
  withRouter,
  connect(mapStateToProps),
  withTheme
)(SideNav)
