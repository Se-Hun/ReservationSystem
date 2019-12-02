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

//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class SearchRoutenSeat extends Component {
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
                    <Col sm="6" lg="6">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">인원수</Label>
                                        <Input type="text" id="peoplenum" placeholder="Enter your the number of peole" required/>
                                    </FormGroup>
                                </Col>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">장애 정도</Label>
                                        <Input type="text" id="disdegree" placeholder="Enter your disdegree" required/>
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">좌석 종류</Label>
                                            <Input type="text" id="seat" placeholder="Enter your seat" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">시간</Label>
                                            <Input type="text" id="date" placeholder="Enter your time" required/>
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
                                        <Input type="text" id="departure" placeholder="Enter your departure" required/>
                                    </FormGroup>
                                </Col>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="name">도착지</Label>
                                        <Input type="text" id="destination" placeholder="Enter your destination" required/>
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">날짜</Label>
                                            <Input type="text" id="date" placeholder="Enter your date" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">시간</Label>
                                            <Input type="text" id="date" placeholder="Enter your time" required/>
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
                </Row>
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
