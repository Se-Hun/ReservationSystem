import React, {Component, lazy, Suspense} from 'react';
import {Redirect} from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import Dashboard from '../../Dashboard';
import {isLoggedIn} from "../../../utils/auth";
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
    Form
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const defaultProps={
    peoplenum: 0,
    disdegree: 'Enter your disdegree',
    seat: 'Enter your seat',
    departure: 'Enter your departure',
    destination: 'Enter your destination',
    date: 'Enter your date',
    time: 'Enter your time',
}

class SearchRoutenSeat extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            peoplenum: 1,
            disdegree: 1,
            seat: 1,
            train: 1,
            departure: this.props.location.state ? this.props.location.state.departure : defaultProps.departure,
            destination: this.props.location.state ? this.props.location.state.destination : defaultProps.destination,
            date: this.props.location.state ? this.props.location.state.date : defaultProps.date,
            time: this.props.location.state ? this.props.location.state.time : defaultProps.time,
            redirect: false,
            routeList: null
        };
    }
    // componentDidMount() {
    //     this._getRouteList()
    // }

    _getRouteList = async () => {
        const RouteList = await this._callApi()
        this.setState({
            routeList: RouteList,
        })
    }
    _callApi = () => {
        let url = "http://localhost:5000/routes/trainRoute/search_path"
        let departure= this.state.departure
        let arrival = this.state.destination
        let date = this.state.date
        let time = this.state.time

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({departure: departure, arrival:arrival, date: date, time: time})
            }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }

    fetchContent = (id) => {
        return <Redirect to={{
            pathname: '/searchSeat',
            state: {
                peoplenum: this.state.peoplenum,
                disdegree: this.state.disdegree,
                seat: this.state.seat,
                departure: this.state.departure,
                destination: this.state.destination,
                date: this.state.date,
                time: this.state.time,
                train: this.state.train
            }
        }}></Redirect>
    }

    _renderRouteTable = () => {
        console.log(this.state)
        this._getRouteList()
        console.log(this.state.routeList)
        const render = this.state.routeList.map((route, _id) => {
            return (
                <tr key={_id} onClick={() => this.fetchContent(route._id)}>
                    <td>{route}</td>
                </tr>
            )
        })
        return render
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hanleSearchClick = (e) =>{
        this._renderRouteTable()
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render() {
        console.log(this.state.departure);
        return (
            <div className="animated fadeIn">
                <Form>
                <Row>
                    <Col sm="6" lg="6">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">인원수</Label>
                                        <Input type="select" name="peoplenum" value={this.state.peoplenum} onChange={this.handleChange} required>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="disdegree">장애 정도</Label>
                                        <Input type="select" name="disdegree" value={this.state.disdegree} onChange={this.handleChange} required>
                                            <option value="1">일반</option>
                                            <option value="2">1급</option>
                                            <option value="3">2급</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">좌석 종류</Label>
                                            <Input type="select" name="seat" onChange={this.handleChange} value={this.state.seat}
                                                   id="seat" required>
                                            <option value="1">일반</option>
                                            <option value="2">우등</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">기차 종류</Label>
                                            <Input type="select" name="train" onChange={this.handleChange} value={this.state.train}
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
                                        <Label htmlFor="name">출발지</Label>
                                        <Input type="select" name="departure" onChange={this.handleChange}
                                               id="departure" value={this.state.departure} required>
                                            <option value="Inchoen">인천</option>
                                            <option value="Seoul">서울</option>
                                            <option value="Daejoen">대전</option>
                                            <option value="Gwangju">광주</option>
                                            <option value="Daegu">대구</option>
                                            <option value="Busan">부산</option>
                                            <option value="Ulsan">울산</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">도착지</Label>
                                        <Input type="select" name="destination" onChange={this.handleChange}
                                               id="destination" value={this.state.destination} required>
                                            <option value="Inchoen">인천</option>
                                            <option value="Seoul">서울</option>
                                            <option value="Daejoen">대전</option>
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
                                            <Label htmlFor="name">날짜</Label>
                                            <Input type="date" name="date" onChange={this.handleChange}
                                                   id="date" value={this.state.date} required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">시간</Label>
                                            <Input type="time" name="time" onChange={this.handleChange}
                                                   id="time" value={this.state.time} required/>
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col></Col>
                                <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                    <Button block color="primary" onClick={this.hanleSearchClick}>조회</Button>
                                </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </Form>
                <Col>
                    <Card className="text-white bg-info">
                        <CardBody className="pb-0">
                            {this.state.routeList ? this._renderRouteTable() : ("해당하는 노선 목록이 없습니다.")}
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}
export default SearchRoutenSeat;
