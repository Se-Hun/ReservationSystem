import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, FormGroup, Input, Label,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
import {getId} from '../../../utils/auth'
//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
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
    인천: "Inchoen",
    서울: "Seoul",
    대전: "Daejeon",
    대구: "Daegu",
    부산: "Busan",
}
const convertTodisdegree = {
    1: "일반",
    2: "1급",
    3: "2급"
}
class ConfirmCancelReservation extends Component {
    constructor(props) {
        super(props);
        let peoplenum = 1
        let disdegree = 1
        let departure = '서울'
        let destination = '대전'
        let cardcompany = '신한'
        let cardnum = '0000 0000 0000 0000'
        let seat = 1
        let date = '2019-12-10'
        let time = '9:00'
        let cost = 0
        let train = ''
        let route = ''
        if (props.location.state) {
            peoplenum = props.location.state.peoplenum
            disdegree = props.location.state.disdegree
            departure = props.location.state.departure
            destination = props.location.state.destination
            cardcompany = props.location.state.cardcompany
            cardnum = props.location.state.cardnum
            seat = props.location.state.seat
            date = props.location.state.date
            time = props.location.state.time
            cost = props.location.state.cost
            train = props.location.state.train
            route = props.location.state.route
        }
        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            peoplenum: peoplenum,
            disdegree: disdegree,
            departure: departure,
            destination: destination,
            cardcompany: cardcompany,
            cardnum: cardnum,
            seat: seat,
            date: date,
            time: time,
            cost: cost,
            route: route,
            train: train,
        };
    }
    componentDidMount() {
        this._callUserApi()
    }

    _callCancelApi = () => {
        let url = "http://localhost:5000/api/reservation/cancel"
        let id = id
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({id: id})
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }
    _callUserApi = () => {
        let url = "http://localhost:5000/api/user/resesrve_cancel"
        let id = this._callCancelApi()
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({id: id})
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    handleClick = (e) => {
        let url = "http://localhost:5000/api/trainInfo/reservateCancel"
        let trainName = this.state.train
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({id: id})
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }
    render() {

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
                                    <Col xs="12">
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label htmlFor="peoplenum">인원수</Label>
                                                    {this.state.peoplenum}
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Label htmlFor="departure">출발지</Label>
                                                    {convertTolocal[this.state.departure]}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="12">
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label htmlFor="disdegree">장애 정도</Label>
                                                    {convertTodisdegree[this.state.disdegree]}
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Label htmlFor="destination">도착지</Label>
                                                    {convertTolocal[this.state.destination]}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="seat">좌석 종류</Label>
                                                {convertToseat[this.state.seat]}
                                            </FormGroup>
                                        </Col>
                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="date">날짜</Label>
                                                {this.state.date}
                                            </FormGroup>
                                        </Col>
                                        <Col xs="3">
                                                <Label htmlFor="time">시간</Label>
                                                {this.state.time}
                                        </Col>
                                    </Row>
                                    <Col>
                                        <Card>
                                            <CardHeader>
                                                <strong>The cost is {this.state.cost}</strong>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor="card">card company</Label>
                                                            {this.state.cardcompany}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                            <Label htmlFor="ccnumber">Credit Card Number</Label>
                                                        {this.state.cardnum}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </CardBody>
                                <CardFooter>해당 예매가 취소되었습니다.</CardFooter>
                                <Button onClick={this.handleClick}>확인</Button>
                            </Card>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default ConfirmCancelReservation;
