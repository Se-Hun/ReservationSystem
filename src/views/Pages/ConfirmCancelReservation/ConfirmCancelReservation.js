/*import React, {Component} from 'react';
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
*/

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Modal from 'react-awesome-modal';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';
import {Button} from "@material-ui/core";

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
    1 : "일반",
    2 : "1급",
    3 : "2급"
}
const convertToWay = {
    1 : "편도",
    2 : "왕복"
}
const convertToAge = {
    children : "20세 미만",
    adult : "20세 이상"
}

class ConfirmCancelReservation extends Component {
    constructor(props) {
        super(props);

        let id=''
        if(props.location.state) {
            id = props.location.state.id
        }

        this.state = {
            id: id, // 예약 id값
            trainInfo : "", // 기차 정보("번호_기차종류")
            seat : "", // 좌석 번호 리스트
            departure : "", // 출발지
            arrival : "", // 도착지
            date : "", // 날짜
            time : "", // 시간
            peoplenum : "", // 인원수
            age : "", // 연령대(children : 20세 미만, adult : 20세 이상)
            way : "", // 편도/왕복(1: 편도, 2 : 왕복)
            card : "", // 카드 회사
            cardnum : "", // 카드 번호
            state : "", // 결제 상태
            level : "", // 좌석 종류(일반, 우등)
            disdegree : "" // 장애 정도(일반, 1급, 2급)
        };
    }

    componentDidMount() {
        this._getResvData()
    }

    _openModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    _closeModal = () => {
        this.setState({
            isModalOpen: false
        });
    }

    _runReservationCancel = async () => {
        await this._callCancelApi()
        console.log("aa")
        await this._callUserApi()
        console.log(" bb")
        await this._callTrainInfoApi()
        console.log("cc")
    }

    // Remove Reservation
    _callCancelApi = () => {
        let url = "http://localhost:5000/api/reservation/cancel"
        let id = this.state.id;
        // console.log(id)
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

    // Remove User Reservation
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

    // Remove Reservation in TrainInfo
    _callTrainInfoApi=()=>{
        let url = "http://localhost:5000/api/trainInfo/reservateCancel"
        console.log(this.state.trainInfo)
        let trainName=this.state.trainInfo[0];
        let trainIndex=this.state.trainInfo[1];

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

    _getResvData = async () => {
        const reservationContent = await this._callApiForReservationContent()

        // console.log(reservationContent)

        let seat = []
        for(var i = 1; i < reservationContent.seat.length; i++) {
            console.log(reservationContent.seat[i])
            seat.push(reservationContent.seat[i])
        }

        console.log(reservationContent.seat)

        this.setState({
            isModalOpen : false,
            trainInfo : reservationContent.seat[0],
            seat : seat,
            departure : reservationContent.departure,
            arrival : reservationContent.arrival,
            date : reservationContent.date,
            time : reservationContent.time,
            peoplenum : reservationContent.peoplenum,
            age : reservationContent.age,
            way : reservationContent.way,
            card : reservationContent.card,
            cardnum : reservationContent.cardnum,
            state : reservationContent.state,
            level : reservationContent.level,
            disdegree : reservationContent.disdegree
        })

        console.log(this.state)
    }

    _callApiForReservationContent = () => {
        let url = "http://localhost:5000/api/reservation/getReservation"

        const id = this.state.id

        if(id === null || id === '') {
            alert("잘못된 접근입니다.")
            window.location.replace("/")
        }

        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.error) {
                    const errorCode = data.error
                    if (errorCode === 1) {
                        console.log(data.error)
                        alert(data.shouldAttribute + "을(를) 입력해주세요.")
                        return
                    } else {
                        alert("해당하는 예매 목록이 없습니다.")
                        return <Redirect to={{
                            pathname: '/'
                        }}></Redirect>
                    }
                }
                return data
            })
            .catch(err => console.log(err))
    }

    _renderSeat = () => {
        if (this.state.seat === undefined || this.state.seat === null || this.state.seat === "" || this.state.seat.length === 0) {
            return "예매된 좌석이 없습니다."
        }

        const render = this.state.seat.map((s, id) => {
            const splited = s.split("_")
            return(
                <div>{splited[0]}호차 {splited[1]}좌석</div>
            )
        })
        return render
    }

    render() {
        return(
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
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertTodisdegree[this.state.disdegree]}</strong></CardBody>
                                        </Col>
                                    </Row>
                                    <Row style={{marginBottom : "10px"}}>
                                            <Col xs="6">
                                                <CardHeader style={{backgroundColor: "#0067a3"}}><strong>출발지</strong></CardHeader>
                                                <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertTolocal[this.state.departure]}</strong></CardBody>
                                            </Col>
                                            <Col>
                                                <CardHeader style={{backgroundColor: "#0067a3"}}><strong>도착지</strong></CardHeader>
                                                <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertTolocal[this.state.arrival]}</strong></CardBody>
                                            </Col>
                                    </Row>
                                    <Row style={{marginBottom : "10px"}}>
                                        <Col xs="6">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>연령대</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertToAge[this.state.age]}</strong></CardBody>
                                        </Col>
                                        <Col>
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>편도/왕복</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertToWay[this.state.way]}</strong></CardBody>
                                        </Col>
                                    </Row>
                                    <Row style={{marginBottom: "10px"}}>
                                        <CardHeader style={{backgroundColor : "#0067a3"}}><strong>좌석 번호</strong></CardHeader>
                                        <CardBody style={{backgroundColor: "white", color: "black"}}><strong>{this.state.seat ? (this._renderSeat()) : ("...loading")}</strong></CardBody>
                                    </Row>
                                    <Row style={{marginBottom : "10px"}}>
                                        <Col xs="3">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>좌석 종류</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{convertToseat[this.state.level]}</strong></CardBody>
                                        </Col>
                                        <Col xs="3">
                                            <CardHeader style={{backgroundColor: "#0067a3"}}><strong>기차 정보</strong></CardHeader>
                                            <CardBody style={{backgroundColor: "white", color : "black"}}><strong>{this.state.trainInfo}</strong></CardBody>
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
                                <Button variant="contained" color="secondary" onClick={this._openModal} style={{marginBottom: "20px"}}>취소</Button>
                                {/*<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>*/}
                                {/*    <ModalHeader toggle={this.toggle}>확인</ModalHeader>*/}
                                {/*    <ModalBody>*/}
                                {/*        예매를 취소하시겠습니까?*/}
                                {/*    </ModalBody>*/}
                                {/*    <ModalFooter>*/}
                                {/*        <Button color="primary" onClick={this.handleClickModal}>확인</Button>{' '}*/}
                                {/*        <Button color="secondary" onClick={this.handleClickModal}>취소</Button>*/}
                                {/*    </ModalFooter>*/}
                                {/*</Modal>*/}
                            </Card>
                        </Col>
                    </Row>
                <Modal visible={this.state.isModalOpen}
                    width="40%"
                    height="20%"
                    effect="fadeInUp"
                    onClickAway={this._closeModal}>
                    <div className="Container">
                        <h2 style={{textAlign: "center", marginTop: "20px"}}><strong>정말로 결제를 취소하시겠습니까?</strong></h2>
                        <Row>
                            <Col style={{textAlign: "center", marginTop: "20px"}}>
                                <Button variant="contained" color="primary" style={{marginRight: "20px", width: "30%"}} onClick={this._runReservationCancel}>예</Button>
                                <Button variant="contained" color="secondary" style={{width: "30%"}} onClick={this._closeModal}>아니오</Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ConfirmCancelReservation