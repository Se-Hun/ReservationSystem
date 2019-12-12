import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    Form,
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';

const converter = {
    Inchoen : "인천",
    Seoul : "서울",
    Daejeon : "대전",
    Daegu : "대구",
    Busan : "부산"
}

const convertToTrainId = {
    KTX : "1",
    무궁화호 : "2",
    새마을호 : "3"
}

const convertToTrainKind = {
    1 : "KTX",
    2 : "무궁화호",
    3 : "새마을호"
}

class SearchRoutenSeat extends Component {

    constructor(props) {
        super(props);

        let departure = null
        let destination = null
        let date = null
        let time = null
        if (props.location.state) {
            departure = props.location.state.departure
            destination = props.location.state.destination
            date = props.location.state.date
            time = props.location.state.time
        }

        this.state = {
            Redirect : false,
            isModalOpen : false,
            peoplenum: "1", // 인원수
            disdegree: "1", // 장애 정도(일반, 1급, 2급)
            seat: "1", // 좌석 종류(일반, 우등)
            kind: "1", // 선택한 기차 종류(ktx, 무궁화호, 새마을호)
            age : "children", // 연령대(children : 20세 미만, adult : 20세 이상)
            way : "1", // 편도/왕복(1 : 편도, 2 : 왕복)
            departure : departure, // 검색할 출발지
            destination : destination, // 검색할 도착지
            date: date, // 검색할 날짜
            time: time, // 검색할 시간
            routeList: null, // 출발지-도착지를 통해 검색한 노선 목록
            seatList : null, // back-end에서 받아온 현재 기차의 전체 좌석 목록
            reservedList : null, // back-end에서 받아온 현재 기차의 좌석에서 예약된 목록
            presentCar : "2", // 현재 칸을 Default로 2번 칸으로 지정
            selectedTrainNum : "",
            selectedSeatList : [] // 유저가 최종적으로 선택한 좌석 목록
        };
    }

    _openModal = async (Info) => {

        let seats = await this._callApiForSeatList(Info)
        let reservedSeats = await this._callApiForReservedSeatList(Info)

        this.setState({
            selectedTrainNum : Info.split("_")[0],
            seatList: seats,
            reservedList : reservedSeats,
            isModalOpen: true,
        });
    }

    _closeModal() {
        this.setState({
            isModalOpen: false
        });
    }

    _callApiForSeatList = (Info) => {
        let url = "http://localhost:5000/api/trainInfo/get_seat"

        let trainName = Info

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                trainName: trainName
            })
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })

    }

    _callApiForReservedSeatList = (Info) => {
        let url = "http://localhost:5000/api/trainInfo/get_reserved"

        let trainName = Info

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                trainName: trainName
            })
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })

    }

    _getRouteList = async () => {
        const RouteList = await this._callApi()

        this.setState({
            routeList: RouteList,
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/trainRoute/search_path"
        let departure = this.state.departure
        let arrival = this.state.destination
        let date = this.state.date
        let time = this.state.time // this.state.time <= 이거 고쳐야함!!

        if(departure === null || departure === undefined) {
            departure = "Inchoen"
        }
        if(arrival === null || arrival === undefined) {
            arrival = "Inchoen"
        }
        if(date === null || date === undefined) {
            alert("날짜를 입력해주세요.")
            window.location.reload()
        }
        if(time === null || time === undefined) {
            time = "00:00"
        }

        // console.log(this.state)

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({departure: departure, arrival: arrival, date: date, time: time})
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }

    _renderRouteTable = () => {
        let now = this.state.time
        if(now === null || now === undefined) {
            now = "00:00"
        }
        now = now.split(':')

        // console.log(this.state.routeList)

        const render = this.state.routeList.map((route, _id) => {
            let deptime = (route.deptime).split(':')
            if((now[0]-deptime[0])>0) {
                return null
            }

            const trainInfo = route.trainInfo.split("_")
            const trainNum = trainInfo[0]
            const trainKind = trainInfo[1]

            // console.log(trainKind)

            if(convertToTrainId[trainKind] !== this.state.kind) {
                // console.log(this.state.kind)
                // console.log(trainKind)
                // console.log(convertToTrainId[trainKind])
                return null
            }

            // console.log(this.state.kind)
            // console.log(trainKind)

            return (
                <tr key={_id}>
                    <td>{trainNum}</td>
                    <td>{trainKind}</td>
                    <td>{converter[route.laststop]}</td>
                    <td>{route.deptime}</td>
                    <td>{route.arrtime}</td>
                    <td>
                        <Button variant="contained" size="small" onClick={() => this._openModal(trainNum + "_" + trainKind)}>확인</Button>
                    </td>
                </tr>
            )

        })

        if(render === null || render === undefined || render === "" || render.length === 0) {
            return "해당하는 노선 목록이 없습니다."
        }
        return render
    }

    handleChange = (e) => {
        if(e.target.name === "seat") {
            if(e.target.value === "2") {
                this.setState({
                    [e.target.name] : e.target.value,
                    presentCar : "3"
                })
            }
            else {
                this.setState({
                    [e.target.name] : e.target.value,
                    presentCar : "2"
                })
            }
            return
        }

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hanleSearchClick = (e) => {
        this._getRouteList()
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    _renderSeats = () => {
        let seatList = this.state.seatList
        let reservedList = this.state.reservedList
        let presentCar = this.state.presentCar
        let seatInfo = []

        if(seatList.error) {
            return "이 칸에는 좌석이 없습니다."
        }
        if(reservedList.error) {
            return "이 칸에는 좌석이 없습니다."
        }

        seatList = seatList.seats
        reservedList = reservedList.reserved

        seatList = seatList.map((seat, id) => {
            const splited = seat.split("_")

            if(splited[1] === presentCar) {
                return splited[2]
            }
        })

        reservedList = reservedList.map((seat, id) => {
            const splited = seat.id.split("_")

            if(seat.state === "o" && splited[0] === presentCar) {
                return splited[1]
            }
        })

        for(var i = 0; i < seatList.length; i++) {
            if(seatList[i] === undefined || seatList[i] === null) {
                continue
            }
            else {
                seatInfo.push({
                    id : seatList[i],
                    state : (reservedList[i] !== undefined) ? ("o") : ("x")
                })
            }
        }

        const render = []
        for(var i = 0; i < seatInfo.length; i = i+2) {
            const id1 = seatInfo[i].id
            const state1 = seatInfo[i].state
            const id2 = seatInfo[i+1].id
            const state2 = seatInfo[i+1].state

            render.push(
                <div className="col-2">
                    {
                        (state1 === "x") ? (
                            <Button variant="contained"
                                    className="btn btn-light mr-3"
                                    style={{width: "80%", marginBottom: "30px"}}
                                    onClick={() => this._handleSeatClick(id1)}>
                                {id1}
                            </Button>
                        ) : (
                            <Button variant="contained"
                                    disabled
                                    className="btn btn-light mr-3"
                                    style={{width: "80%", marginBottom: "30px"}}>
                                {id1}
                            </Button>
                        )
                    }
                    {
                        (state2 === "x") ? (
                            <Button variant="contained"
                                    className="btn btn-light mr-3"
                                    style={{width: "80%"}}
                                    onClick={() => this._handleSeatClick(id2)}>
                                {id2}
                            </Button>
                        ) : (
                            <Button variant="contained"
                                    disabled
                                    className="btn btn-light mr-3"
                                    style={{width: "80%"}}>
                                {id2}
                            </Button>
                        )
                    }
                </div>
            )
        }
        return render
    }

    _handleSeatClick = (id) => {
        const result = this.state.presentCar + "_" + id

        let previousSelectedSeatList = this.state.selectedSeatList
        previousSelectedSeatList.push(result)

        this.setState({
            selectedSeatList : previousSelectedSeatList
        })

        if(previousSelectedSeatList.length.toString() === this.state.peoplenum) {
            this.setState({
                Redirect: true
            })
        }
        else {
            alert("고객님 한 분의 좌석이 선택되었습니다.")
        }
    }

    _handleLeftClick = () => {
        const presentCar = this.state.presentCar

        if(parseInt(presentCar) === 1) {
            alert("이 열차의 첫번째 호차입니다.")
            return
        }
        if(parseInt(presentCar) === 3 && this.state.seat === "2") {
            alert("우등 좌석은 3호차에서만 선택할 수 있습니다.")
            return
        }

        this.setState({
            presentCar: (parseInt(presentCar) - 1).toString()
        })
    }

    _handleRightClick = () => {
        const presentCar = this.state.presentCar

        if(parseInt(presentCar) === 3) {
            alert("이 열차의 마지막 호차입니다.")
            return
        }
        if(parseInt(presentCar) === 2 && this.state.seat === "1") {
            alert("일반 좌석은 1호차와 2호차에서만 선택할 수 있습니다.")
            return
        }

        this.setState({
            presentCar: (parseInt(presentCar) + 1).toString()
        })
    }

    render() {
        if (this.state.Redirect) {
            return <Redirect to={{
                pathname: '/reserve',
                state: {
                    peoplenum: this.state.peoplenum, // 인원수
                    disdegree: this.state.disdegree, // 장애 정도(일반, 1급, 2급)
                    departure : this.state.departure, // 검색할 출발지
                    destination : this.state.destination, // 검색할 도착지
                    seat: this.state.seat, // 좌석 종류(일반, 우등)
                    kind: this.state.kind, // 선택한 기차 종류(ktx, 무궁화호, 새마을호)
                    age : this.state.age, // 연령대(children : 20세 미만, adult : 20세 이상)
                    way : this.state.way, // 편도/왕복(1 : 편도, 2 : 왕복)
                    date: this.state.date, // 검색할 날짜
                    time: this.state.time, // 검색할 시간
                    selectedTrainNum : this.state.selectedTrainNum, // 선택된 기차 번호
                    selectedSeatList : this.state.selectedSeatList, // 유저가 최종적으로 선택한 좌석 목록["칸_좌석", ...]
                }
            }}></Redirect>
        }

        return (
            <div className="animated fadeIn">
                <Form style={{marginTop: "20px"}}>
                    <Row>
                        <Col sm="6" lg="6">
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>인원수</strong></Label>
                                            <Input type="select" name="peoplenum" value={this.state.peoplenum}
                                                   onChange={this.handleChange} required>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="disdegree" style={{color: "black"}}><strong>장애 정도</strong></Label>
                                            <Input type="select" name="disdegree" value={this.state.disdegree}
                                                   onChange={this.handleChange} required>
                                                <option value="1">일반</option>
                                                <option value="2">1급</option>
                                                <option value="3">2급</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="age" style={{color: "black"}}><strong>연령대</strong></Label>
                                                <Input type="select" name="age" onChange={this.handleChange}
                                                       value={this.state.age}
                                                       id="age" required>
                                                    <option value="children">20세 미만</option>
                                                    <option value="adult">20세 이상</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <Label htmlFor="way" style={{color: "black"}}><strong>편도/왕복</strong></Label>
                                            <Input type="select" name="way" onChange={this.handleChange}
                                                   value={this.state.way}
                                                   id="way" required>
                                                <option value="1">편도</option>
                                                <option value="2">왕복</option>
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>좌석 종류</strong></Label>
                                                <Input type="select" name="seat" onChange={this.handleChange}
                                                       value={this.state.seat}
                                                       id="seat" required>
                                                    <option value="1">일반</option>
                                                    <option value="2">우등</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
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
                                    </Row>
                                    <Row>
                                        <Col></Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>출발지</strong></Label>
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
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>도착지</strong></Label>
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
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>날짜</strong></Label>
                                                <Input type="date" name="date" onChange={this.handleChange}
                                                       id="date" value={this.state.date} required/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>시간</strong></Label>
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
                                    <Row>
                                        <Col></Col>
                                        <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                            <Button variant="contained"
                                                    size="large"
                                                    color="primary"
                                                    style={{marginBottom: "10px", width: "100%"}}
                                                    onClick={this.hanleSearchClick}>조회
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
                <Card>
                    <CardBody>
                        <h2><strong>노선 목록</strong></h2>
                        <hr style={{border: "2px #e0e0e0 solid"}}/>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>기차 번호</th>
                                    <th>기차 종류</th>
                                    <th>종점</th>
                                    <th>출발 시간</th>
                                    <th>도착 시간</th>
                                    <th>조회</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.routeList ? this._renderRouteTable() : ("해당하는 노선 목록이 없습니다.")}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                {/*<Button onClick={() => this._openModal("6000_새마을")}>DEBUG</Button>*/}
                <Modal
                    visible={this.state.isModalOpen}
                    width="90%"
                    height="50%"
                    effect="fadeInUp"
                    onClickAway={() => this._closeModal()}>
                    <div className="Container">
                        <h2 style={{textAlign: "center", marginTop: "20px"}}><strong>좌석 목록</strong></h2>
                        <h3 style={{marginTop: "20px", color: "#0067a3", textAlign: "center"}}><strong>{this.state.presentCar}호차</strong></h3>
                        <Row className="p-4">
                            <Col className="col-1 ml-auto mr-auto">
                                <button type="button" className="btn btn-primary" onClick={this._handleLeftClick}>
                                    <i className="cui-chevron-left icons font-5xl"/>
                                </button>
                            </Col>
                            <Col className="col-10 ml-auto mr-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row justify-content-between my-2">
                                        {this.state.seatList ? (this._renderSeats()) : ("Loading...")}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-1 ml-auto mr-auto">
                                <button type="button" className="btn btn-primary" onClick={this._handleRightClick}>
                                    <i className="cui-chevron-right icons font-5xl"/>
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default SearchRoutenSeat;
