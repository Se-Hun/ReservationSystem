import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { isLoggedIn, login } from '../../../utils/auth';

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

    let account = this.state.account
    let password = this.state.password

    fetch(url, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({account: account, password: password})
    }).then(res => res.json())
        .then(data => {
          if (data.error) {
            const errorCode = data.error

            if(errorCode == 1) {
              alert(data.shouldAttribute + "을(를) 입력해주세요.")
              window.location.reload()
              return
            }
            if(errorCode == 2) {
              alert("아이디 또는 비밀번호가 틀렸습니다.")
              window.location.reload()
              return
            }
            else {
              alert("잘못된 접근입니다.")
              window.location.reload()
              return
            }
          }
          else {
            login(data.account, data.token, data.accountname, data.phonenum, data.cardcompany, data.cardnum)
          }

          // console.log(sessionStorage.getItem("account"))
          // console.log(sessionStorage.getItem("token"))
          // console.log(sessionStorage.getItem("accountname"))
          // console.log(sessionStorage.getItem("phonenum"))
          // console.log(sessionStorage.getItem("cardcompany"))
          // console.log(sessionStorage.getItem("cardnum"))

          if(!isLoggedIn()) {
            window.location.reload()
          }
          else {
            window.location.replace("/confirmLogin")
          }
        }).catch(err => console.log(err))
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
                          <Button type="submit" color="primary" className="px-4">Login</Button>
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
