import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    FormGroup,
    Label,
    ModalHeader, ModalFooter, ModalBody, Modal
} from 'reactstrap';
import {isLoggedIn, login} from "../../../utils/auth";

class Register extends Component {
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
            modal:false,
        };
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        let url="http://localhost:5000/api/user/register"

        let account = this.state.account
        let password = this.state.password
        let accountname = this.state.accountname
        let phonenum = this.state.phonenum
        let cardcompany = this.state.cardcompany
        let cardnum = this.state.cardnum

        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                account: account,
                password: password,
                accountname: accountname,
                phonenum: phonenum,
                cardcompany: cardcompany,
                cardnum: cardnum
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.error) {
                    const errorCode = data.error

                    if(errorCode === 1) {
                        alert(data.shouldAttribute + "을(를) 입력해주세요.")
                        return
                    }
                    if(errorCode === 2) {
                        alert("이미 존재하는 아이디입니다.")
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

                if(!isLoggedIn()) {
                    window.location.reload()
                }
                else {
                    this.setState({
                        modal:true
                    })
                }
            })
            .catch(err => console.log(err))
    }
    handleClickModal = (e) => {
        return <Redirect to ={{
            pathname: "/"
        }}></Redirect>
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>확인</ModalHeader>
                    <ModalBody>
                        {this.state.accountname}님, 회원가입을 환영합니다!
                    </ModalBody>
                    <ModalFooter>
                        <Link to ={{pathname:"/login"}}>
                        <Button color="primary" onClick={this.handleClickModal}>확인</Button>{' '}
                        </Link>
                    </ModalFooter>
                </Modal>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h1>회원가입</h1>
                                        <p className="text-muted">정보를 기입해주세요.</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text"
                                                   name="account"
                                                   onChange={this.handleChange}
                                                   placeholder="ID"
                                                   autoComplete="account"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password"
                                                   name="password"
                                                   onChange={this.handleChange}
                                                   placeholder="Password"
                                                   autoComplete="new-password"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text"
                                                   name="accountname"
                                                   onChange={this.handleChange}
                                                   placeholder="이름"
                                                   autoComplete="accountname"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="cui-phone icons"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text"
                                                   name="phonenum"
                                                   onChange={this.handleChange}
                                                   placeholder="전화번호 (010 xxxx xxxx)"
                                                   autoComplete="phonenum"/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="card">카드 회사</Label>
                                                    <Input type="select"
                                                           onChange={this.handleChange}
                                                           name="cardcompany"
                                                           id="cardcompany">
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
                                                    <Label htmlFor="cardnum">카드 번호</Label>
                                                    <Input type="text"
                                                           name="cardnum"
                                                           onChange={this.handleChange}
                                                           id="cardnum"
                                                           placeholder="0000 0000 0000 0000"
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button type="submit" color="warning" block>완료</Button>
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
