import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Form,
    ModalHeader, ModalFooter, ModalBody, Modal
} from 'reactstrap';
import {getId} from '../../../utils/auth'
import {Link,Redirect} from 'react-router-dom'

var id = getId()
const convertToTrainKind = {
    1 : "KTX",
    2 : "무궁화호",
    3 : "새마을호"
}
const convertToseat = {
    1: "일반",
    2: "우등"
}
const convertTolocal = {
    Inchoen: "인천",
    Seoul:"서울",
    Daejeon: "대전",
    Daegu: "대구",
    Busan: "부산",
}
const convertTodisdegree = {
    1: "일반",
    2: "1급",
    3: "2급"
}

class ConfirmEditReservation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleSmall = this.toggleSmall.bind(this);
        let peoplenum = 1
        let disdegree = 1
        let departure = 'Seoul'
        let destination = 'Daejeon'
        let card = '신한'
        let cardnum = '0000 0000 0000 0000'
        let seat = 1
        let date = '2019-12-10'
        let time = '9:00'
        let cost = 0
        let age = 'adult'
        let way = 'oneway'
        let state = 0
        let seatList = []
        let id=""
        let level=0;
        if (props.location.state) {
            console.log(props.location.state)
            peoplenum = props.location.state.peoplenum
            departure = props.location.state.departure
            destination = props.location.state.destination
            seatList = props.location.state.seatList
            date = props.location.state.date
            time = props.location.state.time
            cost = props.location.state.cost
            way = props.location.state.way
            age = props.location.state.age
            card = props.location.state.card
            cardnum = props.location.state.cardnum
            state = props.location.state.state
            seat = props.location.state.seat
            disdegree = props.location.state.disdegree
            id = props.location.state.id
            level=props.location.state.level
        }
        this.state = {
            redirect:false,
            dropdownOpen: false,
            radioSelected: 2,
            peoplenum: peoplenum,
            disdegree: disdegree,
            departure: departure,
            destination: destination,
            card: card,
            cardnum: cardnum,
            seat: seat,
            seatList: seatList,
            date: date,
            time: time,
            cost: cost,
            redirect: false,
            age: age,
            way: way,
            modal: false,
            id:id,
            state:state,
            level:level
        };
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    toggleSmall() {

        this.setState({
            small: !this.state.small,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSumbit = (e) => {
        e.preventDefault()
        let url = "http://localhost:5000/api/reservation/edit"
        let id=this.state.id
        let departure = this.state.departure
        let arrival = this.state.destination
        let date = this.state.date
        let time = this.state.time
        let peoplenum = this.state.peoplenum
        let disdegree = this.state.disdegree
        let age = this.state.age
        let way = this.state.way
        let card = this.state.card
        let cardnum = this.state.cardnum
        let state = this.state.state
        let seat = this.state.seat
        let level = this.state.level
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id:id, departure: departure, arrival: arrival, date: date, time: time, peoplenum: peoplenum,
                age: age, way: way, card: card, cardnum: cardnum, state: state, seat: seat, level:level, disdegree: disdegree
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    const errorCode = data.error
                    alert("잘못된 접근입니다.")
                    window.location.reload()
                    return
                }
                return <Redirect to={{pathname: "/confirmReservation"}}></Redirect>
            })
            .catch(err => console.log(err))
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    handleClickModal=(e)=>{
        e.preventDefault()
        let url = "http://localhost:5000/api/reservation/edit"
        let id=this.state.id
        let departure = this.state.departure
        let arrival = this.state.destination
        let date = this.state.date
        let time = this.state.time
        let peoplenum = this.state.peoplenum
        let disdegree = this.state.disdegree
        let age = this.state.age
        let way = this.state.way
        let card = this.state.card
        let cardnum = this.state.cardnum
        let state = this.state.state
        let seat = this.state.seat
        let level = this.state.level
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id:id, departure: departure, arrival: arrival, date: date, time: time, peoplenum: peoplenum,
                age: age, way: way, card: card, cardnum: cardnum, state: state, seat: seat, level:level, disdegree: disdegree
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    const errorCode = data.error
                    alert("잘못된 접근입니다.")
                    window.location.reload()
                    return
                }
                this.setState({redirect:true})
                return
            })
            .catch(err => console.log(err))
    }
    render() {
        if(this.state.redirect==true)
            return <Redirect to={{pathname: "/reservation"}}></Redirect>
        return (
            <div className="animated fadeIn">
                <Form onSubmit={this.handleSumbit}>
                    <Row>
                        <Col lg='10'>
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col>
                                        <CardHeader>
                                            <h1>좌석 정보</h1>
                                        </CardHeader>
                                    </Col>
                                    <Row>
                                        <Col xs="6">
                                            <CardHeader>인원수</CardHeader>
                                            <CardBody>{this.state.peoplenum} 명</CardBody>
                                        </Col>
                                        <Col xs="6">
                                            <CardHeader>출발지</CardHeader>
                                            <CardBody>{convertTolocal[this.state.departure]}</CardBody>
                                        </Col>
                                    </Row>
                                    <Col xs="12">
                                        <Row>
                                            <Col>
                                                <CardHeader>
                                                    장애 정도
                                                </CardHeader>
                                                <CardBody>{convertTodisdegree[this.state.disdegree]}</CardBody>
                                            </Col>
                                            <Col>
                                                <CardHeader>도착지</CardHeader>
                                                <CardBody>{convertTolocal[this.state.destination]}</CardBody>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Row>
                                        <Col>
                                            <CardHeader>좌석 종류</CardHeader>
                                            <CardBody> {convertToseat[this.state.seat]}</CardBody>
                                        </Col>
                                        <Col xs="3">
                                            <CardHeader>날짜</CardHeader>
                                            <CardBody>{this.state.date}</CardBody>
                                        </Col>
                                        <Col xs="3">
                                            <CardHeader>시간</CardHeader>
                                            <CardBody>{this.state.time}</CardBody>
                                        </Col>
                                    </Row>
                                    <Col>
                                        <Card className="text-white bg-info">
                                            <CardHeader>
                                                <strong>The cost is {this.state.cost}</strong>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col xs="12">
                                                        <CardHeader>card company</CardHeader>
                                                        <CardBody>{this.state.card}</CardBody>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <CardHeader>Credit Card Number</CardHeader>
                                                        <CardBody>{this.state.cardnum}</CardBody>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </CardBody>
                                <Button onClick={this.toggle}>재결제</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>확인</ModalHeader>
                                    <ModalBody>
                                        예매를 수정하시겠습니까?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.handleClickModal}>확인</Button>{' '}
                                        <Button color="secondary" onClick={this.handleClickModal}>취소</Button>
                                    </ModalFooter>
                                </Modal>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default ConfirmEditReservation;
