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
import {isLoggedIn, getId} from '../../../utils/auth'

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
        if (!isLoggedIn()) {
            alert("로그인이 필요합니다.")
            return <Redirect to={{pathname:"/Login"}}></Redirect>
        }
        if(this.state.redirect){
            return <Redirect to={{pathname: '/confirmReservation'}}></Redirect>
        }
        return (
            <div className="animated fadeIn">
                    <Row style={{marginTop : "20px"}}>
                        <Col lg='10'>
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col>
                                        <h1 style={{color: "black", marginBottom: "10px"}}><strong>예매 취소 정보</strong></h1>
                                    </Col>
                                    <Row style={{marginBottom : "10px"}}>
                                        <Col xs="6">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>인원수</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.peoplenum}</strong></CardBody>
                                        </Col>
                                        <Col>
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>장애 정도</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.disdegree}</strong></CardBody>
                                        </Col>
                                    </Row>
                                    <Row style={{marginBottom : "10px"}}>
                                            <Col xs="6">
                                                <CardHeader style={{backgroundColor: "#0067a3"}}>출발지</CardHeader>
                                                <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertTolocal[this.state.departure]}</strong></CardBody>
                                            </Col>
                                            <Col>
                                                <CardHeader style={{backgroundColor: "#0067a3"}}><strong>도착지</strong></CardHeader>
                                                <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertTolocal[this.state.arrival]}</strong></CardBody>
                                            </Col>
                                    </Row>
                                    <Row style={{marginBottom : "10px"}}>
                                        <Col>
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>좌석 종류</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertToseat[this.state.seat]}</strong></CardBody>
                                        </Col>
                                        <Col xs="3">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>날짜</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.date}</strong></CardBody>
                                        </Col>
                                        <Col xs="3">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>시간</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.time}</strong></CardBody>
                                        </Col>
                                    </Row>
                                    <Col>
                                        <Card className="text-white bg-info">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}>
                                                <h3><strong>현재 요금 : {this.state.cost}</strong></h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col xs="12">
                                                        <CardHeader style={{backgroundColor: "#0067a3"}}><strong>카드 회사</strong></CardHeader>
                                                        <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.card}</strong></CardBody>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <CardHeader style={{backgroundColor: "#0067a3"}}><strong>카드 번호</strong></CardHeader>
                                                        <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.cardnum}</strong></CardBody>
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
