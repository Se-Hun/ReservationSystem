import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";
import {AppNavbarBrand} from "@coreui/react";

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
                    <Link to="/register" style={{position: 'absolute', right: 100, textDecoration: "none"}}>
                        <Button variant="outlined"
                                size="medium"
                                color="primary">
                            회원가입
                        </Button>
                    </Link>
                    <Link to="/login" style={{position: 'absolute', right: 10, textDecoration: "none"}}>
                        <Button variant="outlined"
                                size="medium"
                                color="primary">
                            로그인
                        </Button>
                    </Link>
                    </Nav>
            </React.Fragment>
        );
    }
}

LogoutHeader.propTypes = propTypes;
LogoutHeader.defaultProps = defaultProps;

export default LogoutHeader;
