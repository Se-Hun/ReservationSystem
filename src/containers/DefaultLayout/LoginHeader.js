import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'reactstrap';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {deleteTokens} from '../../utils/auth';
import {AppNavbarBrand} from "@coreui/react";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class LoginHeader extends Component {

    _logout = () => {
        deleteTokens()
        window.location.reload()
    }

    render() {

        // eslint-disable-next-line
        const { logged, onLogout, children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <Nav className="d-md-down-none" navbar>
                    <Link to="/home" style={{textDecoration: "none", color: "black"}}>
                        <AppNavbarBrand>
                            <i className="fa fa-train fa-lg" style={{marginRight: "5px"}}/>
                            KJH Train
                        </AppNavbarBrand>
                    </Link>
                    <NavItem className="px-3"/>
                    <NavItem className="px-3">
                        <NavLink to="/notice" className="nav-link" style={{color: "black", textDecoration: "bold"}}>공지사항</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/QnA" className="nav-link" style={{color: "black", textDecoration: "bold"}}>Q&A</Link>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/bookmark" className="nav-link" style={{color: "black", textDecoration: "bold"}}>노선 즐겨찾기</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/reservation" className="nav-link" style={{color: "black", textDecoration: "bold"}}>나의 예매목록</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/changeuserinfo" className="nav-link" style={{color: "black", textDecoration: "bold"}}>회원정보변경</NavLink>
                    </NavItem>
                    <Button variant="outlined"
                            size="medium"
                            color="primary"
                            onClick={this._logout}
                            style={{position: 'absolute', right: 10}}>
                        로그아웃
                    </Button>
                </Nav>
            </React.Fragment>
        );
    }
}

LoginHeader.propTypes = propTypes;
LoginHeader.defaultProps = defaultProps;

export default LoginHeader;
