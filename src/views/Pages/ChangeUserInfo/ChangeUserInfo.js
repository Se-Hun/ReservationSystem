import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form, FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label,
    Row
} from 'reactstrap';

import {isLoggedIn} from '../../../utils/auth'

class ChangeUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            account: '',
            password: '',
            accountname: '',
            phonenum: '',
            cardcompany: '신한',
            cardnum: '',
            Redirect: false,
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let url = "http://localhost:5000/api/user/modify"
        let account = this.state.account
        let password = this.state.password
        let accountname = this.state.accountname
        let phonenum = this.state.phonenum
        let cardcompany = this.state.cardcompany
        let cardnum = this.state.cardnum

        let body="{"
        body+='"account":"'+account+'", ';
        body+='"password":"'+password+'", ';
        body+='"accountname":"'+accountname+'", ';
        body+='"phonenum":"'+phonenum+'", ';
        body+='"cardcompany":"'+cardcompany+'", ';
        body+='"cardnum":"'+cardnum+'"}';
        fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: body
        }).then(res => res.json())
            .then(data => {
                if (!isLoggedIn()) {
                    alert("로그인이 필요합니다.")
                    window.location.replace("/Login")
                } else {
                    window.location.replace("/")
                }
            })
    }


    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h1></h1>
                                        <p className="text-muted">Change Account Information</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="account" onChange={this.handleChange} placeholder="현재 계정 입력" autoComplete="account"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" name="password" onChange={this.handleChange} placeholder="현재 비밀번호 입력"
                                                   autoComplete="new-password"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="accountname" onChange={this.handleChange} placeholder="변경하실 이름 입력"
                                                   autoComplete="accountname"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="phonenum" onChange={this.handleChange} placeholder="변경하실 핸드폰 정보 입력 (000-0000-0000)"
                                                   autoComplete="phonenum"/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="card">card company</Label>
                                                    <Input type="select" name="cardcompany" onChange={this.handleChange} id="cardcompany" placeholder="신한">
                                                        <option value="신한">신한</option>
                                                        <option value="하나">하나</option>
                                                        <option value="국민">국민</option>
                                                        <option value="농협">농협</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="cardnum">Credit Card Number</Label>
                                                    <Input type="text" name="cardnum" id="cardnum" onChange={this.handleChange}
                                                           placeholder="변경하실 카드 번호 입력" required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button type="submit" color="success" block>Change Account Information</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ChangeUserInfo;
