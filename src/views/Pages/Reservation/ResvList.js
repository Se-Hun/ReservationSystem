import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table, Button} from 'reactstrap';

class ResvList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResvList: null,
            Data: new Array(),
            reservedTime:[]
        };
    }

    componentDidMount() {
        this._getResvList()
    }

    _getTimeList = async () => {
        let Timelist = []
        console.log(this.state.Data)
        this.state.Data.map((reserved, _id) => {
            console.log(reserved)
            let now = new Date().getHours();
            let time = reserved.time.split(':')
            let old = time[0]
            let gap = now - old;
            if (gap > 0) {
                Timelist[reserved._id] = true
            } else {
                Timelist[reserved._id] = false
            }
        })
        console.log(Timelist)
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
        if (ResvList == null) {
            alert("해당하는 예매 목록이 없습니다")
            return <Redirect to={{
                pathname: '/'
            }}></Redirect>
        } else {
            this._getTimeList()
        }

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
                // console.log(data)
                return data
            })
            .catch(err => console.log(err))
    }

    _renderResvTable = () => {
        const render = this.state.Data.map((data, i) => {
            // console.log(this.state.Data);
            return (
                <tr key={data._id}>
                    <th scope="row"><Link to={"/reservation/" + data._id}>{data.date}</Link></th>
                    <td><Link to={"/reservation/" + data._id}>{data.departure}</Link></td>
                    <td><Link to={"/reservation/" + data._id}>{data.arrival}</Link></td>
                    <td><Link to={"/reservation/" + data._id}>{data.way}</Link></td>
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
                            <Button>수정</Button>
                        </Link>
                    ) : (
                        <Button disabled>수정</Button>
                    )}</td>
                    <td>{this.state.reserveTime[data._id] ? (
                        <Link to={{
                            pathname: '/confirmCancelReservation', state: {
                                peoplenum: data.peoplenum,
                                disdegree: data.disdegree,
                                seat: data.seat,
                                departure: data.departure,
                                destination: data.arrival,
                                date: data.date,
                                time: data.time,
                                train: data.seat[0],
                                disdegree: data.disdegree,
                                id: data._id,
                                cardcompany: data.card,
                                cardnum: data.cardnum
                            }
                        }} style={{textDecoration: "none"}}>
                            <Button>취소</Button>
                        </Link>
                    ) : (
                        <Button disabled>취소</Button>
                    )}</td>
                </tr>
            )
        })
        return render
    }

    render() {
        // const userList = usersData.filter((user) => user.id < 10)
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> 예매목록
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th scope="col">date</th>
                                        <th scope="col">departure</th>
                                        <th scope="col">arrival</th>
                                        <th scope="col">way</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.Data ? this._renderResvTable() : <tr><td>"Loading..."</td></tr>}
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
