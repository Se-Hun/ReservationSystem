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
    Form
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
import {Redirect} from 'react-router-dom'
//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

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
class EditReservation extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        let peoplenum = 1
        let disdegree = 1
        let departure = 'Seoul'
        let destination = 'Daejeon'
        let cardcompany = '신한'
        let cardnum = '0000 0000 0000 0000'
        let seat = 1
        let date = '2019-12-10'
        let time = '9:00'
        let cost = 0
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
            redirect: false
        };

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSumbit = (e) => {
        e.preventDefault()
        let url = ""
        console.log(this.state.tmpinfoList)
        this.setState({
            redirect: true
        })
        console.log(this.state.infoList)
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected,
        });
    }
    componentDidMount() {
        this._handleCost()
    }

    _handleCost = () => {
        let departure = this.state.departure
        let destination = this.state.destination
        let peoplenum = this.state.peoplenum
        let cost = costmap[departure][destination]
        console.log(cost)
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
        cost = cost * discountpercent * peoplenum
        console.log(cost+", "+discountpercent)
        this.setState({
            cost: cost
        })
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        if(this.state.redirect){
            return (
                <Redirect to={{
                    pathname: '/checkEditReserve',
                    state: {
                        infoList: this.state.infoList,
                        peoplenum : this.state.peoplenum,
                        disdegree: this.state.disdegree,
                        departure: this.state.departure,
                        destination: this.state.destination,
                        cardcompany: this.state.cardcompany,
                        cardnum: this.state.cardnum,
                        seat: this.state.seat,
                        date: this.state.date,
                        time: this.state.time,
                        cost: this.state.cost,
                    }
                }}></Redirect>
            )
        }
        return (
            <div className="animated fadeIn">
                <Form onSubmit={this.handleSumbit}>
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
                                                <Input type="select" name="peoplenum" value={this.state.peoplenum} onChange={this.handleChange}>
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
                                    </Row>
                                </Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="disdegree">장애 정도</Label>
                                                <Input type="select" name="disdegree" value={this.state.disdegree} onChange={this.handleChange}>
                                                    <option value="1급">1급</option>
                                                    <option value="2급">2급</option>
                                                    <option value="3급">3급</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="destination">도착지</Label>
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
                                    </Row>
                                </Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="seat">좌석 종류</Label>
                                            <Input type="select" name="seat" onChange={this.handleChange}
                                                   value={this.state.seat} id="seat" placeholder="Enter your seat" required>
                                                <option value="1">일반</option>
                                                <option value="2">우등</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="date">날짜</Label>
                                            <Input type="date" name="date" onChange={this.handleChange}
                                                   value={this.state.date} required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="time">시간</Label>
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
                                    <Card>
                                        <CardHeader>
                                            <strong>카드 정보</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="card">card company</Label>
                                                        <Input type="select" name="cardcompany" value={this.state.cardcompany}
                                                               onChange={this.handleChange} id="cardcompany">
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
                                                        <Input type="text" name="cardnum" onChange={this.handleChange}
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
                                        <Button type="submit" block color="primary">예매 수정</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Form>
            </div>
        );
    }
}

export default EditReservation;
