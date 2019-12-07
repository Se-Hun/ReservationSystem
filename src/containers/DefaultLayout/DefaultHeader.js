import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
// import {Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';
// import {AppAsideToggler, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
// import sygnet from '../../assets/img/brand/sygnet.svg'

import LoginHeader from './LoginHeader';
import LogoutHeader from './LogoutHeader';
import {isLoggedIn, login} from '../../utils/auth';

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
    )
        ;
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
