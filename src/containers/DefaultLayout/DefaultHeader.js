import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LoginHeader from './LoginHeader';
import LogoutHeader from './LogoutHeader';
import {isLoggedIn} from '../../utils/auth';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {
        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            // isLoggedIn() ? (헤더 바꾸기) : (로그인 안 되었을때의 헤더)
            <div>
                {isLoggedIn() ? <LoginHeader/> : <LogoutHeader/>}
            </div>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
