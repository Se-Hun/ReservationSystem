import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row,
    ModalHeader, ModalFooter, ModalBody, Modal
} from 'reactstrap';
import {getId} from '../../../utils/auth'

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
class ConfirmCancelReservation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleSmall = this.toggleSmall.bind(this);
        let peoplenum = 1
        let disdegree = 1
        let departure = '서울'
        let arrival = '대전'
        let card = '신한'
        let cardnum = '0000 0000 0000 0000'
        let seat = 1
        let date = '2019-12-10'
        let time = '9:00'
        let cost = 0
        let train = ''
        let route = ''
        let id=''
        if (props.location.state) {
            peoplenum = props.location.state.peoplenum
            disdegree = props.location.state.disdegree
            departure = props.location.state.departure
            arrival = props.location.state.arrival
            card = props.location.state.cardcompany
            cardnum = props.location.state.cardnum
            seat = props.location.state.seat
            date = props.location.state.date
            time = props.location.state.time
            cost = props.location.state.cost
            train = props.location.state.train
            route = props.location.state.route
            id= props.location.state.id
        }
        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            peoplenum: peoplenum,
            disdegree: disdegree,
            departure: departure,
            arrival: arrival,
            card: card,
            cardnum: cardnum,
            seat: seat,
            date: date,
            time: time,
            cost: cost,
            route: route,
            train: train,
            route: route,
            id: id,
            trainInfo:'',
            redirect: false,
            modal: false,
        };
    }
    componentDidMount() {
        this._callUserApi()
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
    _callCancelApi = () => {
        let url = "http://localhost:5000/api/reservation/cancel"
        let id = this.state.id;
        console.log(id)
        return fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"id": id})
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(err => console.log(err))
    }
    _callUserApi = async () => {
        let url = "http://localhost:5000/api/user/reserve_cancel"
        let result=this._callCancelApi()
        let id = this.state.id;
        let trainInfo;

        await Promise.resolve(result).then((jsonResults) => {
            trainInfo=jsonResults;
        })
        this.setState({
            trainInfo: trainInfo
        })

        let account=sessionStorage.account;
        console.log(account);
        return fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({account:account ,resvID: id})
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(err => console.log(err))
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    handleClick = (e) => {
    }
    handleClickModal=(e)=>{
        let url = "http://localhost:5000/api/trainInfo/reservateCancel"
        console.log(this.state.trainInfo)
        let trainName=this.state.trainInfo[0];
        let trainIndex=this.state.trainInfo[1];
        console.log(this.state.trainInfo[0])
        console.log(this.state.trainInfo[1])
        return fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({trainName: trainName, trainIndex: trainIndex})
        }).then(res => res.json())
            .then(data => {
                console.log("c")
                console.log(data)
                this.setState({
                    redirect: true
                })
                return data
            })
            .catch(err => console.log(err))
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={{pathname: '/confirmReservation'}}></Redirect>
        }
        return (
            <div className="animated fadeIn">
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
                                        <CardBody>{this.state.peoplenum}</CardBody>
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
                                                <CardBody>{this.state.disdegree}</CardBody>
                                            </Col>
                                            <Col>
                                                <CardHeader>도착지</CardHeader>
                                                <CardBody>{convertTolocal[this.state.arrival]}</CardBody>
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
                                <CardFooter className="text-white bg-info">해당 예매가 취소되었습니다.</CardFooter>
                                <Button onClick={this.toggle}>확인</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>확인</ModalHeader>
                                    <ModalBody>
                                        예매를 취소하시겠습니까?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.handleClickModal}>확인</Button>{' '}
                                        <Button color="secondary" onClick={this.handleClickModal}>취소</Button>
                                    </ModalFooter>
                                </Modal>
                            </Card>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default ConfirmCancelReservation;
