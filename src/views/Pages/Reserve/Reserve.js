import React, {Component, lazy, Suspense} from 'react';
import {Link} from 'react-router-dom';
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

//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class Reserve extends Component {
    constructor(props) {
        super(props);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            peoplenum: this.props.location.state.peoplenum,
            disdegree: this.props.location.state.disdegree,
            seat: this.props.location.state.seat,
            departure: this.props.location.state.departure,
            destination: this.props.location.state.destination,
            date: this.props.location.state.date,
            time: this.props.location.state.time,
            cardcompany: '',
            cardnum: ''
        };
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSumbit = (e) => {
        e.preventDefault()
        let url = ""
        let formData = new FormData
        let peoplenum = this.state.peoplenum
        let disdegree = this.state.disdegree
        let departure = this.state.departure
        let destination = this.state.destination
        let cardcompany = this.state.cardcompany
        let cardnum = this.state.cardnum
        let seat = this.state.seat
        let date = this.state.date
        let time = this.state.time
        formData.append("peoplenum", peoplenum)
        formData.append("disdegree", disdegree)
        formData.append("departure", departure)
        formData.append("destination", destination)
        formData.append("seat", seat)
        formData.append("date", date)
        formData.append("time", time)
        formData.append("cardcompany", cardcompany)
        formData.append("cardnum", cardnum)
        fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (!isLoggedIn()) {
                    window.location.replace("/")
                } else {
                    window.location.replace("/confirmReservation")
                }
            })
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        if(!isLoggedIn) {
            alert("로그인을 먼저 해주십시오")
            window.location.replace("/login")
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg='10'>
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <Col>좌석 정보</Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="peoplenum">인원수</Label>
                                                <Input type="select" name="peoplenum" onChange={this.handleChange}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="departure">출발지</Label>
                                                <Input type="text" name="departure" onChange={this.handleChange} placeholder="Enter your departure"
                                                       required/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="disdegree">장애 정도</Label>
                                                    <Input type="select" name="disdegree" onChange={this.handleChange}>
                                                        <option value="1급">1급</option>
                                                        <option value="2급">2급</option>
                                                        <option value="3급">3급</option>
                                                    </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="destination">도착지</Label>
                                                <Input type="text" name="destination" onChange={this.handleChange} placeholder="Enter your destination"
                                                       required/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="seat">좌석 종류</Label>
                                            <Input type="text" name="seat" onChange={this.handleChange} placeholder="Enter your kind of seat"
                                                   required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="date">날짜</Label>
                                            <Input type="date" name="date" onChange={this.handleChange} placeholder="Enter your date" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="time">시간</Label>
                                            <Input type="text" name="time" onChange={this.handleChange} placeholder="Enter your time" required/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Col>
                                    <Card>
                                        <CardHeader>
                                            <strong>Credit Card</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="card">card company</Label>
                                                        <Input type="select" name="cardcompany" onChange={this.handleChange} id="cardcompany">
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
                                                        <Label htmlFor="ccnumber">Credit Card Number</Label>
                                                        <Input type="text" id="ccnumber" onChange={this.handleChange}
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
                                        {/*<Link to="/confirmReservation" className="nav-link">*/}
                                            <Button type="submit" block color="primary">예매</Button>
                                        {/*</Link>*/}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default Reserve;
