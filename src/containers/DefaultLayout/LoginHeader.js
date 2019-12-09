import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {deleteTokens} from '../../utils/auth';

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
                    <NavItem className="px-3"/>
                    <NavItem className="px-4">
                        <NavLink to="/notice" className="nav-link" >공지사항</NavLink>
                    </NavItem>
                    <NavItem className="px-4">
                        <Link to="/QnA" className="nav-link">Q&A</Link>
                    </NavItem>
                    <NavItem className="px-4">
                        <NavLink to="/bookmark" className="nav-link">노선 즐겨찾기</NavLink>
                    </NavItem>
                    <NavItem className="px-4">
                        <NavLink to="/reservation" className="nav-link">나의 예매목록</NavLink>
                    </NavItem>
                    <NavItem className="px-4">
                        <NavLink to="/changeuserinfo" className="nav-link">회원정보변경</NavLink>
                    </NavItem>
                    <NavItem className="px-4">
                        <Button variant="outlined"
                                size="medium"
                                color="primary"
                                style={{marginTop: "5px", marginBottom: "10px", width: "100%"}} onClick={this._logout}>
                            로그아웃
                        </Button>
                    </NavItem>
                </Nav>
            </React.Fragment>
        );
    }
}

LoginHeader.propTypes = propTypes;
LoginHeader.defaultProps = defaultProps;

export default LoginHeader;
