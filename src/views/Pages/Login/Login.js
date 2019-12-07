import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { isLoggedIn, login } from '../../../utils/auth';

// const data = {
//   "account" : "tpgns5248",
//   "access_token" : "Login-OK"
// }


class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      account: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/api/user/login"

    let formData = new FormData()
    let account = this.state.account
    let password = this.state.password

    formData.append("account", account)
    formData.append("password", password)

    fetch(url, {
      method: "POST",
      body: formData
    }).then(res => res.json())
        .then(data => {
          // console.log(data)

          //예외처리 할것!!
          login(data.account, data.access_token)

          console.log(sessionStorage.getItem("account"))

          if(!isLoggedIn()) {
            window.location.replace("/confirmLogin")
          }
        })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Login to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name = "account" onChange={this.handleChange} placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
