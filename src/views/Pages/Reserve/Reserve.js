import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Modal from 'react-awesome-modal';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Form
} from "reactstrap";
import {Button} from "@material-ui/core";
import {isLoggedIn} from "../../../utils/auth";

const costmap = {
    Inchoen: {
        Incheon: 0,
        Seoul: 10000,
        Daejeon: 20000,
        Daegu: 30000,
        Busan: 40000,
        Ulsan: 50000
    },
    Seoul: {
        Incheon: 10000,
        Seoul: 0,
        Daejeon: 10000,
        Daegu: 20000,
        Busan: 30000
    },
    Daejeon: {
        Incheon: 20000,
        Seoul: 10000,
        Daejeon: 0,
        Daegu: 10000,
        Busan: 20000
    },
    Daegu: {
        Incheon: 30000,
        Seoul: 20000,
        Daejeon: 10000,
        Daegu: 0,
        Busan: 10000
    },
    Busan: {
        Incheon: 40000,
        Seoul: 30000,
        Daejeon: 20000,
        Daegu: 10000,
        Busan: 0
    }
}

const converter = {
    Inchoen : "인천",
    Seoul : "서울",
    Daejeon : "대전",
    Daegu : "대구",
    Busan : "부산",
}

const convertToTrainKind = {
    1 : "KTX",
    2 : "무궁화호",
    3 : "새마을호"
}

class Reserve extends Component {
    constructor(props) {
        super(props);

        // console.log(props.location.state)

        let peoplenum = null // 인원수
        let disdegree = null // 장애 정도(일반, 1급, 2급)
        let departure = null // 예약할 출발지
        let destination = null // 예약할 도착지
        let level = null // 좌석 종류(일반, 우등)
        let kind = null // 선택한 기차 종류(ktx, 무궁화호, 새마을호)
        let age = null // 연령대(children : 20세 미만, adult : 20세 이상)
        let way = null // 편도/왕복(1: 편도, 2 : 왕복)
        let date = null // 예약할 날짜
        let time = null // 예약할 시간
        let selectedTrainNum = null // 선택된 기차
        let selectedSeatList = null // 선택된 좌석
        if (props.location.state) {
            peoplenum = props.location.state.peoplenum
            disdegree = props.location.state.disdegree
            level = props.location.state.seat
            departure = props.location.state.departure
            destination = props.location.state.destination
            kind = props.location.state.kind
            age = props.location.state.age
            way = props.location.state.way
            date = props.location.state.date
            time = props.location.state.time
            selectedTrainNum = props.location.state.selectedTrainNum
            selectedSeatList = props.location.state.selectedSeatList
        }

        this.state = {
            isModalOpen : false,
            isModalOpen2 : false,
            Redirect : false,
            peoplenum: peoplenum, // 인원수
            disdegree: disdegree, // 장애 정도(일반, 1급, 2급)
            level: level, // 좌석 종류(일반, 우등)
            departure : departure, // 예매할 출발지
            destination : destination, // 예매할 도착지
            kind: kind, // 선택한 기차 종류(ktx, 무궁화호, 새마을호)
            age : age, // 연령대(children : 20세 미만, adult : 20세 이상)
            way : way, // 편도/왕복(1 : 편도, 2 : 왕복)
            date: date, // 검색할 날짜
            time: time, // 검색할 시간
            selectedTrainNum : selectedTrainNum, // 유저가 최종적으로 선택한 기차 번호
            selectedSeatList : selectedSeatList, // 유저가 최종적으로 선택한 좌석 목록
            card : sessionStorage.getItem("cardcompany"),
            cardnum : sessionStorage.getItem("cardnum"),
            cost : 0
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _handleSumbit = async() => {
        const _id = await this._addReservationList()
        if(_id.error) {
            alert("잘못된 접근입니다.")
            window.location.reload()
            return
        }
        // console.log(_id)

        const user_reservation_result = await this._addUserReservationList(_id._id)
        if(user_reservation_result.error) {
            alert("잘못된 접근입니다.")
            window.location.reload()
            return
        }

        const peoplenum = this.state.peoplenum
        const trainName = this.state.selectedTrainNum
        const kind = this.state.kind
        const trainIndex = this.state.selectedSeatList
        for(var i = 0; i < peoplenum; i++) {
            const temp = await this._addTrainInfoReservationList(trainName + "_" + convertToTrainKind[kind], trainIndex[i])
            console.log(temp)
        }

    }
    componentDidMount() {
        this._handleCost()
    }

    _handleCost = () => {
        let departure = this.state.departure
        let destination = this.state.destination
        let peoplenum = this.state.peoplenum
        let cost = costmap[departure][destination]
        let age = this.state.age
        let way = this.state.way
        let discountpercent = 1;
        if (this.state.seat == 2) {
            cost = cost + 10000
        }
        if (this.state.kind == 2) {
            discountpercent = discountpercent * 0.8
        } else if (this.state.kind == 3) {
            discountpercent = discountpercent * 0.5
        }
        if (this.state.disdegree == 2) {
            discountpercent = discountpercent * 0.95
        } else if (this.state.disdegree == 3) {
            discountpercent = discountpercent * 0.9
        }
        if(age=='children'){
            discountpercent = discountpercent * 0.5
        }
        cost = cost * discountpercent * peoplenum * way
        this.setState({
            cost: cost
        })
        console.log(this.state.cost)
    }

    _handleClickPayment = () => {
        if(!isLoggedIn()) {
            alert("로그인을 먼저 해주세요.")
            window.location.replace("/")
            return
        }

        this._handleSumbit()
        this._openModal2()
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

    _addReservationList = () => {
        let url = "http://localhost:5000/api/reservation/reserve"

        let seat = []
        let selectedSeatList = this.state.selectedSeatList

        seat[0] = this.state.selectedTrainNum + "_" + convertToTrainKind[this.state.kind]

        for(var i = 0; i < selectedSeatList.length; i++) {
            seat[i+1] = selectedSeatList[i]
        }

        // console.log(this.state)

        let card = this.state.card

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                peoplenum : this.state.peoplenum,
                disdegree : this.state.disdegree,
                level : this.state.level,
                age : this.state.age,
                way : this.state.way,
                departure : this.state.departure,
                arrival : this.state.destination,
                date : this.state.date,
                time : this.state.time,
                state : "0",
                seat : seat,
                card : card,
                cardnum : this.state.cardnum
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.error) {
                    const errorCode = data.error
                    if (errorCode === 1) {
                        alert(data.shouldAttribute + "을(를) 입력해주세요.")
                        return
                    } else {
                        alert("잘못된 접근입니다.")
                        window.location.reload()
                        return
                    }
                }
                return data
            })
            .catch(err => console.log(err))
    }

    _addUserReservationList = (_id) => {
        let url = "http://localhost:5000/api/user/reserve"

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                account : sessionStorage.getItem("account"),
                resvID : _id
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.error) {
                    const errorCode = data.error
                    if (errorCode === 1) {
                        alert(data.shouldAttribute + "을(를) 입력해주세요.")
                        return
                    } else {
                        alert("잘못된 접근입니다.")
                        window.location.reload()
                        return
                    }
                }
                return data.state
            })
            .catch(err => console.log(err))
    }

    _addTrainInfoReservationList = (trainName, trainIndex) => {
        let url = "http://localhost:5000/api/trainInfo/reservate"

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                trainName : trainName,
                trainIndex : trainIndex
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.error) {
                    const errorCode = data.error
                    if (errorCode === 1) {
                        alert(data.shouldAttribute + "을(를) 입력해주세요.")
                        return
                    } else {
                        alert("잘못된 접근입니다.")
                        window.location.reload()
                        return
                    }
                }
                return data
            })
            .catch(err => console.log(err))
    }

    _openModal2 = () => {
        this.setState({
            isModalOpen : false,
            isModalOpen2: true
        })
    }

    _closeModal2 = () => {
        this.setState({
            Redirect : true,
            isModalOpen2: false
        })
    }

    _addBookmark = () => {
        let url = "http://localhost:5000/api/user/add/bookmark"

        const data = fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                account : sessionStorage.getItem("account"),
                bookmark : {
                    departure : this.state.departure,
                    arrival : this.state.destination
                }
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.error) {
                    const errorCode = data.error
                    if (errorCode === 1) {
                        alert(data.shouldAttribute + "을(를) 입력해주세요.")
                        return
                    } else {
                        alert("잘못된 접근입니다.")
                        window.location.reload()
                        return
                    }
                }
                return data
            })
            .catch(err => console.log(err))

        if(data.error) {
           alert("잘못된 접근입니다.")
           window.location.reload()
            return
        }

        this.setState({
            Redirect : true
        })
    }

    render() {
        if(this.state.Redirect) {
            return(
                <Redirect to={{
                    pathname : "/reservation",
                    state : {
                        peoplenum : this.state.peoplenum,
                        disdegree : this.state.disdegree,
                        level : this.state.level,
                        age : this.state.age,
                        way : this.state.way,
                        departure : this.state.departure,
                        arrival : this.state.destination,
                        date : this.state.date,
                        time : this.state.time,
                        state : "0",
                        seat : this.state.seat,
                        card : this.state.card,
                        cardnum : this.state.cardnum
                    }
                }}/>
            )
        }

        return(
            <div className="animated fadeIn" style={{marginTop: "20px"}}>
                <Form>
                <Row>
                    <Col lg='10'>
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <Col style={{color: "black"}}><h2><strong>좌석 정보</strong></h2></Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="peoplenum" style={{color: "black"}}><strong>인원수</strong></Label>
                                                <Input type="select" name="peoplenum" value={this.state.peoplenum}
                                                       onChange={this.handleChange}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="departure" style={{color: "black"}}><strong>출발지</strong></Label>
                                                <Input type="select" name="departure" onChange={this.handleChange}
                                                       id="departure" value={this.state.departure} required>
                                                    <option value="Inchoen">인천</option>
                                                    <option value="Seoul">서울</option>
                                                    <option value="Daejeon">대전</option>
                                                    <option value="Daegu">대구</option>
                                                    <option value="Busan">부산</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="disdegree" style={{color: "black"}}><strong>장애 정도</strong></Label>
                                                <Input type="select" name="disdegree" value={this.state.disdegree}
                                                       onChange={this.handleChange}>
                                                    <option value="1">일반</option>
                                                    <option value="2">1급</option>
                                                    <option value="3">2급</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="destination" style={{color: "black"}}><strong>도착지</strong></Label>
                                                <Input type="select" name="destination" onChange={this.handleChange}
                                                       id="destination" value={this.state.destination} required>
                                                    <option value="Inchoen">인천</option>
                                                    <option value="Seoul">서울</option>
                                                    <option value="Daejeon">대전</option>
                                                    <option value="Daegu">대구</option>
                                                    <option value="Busan">부산</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="age" style={{color: "black"}}><strong>연령대</strong></Label>
                                                <Input type="select" name="age" value={this.state.age}
                                                       onChange={this.handleChange}>
                                                    <option value="children">20세 미만</option>
                                                    <option value="adult">20세 이상</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="way" style={{color: "black"}}><strong>편도/왕복</strong></Label>
                                                <Input type="select" name="way" onChange={this.handleChange}
                                                       id="way" value={this.state.way} required>
                                                    <option value="1">편도</option>
                                                <option value="2">왕복</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="level" style={{color: "black"}}><strong>좌석 종류</strong></Label>
                                            <Input type="select" name="level" onChange={this.handleChange}
                                                   value={this.state.level}
                                                   id="level" placeholder="Enter your seat" required>
                                                <option value="1">일반</option>
                                                <option value="2">우등</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>기차 종류</strong></Label>
                                            <Input type="select" name="kind" onChange={this.handleChange}
                                                   value={this.state.kind}
                                                   id="kind" required>
                                                <option value="1">KTX</option>
                                                <option value="2">무궁화호</option>
                                                <option value="3">새마을호</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="date" style={{color: "black"}}><strong>날짜</strong></Label>
                                            <Input type="date" name="date" onChange={this.handleChange}
                                                   value={this.state.date} required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="time" style={{color: "black"}}><strong>시간</strong></Label>
                                            <Input type="select" name="time" onChange={this.handleChange}
                                                   id="time" value={this.state.time} required>
                                                <option value="00:00">오전 12시</option>
                                                <option value="01:00">오전 1시</option>
                                                <option value="02:00">오전 2시</option>
                                                <option value="03:00">오전 3시</option>
                                                <option value="04:00">오전 4시</option>
                                                <option value="05:00">오전 5시</option>
                                                <option value="06:00">오전 6시</option>
                                                <option value="07:00">오전 7시</option>
                                                <option value="08:00">오전 8시</option>
                                                <option value="09:00">오전 9시</option>
                                                <option value="10:00">오전 10시</option>
                                                <option value="11:00">오전 11시</option>
                                                <option value="12:00">오후 12시</option>
                                                <option value="13:00">오후 1시</option>
                                                <option value="14:00">오후 2시</option>
                                                <option value="15:00">오후 3시</option>
                                                <option value="16:00">오후 4시</option>
                                                <option value="17:00">오후 5시</option>
                                                <option value="18:00">오후 6시</option>
                                                <option value="19:00">오후 7시</option>
                                                <option value="20:00">오후 8시</option>
                                                <option value="21:00">오후 9시</option>
                                                <option value="22:00">오후 10시</option>
                                                <option value="23:00">오후 11시</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Col>
                                    <Card color="white">
                                        <CardHeader color="success"  style={{color: "", backgroundColor: "#0067a3"}}>
                                            <h3><strong>현재 요금 :  {this.state.cost}</strong></h3>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="card"><strong style={{color: "black"}}>카드 회사</strong></Label>
                                                        <Input type="select" name="card"
                                                               value={this.state.card}
                                                               onChange={this.handleChange} id="card">
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
                                                        <Label htmlFor="cardnum"><strong style={{color: "black"}}>카드 번호</strong></Label>
                                                        <Input type="text" id="cardnum" onChange={this.handleChange}
                                                               placeholder="0000 0000 0000 0000" required/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Row>
                                    <Col></Col>
                                    <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                        <Button variant="contained" color="primary" style={{width: "100%", marginBottom : "20px"}}
                                                onClick={this._openModal}>예매</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </Form>
                <Modal
                    visible={this.state.isModalOpen}
                    width="40%"
                    height="20%"
                    effect="fadeInUp"
                    onClickAway={this._closeModal}>
                    <div className="Container">
                        <h2 style={{textAlign: "center", marginTop: "20px"}}><strong>결제를 진행 하시겠습니까?</strong></h2>
                        <Row>
                            <Col style={{textAlign: "center", marginTop: "20px"}}>
                            <Button variant="contained" color="primary" style={{marginRight: "20px", width: "30%"}} onClick={this._handleClickPayment}>예</Button>
                            <Button variant="contained" color="secondary" style={{width: "30%"}} onClick={this._closeModal}>아니오</Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <Modal
                    visible={this.state.isModalOpen2}
                    width="40%"
                    height="20%"
                    effect="fadeInUp"
                    onClickAway={this._closeModal2}>
                    <div className="Container">
                        <h2 style={{textAlign: "center", marginTop: "20px"}}><strong>즐겨찾기에 추가하시겠습니까?</strong></h2>
                        <Row>
                            <Col style={{textAlign: "center", marginTop: "20px"}}>
                            <Button variant="contained" color="primary" style={{marginRight: "20px", width: "30%"}} onClick={this._addBookmark}>예</Button>
                            <Button variant="contained" color="secondary" style={{width: "30%"}} onClick={this._closeModal2}>아니오</Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Reserve;
