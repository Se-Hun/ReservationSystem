import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {isLoggedIn, getId} from '../../../utils/auth'
import {
    Button,
    Table,
} from 'reactstrap';

const data = [
    {id: "111", time: "1:00"},
    {id: "222", time: "22:00"}
]

class ConfirmReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            isCancel: false,
            isEdit: false,
            ReserveList: null,
            id: getId(),
            reserveTime: [],
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }


    componentDidMount() {
        this._getReserveList()
    }

    _getReserveList = async () => {
        const ReserveList = await this._callApi()
        this.setState({
            ReserveList: data,
        })
        this._getTimeList()
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/reservation/getReservation"
        let id = this.state.id
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({id: id})
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }

    _getTimeList = async () => {
        let Timelist = []
        console.log(this.state.ReserveList)
        if (this.state.ReserveList == null) {
            alert("해당하는 예매 목록이 없습니다")
            return <Redirect to={{
                pathname: '/'
            }}></Redirect>
        }
        this.state.ReserveList.map((reserved, _id) => {
            let now = new Date().getHours();
            let time = reserved.time.split(':')
            let old = time[0]
            console.log(now)
            console.log(old)
            let gap = now - old;
            if (gap > 0) {
                Timelist[reserved.id] = true
            } else {
                Timelist[reserved.id] = false
            }
        })
        this.setState({
            reserveTime: Timelist
        })
    }


    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    _renderReserveTable = () => {
        const render = this.state.ReserveList.map((reserved, _id) => {
            console.log(this.state.isEdit)
            return (
                <tr key={_id}>
                    <td>{reserved.id}</td>
                    <td>{this.state.reserveTime[reserved.id] ? (
                        <Link to={{
                            pathname: '/editReservation', state: {
                                peoplenum: reserved.peoplenum,
                                disdegree: reserved.disdegree,
                                seatList: reserved.seat,
                                departure: reserved.departure,
                                destination: reserved.destination,
                                date: reserved.date,
                                time: reserved.time,
                                train: reserved.train,
                                route: reserved.route,
                            }
                        }} style={{textDecoration: "none"}}>
                            <Button>수정</Button>
                        </Link>
                    ) : (
                        <Button disabled>수정</Button>
                    )}</td>
                    <td>{this.state.reserveTime[reserved.id] ? (
                        <Link to={{
                            pathname: '/confirmCancelReservation', state: {
                                peoplenum: reserved.peoplenum,
                                disdegree: reserved.disdegree,
                                seatList: reserved.seat,
                                departure: reserved.departure,
                                destination: reserved.destination,
                                date: reserved.date,
                                time: reserved.time,
                                train: reserved.train,
                                route: reserved.route,

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
        if (!isLoggedIn()) {
            alert("로그인을 해주십시오")
            return <Redirect to={{
                pathname: '/login'
            }}></Redirect>
        } else {
            return (
                <div className="animated fadeIn">
                    <Table>
                        <thead>
                        <tr>
                            <th>예매 목록</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.ReserveList ? this._renderReserveTable() : ("Loading...")}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default ConfirmReservation;
