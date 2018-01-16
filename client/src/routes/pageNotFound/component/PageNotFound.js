/**
 * Created by Aus on 2018/1/16.
 */
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class PageNotFound extends Component {
    render () {
        const props = this.props
        return (
            <div>
                <h1>Page not found!!!</h1>
                <h3>
                    <a onClick={props.router.goBack}>Back</a>
                </h3>
            </div>
        )
    }
}

// PageNotFound.propTypes = {
//     router: PropTypes.object.isRequired,
// }

export default withRouter(PageNotFound)
