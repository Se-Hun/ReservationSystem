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
        console.log(this.props.location);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            account: '',
            password: '',
            accountname: '',
            phonenum: '',
            cardcompany: '',
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
        let url = ""
        let formData = new FormData()
        let id = this.state.account
        let password = this.state.password
        let name = this.state.accountname
        let phonenum = this.state.phonenum
        let cardcompany = this.state.cardcompany
        let cardnum = this.state.cardnum
        formData.append("id", id)
        formData.append("password", password)
        formData.append("name", name)
        formData.append("phonenum", phonenum)
        formData.append("cardcompany", cardcompany)
        formData.append("cardnum", cardnum)
        fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (!isLoggedIn()) {
                    window.location.replace("/Login")
                } else {
                    window.location.replace("/")
                }
            })
    }


    render() {
        // if (this.state.Redirect) {
        //   console.log(this.state)
        //   return <Redirect to={{
        //     pathname: '/',
        //     state: {
        //       account: this.state.account,
        //       password: this.state.password,
        //       accountname: this.state.accountname,
        //       phonenum: this.state.phonenum,
        //       cardcompany: this.state.cardcompany,
        //       cardnum: this.state.cardnum,
        //     }
        //   }}></Redirect>
        // }
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
                                            <Input type="text" name="account" onChange={this.handleChange} placeholder="ID" autoComplete="account"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" name="password" onChange={this.handleChange} placeholder="Password"
                                                   autoComplete="new-password"/>
                                        </InputGroup>
                                        {/*<InputGroup className="mb-4">*/}
                                        {/*  <InputGroupAddon addonType="prepend">*/}
                                        {/*    <InputGroupText>*/}
                                        {/*      <i className="icon-lock"></i>*/}
                                        {/*    </InputGroupText>*/}
                                        {/*  </InputGroupAddon>*/}
                                        {/*  <Input type="password" placeholder="Repeat password" autoComplete="new-password"/>*/}
                                        {/*</InputGroup>*/}
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="accountname" onChange={this.handleChange} placeholder="Username"
                                                   autoComplete="accountname"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="phonenum" onChange={this.handleChange} placeholder="000 0000 0000"
                                                   autoComplete="phonenum"/>
                                        </InputGroup>

                                        {/*<Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="name">Name</Label>
                          <Input type="text" id="name" placeholder="Enter your name" required/>
                        </FormGroup>
                      </Col>
                    </Row>*/}
                                        <Row>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="card">card company</Label>
                                                    <Input type="select" name="cardcompany" onChange={this.handleChange} id="cardcompany">
                                                        <option value="신한">신한</option>
                                                        <option value="하나">하나</option>
                                                        <option value="국민">국민</option>
                                                        <option value="농협">농협</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            {/*<Col xs="4">
                        <FormGroup>
                          <Label htmlFor="ccyear">Year</Label>
                          <Input type="select" name="ccyear" id="ccyear">
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="4">
                        <FormGroup>
                          <Label htmlFor="cvv">CVV/CVC</Label>
                          <Input type="text" name="cvv" placeholder="123" required/>
                        </FormGroup>
                      </Col>*/}
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="cardnum">Credit Card Number</Label>
                                                    <Input type="text" name="cardnum" id="cardnum" onChange={this.handleChange}
                                                           placeholder="0000 0000 0000 0000" required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/*<Link to="/dashboard" className="nav-link">*/}
                                        <Button type="submit" color="success" block>Change Account Information</Button>
                                        {/*</Link>*/}
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
