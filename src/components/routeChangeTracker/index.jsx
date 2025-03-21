import React from 'react'
import {withRouter} from 'react-router-dom'
import ReactGA from 'react-ga4'

const RouteChangeTracker = ({history}) => {
  history.listen((location) => {
    ReactGA.send({hitType: 'pageview', page: location.pathname})
  })
  return <div></div>
}

export default withRouter(RouteChangeTracker)
