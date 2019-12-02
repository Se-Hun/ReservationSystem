import React, {Component} from 'react';
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

class ChangeUserInfo extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="UserID" autoComplete="userID"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email"/>
                    </InputGroup>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="name">Name</Label>
                          <Input type="text" id="name" placeholder="Enter your name" required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="ccnumber">Credit Card Number</Label>
                          <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="4">
                        <FormGroup>
                          <Label htmlFor="ccmonth">Month</Label>
                          <Input type="select" name="ccmonth" id="ccmonth">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="4">
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
                          <Input type="text" id="cvv" placeholder="123" required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="success" block>Change Account Information</Button>
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
