import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
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

        // console.log(departure)
        // console.log(destination)
        // console.log(date)
        // console.log(time)

        this.state = {
            isModalOpen : false,
            // dropdownOpen: false,
            peoplenum: 1,
            disdegree: 1,
            seat: 1,
            train: 1,
            departure : departure,
            destination : destination,
            date: date,
            time: time,
            redirect: false,
            routeList: null,
            route: null,
            seatList : null,
            reservedList : null,
            presentCar : "2" // 현재 칸을 Default로 2번 칸으로 지정
        };
    }

    _openModal = async (Info) => {
        // console.log(Info)

        let seats = await this._callApiForSaetList(Info)
        let reservedSeats = await this._callApiForReservedSaetList(Info)

        // console.log(seats)
        // console.log(reservedSeats)
        // console.log(presentCar)

        this.setState({
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

    _callApiForSaetList = (Info) => {
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
                // console.log(data)
                return data
            })
            .catch(err => {
                console.log(err)
            })

    }

    _callApiForReservedSaetList = (Info) => {
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
                // console.log(data)
                return data
            })
            .catch(err => {
                console.log(err)
            })

    }

    _getRouteList = async () => {
        const RouteList = await this._callApi()
        // console.log(RouteList)
        this.setState({
            routeList: RouteList,
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/trainRoute/search_path"
        let departure = this.state.departure
        let arrival = this.state.destination
        let date = this.state.date
        let time = "03:00" // this.state.time <= 이거 고쳐야함!!

        // console.log(this.state)

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

        // console.log(departure)
        // console.log(arrival)
        // console.log(date)
        // console.log(time)

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({departure: departure, arrival: arrival, date: date, time: time})
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }

    // fetchContent = (e, route) => {
    //     console.log(route)
    //     this.setState({
    //         route: route
    //     })
    // }

    _renderRouteTable = () => {
        // console.log(this.state.routeList)
        let now = this.state.time
        if(now === null || now === undefined) {
            now = "00:00"
        }
        now = now.split(':')

        const render = this.state.routeList.map((route, _id) => {
            // console.log(route)

            let deptime = (route.deptime).split(':')
            if((now[0]-deptime[0])>0) {
                return null
            }

            const trainInfo = route.trainInfo

            return (
                <tr key={_id}>
                    <td>{trainInfo}</td>
                    <td>{route.laststop}</td>
                    <td>{route.deptime}</td>
                    <td>{route.arrtime}</td>
                    <td>
                        {/*<Link to={{pathname: '/searchSeat', state: {*/}
                        {/*        peoplenum: this.state.peoplenum,*/}
                        {/*        disdegree: this.state.disdegree,*/}
                        {/*        seat: this.state.seat,*/}
                        {/*        departure: this.state.departure,*/}
                        {/*        destination: this.state.destination,*/}
                        {/*        date: this.state.date,*/}
                        {/*        time: this.state.time,*/}
                        {/*        train: this.state.train,*/}
                        {/*        route: this.state.route,*/}
                        {/*    }}} style={{textDecoration: "none"}}>*/}
                            <Button variant="contained" size="small" onClick={() => this._openModal(trainInfo)}>확인</Button>
                        {/*</Link>*/}
                    </td>
                </tr>
            )

        })

        // console.log(render)
        if(render === null || render === undefined || render === "" || render.length === 0) {
            // console.log("aa")
            // console.log(render)
            return "해당하는 노선 목록이 없습니다."
        }
        return render
    }

    // toggle() {
    //     this.setState({
    //         dropdownOpen: !this.state.dropdownOpen,
    //     });
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hanleSearchClick = (e) => {
        this._getRouteList()
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    // _debug = () => {
    //     console.log(this.state)
    // }

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

        console.log(seatInfo)

        const render = []
        for(var i = 0; i < seatInfo.length; i = i+2) {
            const id1 = seatInfo[i].id
            const id2 = seatInfo[i+1].id

            render.push(
                <div className="col-2">
                    <Button variant="contained"
                            className="btn btn-light mr-3"
                            style={{width: "80%", marginBottom: "30px"}}>{id1}</Button>
                    <Button variant="contained"
                            className="btn btn-light mr-3"
                            style={{width: "80%"}}>{id2}</Button>
                </div>
            )
        }

        // let col_render = []
        // render.push(<div className="row justify-content-between my-2">)

        // for(var i = 0; i < seatInfo.length; i = i+2) {
        //     console.log(seatInfo[i].id)
        //     const id = seatInfo[i].id
        //     const id2 = seatInfo[i+1].id
        //
        //     col_render.push(
        //         <div className="col-2">
        //             <button type="button" className="btn btn-light mr-3">{id}</button>
        //             <button type="button" className="btn btn-light mr-3">{id2}</button>
        //         </div>
        //     )
        // }

        // console.log(col_render)

        // let row_render = []
        // row_render.push(
        //     <div className="row justify-content-between my-2">
        //         {
        //             col_render.map((col, id) => {
        //                 return (
        //                     {col}
        //                 )
        //             })
        //         }
        //     </div>
        // )

        // console.log(row_render.length)

        // console.log(seatInfo)
        // const render = seatList.map((seat, id) => {
        //     return(
        //         <div className="row justify-content-between my-2">
        //             <div className="col-5">
        //                 <button type="button" className="btn btn-light mr-3">Light</button>
        //                 <button type="button" className="btn btn-light">Light</button>
        //             </div>
        //             <div className="col-5 ml-auto">
        //                 <button type="button" className="btn btn-light mr-3">Light</button>
        //                 <button type="button" className="btn btn-light">Light</button>
        //             </div>
        //         </div>
        //     )
        // })
        // return col_render
        return render
    }

    render() {
        return (
            <div className="animated fadeIn">
                {/*<Button onClick={this._debug}>DEBUG</Button>*/}

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
                                                <Input type="select" name="train" onChange={this.handleChange}
                                                       value={this.state.train}
                                                       id="train" required>
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
                                                <option value="Gwangju">광주</option>
                                                <option value="Daegu">대구</option>
                                                <option value="Busan">부산</option>
                                                <option value="Ulsan">울산</option>
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
                                                <option value="Gwangju">광주</option>
                                                <option value="Daegu">대구</option>
                                                <option value="Busan">부산</option>
                                                <option value="Ulsan">울산</option>
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
                <Button onClick={() => this._openModal("6000")}>DEBUG</Button>
                <Modal
                    visible={this.state.isModalOpen}
                    width="90%"
                    height="50%"
                    effect="fadeInUp"
                    onClickAway={() => this._closeModal()}>
                    <div className="Container">
                        <h2 style={{textAlign: "center", marginTop: "20px"}}><strong>좌석 목록</strong></h2>
                        <h3 style={{marginTop: "20px", color: "#0067a3", textAlign: "center"}}><strong>2번칸</strong></h3>
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
                                        {/*<div className="row justify-content-between my-2">*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-5 ml-auto">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="row justify-content-between my-2">*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="row justify-content-between my-2 mb-4">*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="row justify-content-between my-2">*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-5 ml-auto">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="row justify-content-between my-2">*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-5">*/}
                                        {/*        <button type="button" className="btn btn-light mr-3">Light</button>*/}
                                        {/*        <button type="button" className="btn btn-light">Light</button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
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

class SeatColum extends Component {
    render() {
        return(
            <div>
                <Button>{this.porps.row1}</Button>
                <Button>{this.props.row2}</Button>
            </div>
        )
    }
}

// class PreviousButton extends Component {
//     _handleClick = () => {
//         console.log("hi")
//     }
//
//     render() {
//         return(
//             <Container>
//                 <i className="cui-chevron-left icons font-5xl" onClick={this._handleClick}></i>
//             </Container>
//         )
//     }
// }
//
// class PresentSeats extends Component {
//     render() {
//         return(
//             <Card>
//                 <CardBody>
//                     <div>
//                         sad
//                     </div>
//                     <div>
//                         sad
//                     </div>
//                     <div>
//                         sad
//                     </div>
//                     <div>
//                         sad
//                     </div><div>
//                         sad
//                     </div>
//                 </CardBody>
//             </Card>
//         )
//     }
// }
//
// class NextButton extends Component {
//     _handleClick = () => {
//         console.log("hi")
//     }
//
//     render() {
//         return(
//             <Container>
//                 <i className="cui-chevron-right icons font-5xl" onClick={this._handleClick}></i>
//             </Container>
//         )
//     }
// }

export default SearchRoutenSeat;
