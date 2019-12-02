import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Link } from 'react-router-dom';
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
    NavLink,
    Nav,
    NavItem,
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'

//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class ConfirmReservation extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            isCancel: false,
            isEdit: false,
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

    handleEditClick(radioSelected) {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit,
        }));
    }

    handleCancelClick(radioSelected) {
        this.setState(prevState => ({
            isCancel: !prevState.isCancel,
        }));
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="10">
                        <Card className="text-white bg-info">
                            <CardBody>
                                <Col>
                                    <strong>내용내용내용</strong>
                                </Col>
                                <Row>
                                    <Col></Col>
                                    <Col col="6" sm="2" md="2" xl>
                                                <Link to="/editReservation" className="nav-link">
                                                    <Button block color="primary" render as= "button">
                                                    예매 수정
                                                    </Button>
                                                </Link>
                                    </Col>
                                    <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                        <Link to="/confirmCancelReservation" className="nav-link">
                                            <Button block color="primary" render as= "button">
                                                예매 취소
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6" lg="6">
                        <cardBody>

                        </cardBody>
                    </Col>
                    <Col></Col>
                </Row>

            </div>
        );
    }
}

export default ConfirmReservation;
