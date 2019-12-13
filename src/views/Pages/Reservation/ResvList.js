import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {Button} from "@material-ui/core";
import {isLoggedIn} from "../../../utils/auth";

const converter = {
    Inchoen : "인천",
    Seoul : "서울",
    Daejeon : "대전",
    Daegu : "대구",
    Busan : "부산"
}

const convertToWay = {
    1 : "편도",
    2 : "왕복"
}

class ResvList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResvList: null,
            Data: new Array(),
            reservedTime: []
        };
    }

    componentDidMount() {
        if(!isLoggedIn()) {
            alert("로그인을 해주세요.")
            window.location.replace("/")
            return
        }
        this._getResvList()
    }

    _getTimeList = () => {
        let Timelist = []
        this.state.Data.map((reserved, _id) => {
            let now = new Date();
            let time = reserved.time.split(':')
            let date = reserved.date.split('-')
            let old = new Date(Number(date[0]), Number(date[1]), Number(date[2]), Number(time[0]), Number(time[1]), 0, 0)
            let gap = now - old;
            if (old>now) {
                Timelist[reserved._id] = true
            } else {
                Timelist[reserved._id] = false
            }
        })
        // console.log(Timelist)
        this.setState({
            reserveTime: Timelist
        })
    }

    _getResvList = async () => {
        const ResvList = await this._getResvIDList()

        var allData = this.state.Data
        for (let i = 0; i < ResvList.reservation.length; i++) {
            await Promise.resolve(this._getResvData(ResvList.reservation[i])).then((jsonResults) => {
                allData.push(jsonResults);
            })
        }
        this._getTimeList()

        this.setState({
            ResvList: ResvList,
            Data: allData
        })
    }

    _getResvIDList = () => {
        let url = "http://localhost:5000/api/user/list/reservation"
        let loginAccount = sessionStorage.getItem("account");
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({account: loginAccount})
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
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

    _getResvData = (resvID) => {
        let url = "http://localhost:5000/api/reservation/getReservation"
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: resvID})
        })
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }

    _renderResvTable = () => {
        if(this.state.Data.length === 0) {
            return "예매 목록이 없습니다."
        }

        const render = this.state.Data.map((data, i) => {
            // console.log(this.state.Data);
            return (
                <tr key={data._id}>
                    <td>
                        <Link to={"/reservation/" + data._id}
                              style={{textDecoration: "none", color: "black"}}>
                            <strong>{data.date}</strong>
                        </Link>
                    </td>
                    <td>
                        <Link to={"/reservation/" + data._id}
                              style={{textDecoration: "none", color: "black"}}>
                            <strong>{converter[data.departure]}</strong>
                        </Link>
                    </td>
                    <td>
                        <Link to={"/reservation/" + data._id} style={{textDecoration: "none", color: "black"}}>
                            <strong>{converter[data.arrival]}</strong>
                        </Link>
                    </td>
                    <td>
                        <Link to={"/reservation/" + data._id} style={{textDecoration: "none", color: "black"}}>
                            <strong>{convertToWay[data.way]}</strong>
                        </Link>
                    </td>
                    <td>{this.state.reserveTime[data._id] ? (
                        <Link to={{
                            pathname: '/editReservation', state: {
                                peoplenum: data.peoplenum,
                                disdegree: data.disdegree,
                                seat: data.seat,
                                departure: data.departure,
                                destination: data.arrival,
                                date: data.date,
                                time: data.time,
                                train: data.train,
                                route: data.route,
                            }
                        }} style={{textDecoration: "none"}}>
                            <Button variant="contained" color="primary">수정</Button>
                        </Link>
                    ) : (
                        <Button variant="contained" color="primary" disabled>수정</Button>
                    )}</td>
                    <td>{this.state.reserveTime[data._id] ? (
                        <Link to={{
                            pathname: '/confirmCancelReservation', state: {
                                // peoplenum: data.peoplenum,
                                // disdegree: data.disdegree,
                                // seat: data.seat,
                                // departure: data.departure,
                                // destination: data.arrival,
                                // date: data.date,
                                // time: data.time,
                                // train: data.seat[0],
                                id: data._id,
                                // cardcompany: data.card,
                                // cardnum: data.cardnum
                            }
                        }} style={{textDecoration: "none"}}>
                            <Button variant="contained" color="secondary">취소</Button>
                        </Link>
                    ) : (
                        <Button variant="contained" color="secondary" disabled>취소</Button>
                    )}</td>
                </tr>
            )
        })
        return render
    }

    render() {
        // const userList = usersData.filter((user) => user.id < 10)

        if (this.state.Data == null) {
            alert("해당하는 예매 목록이 없습니다")
            return <Redirect to={{
                pathname: '/'
            }}></Redirect>
        }
        return (
            <div className="animated fadeIn" style={{marginTop : "20px"}}>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i><strong>예매목록</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover striped>
                                    <thead>
                                        <tr>
                                            <th scope="col">예매 날짜</th>
                                            <th scope="col">출발지</th>
                                            <th scope="col">도착지</th>
                                            <th scope="col">편도/왕복</th>
                                            <th scope="col">수정</th>
                                            <th scope="col">취소</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.Data ? this._renderResvTable() : <tr>
                                            <td>"Loading..."</td>
                                        </tr>}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ResvList;
