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
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {Redirect} from 'react-router-dom';
//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
var train = {}
var seat = {}

const data = []
const seatList = []
const defaultProps = {
    peoplenum: 1,
    disdegree: 1,
    seat: 1,
    departure: "",
    destination: "",
    date: "",
    time: "",
}
class SearchSeat extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            seatList: null,
            redirect: false,
            peoplenum: this.props.location.state ? this.props.location.state.peoplenum : defaultProps.peoplenum,
            disdegree: this.props.location.state.disdegree,
            seat: this.props.location.state.seat,
            departure: this.props.location.state.departure,
            destination: this.props.location.state.destination,
            date: this.props.location.state.date,
            time: this.props.location.state.time,
            presentnum: 0
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

    componentDidMount() {
        this._getSeatList()
    }

    _getSeatList = async () => {
        const seatList = await this._callApi
        this.setState({
            seatList: data
        })
    }
    _callApi = () => {
        let url = ""
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                //data rendering
                data.forEach(function(element){
                    let tmp = element.split("_")
                    seat[tmp[2]] = true
                    train[tmp[1]] = seat
                });
                // return data
            })
            .catch(err => console.log(err))
    }


    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    handleClick = (e) => {
        if(this.state.presentnum>this.state.peoplenum) {
            alert("정원 초과!")
        }else{
            var seatList = this.state.seatList
            this.setState(prevState =>{
                // presentnum: prevState.presentnum+1
                seatList: seatList.concat(e.target.value)
            })
        }
    }

    handleSubmit = (e) => {
        this.setState({
            redirect: true
        })
    }

    render() {
        //go to reserve
        if(this.state.redirect) {
            console.log(this.state)
            return <Redirect to={{
                pathname: '/reserve',
                state: {
                    peoplenum: this.state.peoplenum,
                    disdegree: this.state.disdegree,
                    seat: this.state.seat,
                    departure: this.state.departure,
                    destination: this.state.destination,
                    date: this.state.date,
                    time: this.state.time,
                    seatList: this.state.seatList
                }
            }}></Redirect>
        }

        //rendering page
        //defalt 칸: 2
        //앞 뒤로 움직일 수 있는 화살표로 업데이트
        //모든 칸의 레이아웃은 2*5 총 10개 좌석

        return (
            <div className="animated fadeIn">
                <Row>
                    <Button onClick={this.handleClick} disable={false} name="A1"
                            color="success" block>A1</Button>
                    <Button onClick={this.handleClick} disable={false} name="B1"
                            color="success" block>B1</Button>
                    <Button onClick={this.handleClick} disable={false} name="C1"
                            color="success" block>C1</Button>
                    <Button onClick={this.handleClick} disable={false} name="D1"
                            color="success" block>D1</Button>
                    <Button onClick={this.handleClick} disable={false} name="E1"
                            color="success" block>E1</Button>
                </Row>
                <Row>
                    <Button onClick={this.handleClick} disable={false} name="A2"
                            color="success" block>A2</Button>
                    <Button onClick={this.handleClick} disable={false} name="B2"
                            color="success" block>B2</Button>
                    <Button onClick={this.handleClick} disable={false} name="C2"
                            color="success" block>C2</Button>
                    <Button onClick={this.handleClick} disable={false} name="D2"
                            color="success" block>D2</Button>
                    <Button onClick={this.handleClick} disable={false} name="E2"
                            color="success" block>E2</Button>
                </Row>
                <Row>
                    <Col></Col>
                    <Button type="submit" color="success" block>submit</Button>
                </Row>
            </div>
        );
    }
}

export default SearchSeat;
