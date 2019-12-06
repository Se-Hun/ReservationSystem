import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import Dashboard from '../../Dashboard';
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
const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class SearchRoutenSeat extends Component {
    static defaultProps={
        peoplenum: 0,
        disdegree: 'Enter your disdegree',
        seat: 'Enter your seat',
        departure: 'Enter your departure',
        destination: 'Enter your destination',
        date: 'Enter your date',
        time: 'Enter your time',
    }
    constructor(props) {
        super(props);
        console.log(this.props.location);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            peoplenum: 0,
            disdegree: '',
            seat: '',
            departure: this.props.location.state.departure,
            destination: this.props.location.state.destination,
            date: this.props.location.state.date,
            time: this.props.location.state.time,
            redirect: false,
        };
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

    handleSubmit = (e) => {
        this.setState({
            redirect: true,
        })
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render() {
        console.log(this.state.departure);
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/searchSeat',
                state: {
                    peoplenum: this.state.peoplenum
                    disdegree: this.state.disdegree
                    seat: this.state.seat
                    departure: this.state.departure
                    destination: this.state.destination
                    date: this.state.date
                    time: this.state.time
                }
            }}></Redirect>
        }
        return (
            <div className="animated fadeIn">
                <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm="6" lg="6">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">인원수</Label>
                                        <Input type="select" name="peoplenum" onChange={this.handleChange}>
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
                                        <Input type="select" name="disdegree" onChange={this.handleChange}>
                                            <option value="1급">1급</option>
                                            <option value="2급">2급</option>
                                            <option value="3급">3급</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">좌석 종류</Label>
                                            <Input type="text" name="seat" onChange={this.handleChange}
                                                   id="seat" placeholder="Enter your seat" required/>
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col></Col>
                                <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                    <Button block color="primary">조회</Button>
                                </Col>
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
                                        <Input type="text" name="departure" onChange={this.handleChange}
                                               id="departure" placeholder={this.state.departure} required/>
                                    </FormGroup>
                                </Col>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">도착지</Label>
                                        <Input type="text" name="destination" onChange={this.handleChange}
                                               id="destination" placeholder={this.state.destination} required/>
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">날짜</Label>
                                            <Input type="date" name="date" onChange={this.handleChange}
                                                   id="date" placeholder={this.state.date} required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">시간</Label>
                                            <Input type="text" name="time" onChange={this.handleChange}
                                                   id="time" placeholder={this.state.time} required/>
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col></Col>
                                <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                    <Button type="submit" block color="primary">조회</Button>
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
                            조회테이블 위치
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}
export default SearchRoutenSeat;
