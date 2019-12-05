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
       // this.toggle = this.toggle.bind(this);
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
        let url=""
        let formData= new FormData()
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
        formdata.append("cardcompany", cardcompany)
        formData.append("cardnum", cardnum)

        fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(data => {
                window.location.replace("/")
            })
        // this.setState({
        //     Redirect: true,
        // })
    }
    render() {
        // if (this.state.Redirect) {
        //     console.log(this.state)
        //     return <Redirect to={{
        //         pathname: '/',
        //         state: {
        //             account: this.state.account,
        //             password: this.state.password,
        //             accountname: this.state.accountname,
        //             phonenum: this.state.phonenum,
        //             cardcompany: this.state.cardcompany,
        //             cardnum: this.state.cardnum,
        //         }
        //     }}></Redirect>
        // }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h1>Register</h1>
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
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="accountname" placeholder="Username" autoComplete="accountname"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="phonenum" placeholder="000 0000 0000" autoComplete="phonenum"/>
                                        </InputGroup>
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
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="cardnum">Credit Card Number</Label>
                                                    <Input type="text" name="cardnum" id="cardnum" placeholder="0000 0000 0000 0000" required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button type="submit" color="success" block>Register</Button>
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
