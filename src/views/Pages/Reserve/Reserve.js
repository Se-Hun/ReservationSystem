import React, {Component, lazy, Suspense} from 'react';
import { Link } from 'react-router-dom';
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

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
        };
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

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {

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
                                                <Label htmlFor="name">인원수</Label>
                                                <Input type="text" id="peoplenum"
                                                       placeholder="Enter the number of people"
                                                       required/>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="name">출발지</Label>
                                                <Input type="text" id="departure" placeholder="Enter your departure"
                                                       required/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="name">장애 정도</Label>
                                                <Input type="text" id="disdegree"
                                                       placeholder="Enter your degree of disdegree"
                                                       required/>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="name">도착지</Label>
                                                <Input type="text" id="destination" placeholder="Enter your destination"
                                                       required/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="name">좌석 종류</Label>
                                            <Input type="text" id="seat" placeholder="Enter your kind of seat"
                                                   required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name">날짜</Label>
                                            <Input type="text" id="date" placeholder="Enter your date" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs ="3">
                                        <FormGroup>
                                            <Label htmlFor="name">시간</Label>
                                            <Input type="text" id="time" placeholder="Enter your time" required/>
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
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input type="text" id="name" placeholder="Enter your name"
                                                               required/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="ccnumber">Credit Card Number</Label>
                                                        <Input type="text" id="ccnumber"
                                                               placeholder="0000 0000 0000 0000" required/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="4">
                                                    <FormGroup>
                                                        <Label htmlFor="ccmonth">Month</Label>
                                                        <Input type="select" name="ccmonth" id="ccmonth">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs="4">
                                                    <FormGroup>
                                                        <Label htmlFor="ccyear">Year</Label>
                                                        <Input type="select" name="ccyear" id="ccyear">
                                                            <option>2017</option>
                                                            <option>2018</option>
                                                            <option>2019</option>
                                                            <option>2020</option>
                                                            <option>2021</option>
                                                            <option>2022</option>
                                                            <option>2023</option>
                                                            <option>2024</option>
                                                            <option>2025</option>
                                                            <option>2026</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs="4">
                                                    <FormGroup>
                                                        <Label htmlFor="cvv">CVV/CVC</Label>
                                                        <Input type="text" id="cvv" placeholder="123" required/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Row>
                                <Col></Col>
                                <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                    <Link to="/confirmReservation" className="nav-link">
                                    <Button block color="primary">예매</Button>
                                    </Link>
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
