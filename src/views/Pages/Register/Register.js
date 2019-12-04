import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    FormGroup,
    Label
} from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            account: '',
            password: '',
            accountname: '',
            email: '',
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
        this.setState({
            Redirect: true,
        })
    }
    render() {
        if (this.state.Redirect) {
            console.log(this.state)
            return <Redirect to={{
                pathname: '/',
                state: {
                    account: this.state.account,
                    password: this.state.password,
                    accountname: this.state.accountname,
                    email: this.state.email,
                    cardcompany: this.state.cardcompany,
                    cardnum: this.state.cardnum,
                }
            }}></Redirect>
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h1></h1>
                                        <p className="text-muted">Register Account Information</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="account" placeholder="ID" autoComplete="account"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" name="password" placeholder="Password" autoComplete="new-password"/>
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
                                            <Input type="text" name="accountname" placeholder="Username" autoComplete="accountname"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="email" placeholder="Email" autoComplete="email"/>
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
                                                    <Input type="select" name="cardcompany" id="cardcompany">
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
                                                    <Input type="text" name="cardnum" id="cardnum" placeholder="0000 0000 0000 0000" required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/*<Link to="/dashboard" className="nav-link">*/}
                                        <Button type="submit" color="success" block>Register</Button>
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

export default Register;
