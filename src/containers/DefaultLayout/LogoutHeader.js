import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppAsideToggler, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class LogoutHeader extends Component {
    render() {

        // eslint-disable-next-line
        const {logged, onLogout, children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/dashboard" className="nav-link">공지사항</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/QnA" className="nav-link">Q&A</Link>
                    </NavItem>
                {/*</Nav>*/}
                {/*<Nav className="ml-auto" navbar>*/}
                    <NavItem className="px-3">
                        <NavLink to="/Register" className="nav-link">회원가입</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/Login" className="nav-link">로그인</NavLink>
                    </NavItem>
                    {/*<UncontrolledDropdown nav direction="down">*/}
                        {/*<DropdownToggle nav>
               <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              MY
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> 회원정보변경<Badge color="info">42</Badge></DropdownItem>
               <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
               <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
               <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
               <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
               <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
               <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
               <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>*/}
                    {/*</UncontrolledDropdown>*/}
                </Nav>
                {/* <AppAsideToggler className="d-md-down-none" /> */}
                {/*<AppAsideToggler className="d-lg-none" mobile />*/}
            </React.Fragment>
        );
    }
}

LogoutHeader.propTypes = propTypes;
LogoutHeader.defaultProps = defaultProps;

export default LogoutHeader;