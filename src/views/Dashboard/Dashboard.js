import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {Link, Redirect} from 'react-router-dom';
import TrainInfo from '../Pages/SearchRoutenSeat';
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
    DropdownToggle,
    Progress,
    Row,
    Table,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.state = {
            Redirect: false,
            dropdownOpen: false,
            radioSelected: 2,
            departure: '',
            destination: '',
            date: '',
            time: '',
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            Redirect: true,
        })

    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        if (this.state.Redirect) {
            console.log(this.state)
            return <Redirect to={{
                pathname: '/searchRoutenSeat',
                state: {
                    departure: this.state.departure,
                    destination: this.state.destination,
                    date: this.state.date,
                    time: this.state.time
                }
            }}></Redirect>
        }
        return (
            <div className="animated fadeIn">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col></Col>
                        <Col sm="6" lg="6">
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">출발지</Label>
                                            <Input type="text" name="departure" onChange={this.handleChange}
                                                   id="departure" placeholder="Enter your departure" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">도착지</Label>
                                            <Input type="text" name="destination" onChange={this.handleChange}
                                                   id="destination" placeholder="Enter your destination" required/>
                                        </FormGroup>
                                    </Col>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name">날짜</Label>
                                                <Input type="date" name="date" onChange={this.handleChange}
                                                       id="date" placeholder="Enter your date" required/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name">시간</Label>
                                                <Input type="text" name="time" onChange={this.handleChange}
                                                       id="time" placeholder="Enter your time" required/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                            <Button type="submit" block color="primary" render as="button">
                                                조회
                                            </Button>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row></Row>
                </form>
            </div>
        );
    }
}

export default Dashboard;
