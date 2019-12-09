import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    Form
} from 'reactstrap';
import Button from '@material-ui/core/Button';

class SearchRoutenSeat extends Component {

    constructor(props) {
        super(props);

        let departure = ''
        let destination = ''
        let date = ''
        let time = ''
        if (props.location.state) {
            departure = props.location.state.departure
            destination = props.location.state.destination
            date = props.location.state.date
            time = props.location.state.time
        }

        this.state = {
            dropdownOpen: false,
            peoplenum: 1,
            disdegree: 1,
            seat: 1,
            train: 1,
            departure : departure,
            destination : destination,
            date: date,
            time: time,
            redirect: false,
            routeList: null,
            route: null,
        };
    }


    _getRouteList = async () => {
        const RouteList = await this._callApi()
        this.setState({
            routeList: RouteList,
        })
    }
    _callApi = () => {
        let url = "http://localhost:5000/api/trainRoute/search_path"
        let departure = this.state.departure
        let arrival = this.state.destination
        let date = this.state.date
        let time = "3:00"

        console.log(this.state)

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({departure: departure, arrival: arrival, date: date, time: time})
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchContent = (e, route) => {
        console.log(route)
        this.setState({
            route: route
        })
    }

    _renderRouteTable = () => {
        console.log(this.state.routeList)
        let now = (this.state.time).split(':')
        const render = this.state.routeList.map((route, _id) => {
            let deptime = (route.deptime).split(':')
            if((now[0]-deptime[0])>0) {
                return null
            }
            return (
                <tr key={_id}>
                    <td>{route.trainInfo}</td>
                    <td>{route.laststop}</td>
                    <td>{route.deptime}</td>
                    <td>{route.arrtime}</td>
                    <td>
                        <Link to={{pathname: '/searchSeat', state: {
                                peoplenum: this.state.peoplenum,
                                disdegree: this.state.disdegree,
                                seat: this.state.seat,
                                departure: this.state.departure,
                                destination: this.state.destination,
                                date: this.state.date,
                                time: this.state.time,
                                train: this.state.train,
                                route: this.state.route,
                            }}} style={{textDecoration: "none"}}>
                            <Button variant="contained" size="small" onClick={(e) => this.fetchContent(e, route)}>확인</Button>
                        </Link>
                    </td>
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

    hanleSearchClick = (e) => {
        this._getRouteList()
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    // _debug = () => {
    //     console.log(this.state)
    // }

    render() {
        return (
            <div className="animated fadeIn">
                {/*<Button onClick={this._debug}>DEBUG</Button>*/}

                <Form style={{marginTop: "20px"}}>
                    <Row>
                        <Col sm="6" lg="6">
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>인원수</strong></Label>
                                            <Input type="select" name="peoplenum" value={this.state.peoplenum}
                                                   onChange={this.handleChange} required>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="disdegree" style={{color: "black"}}><strong>장애 정도</strong></Label>
                                            <Input type="select" name="disdegree" value={this.state.disdegree}
                                                   onChange={this.handleChange} required>
                                                <option value="1">일반</option>
                                                <option value="2">1급</option>
                                                <option value="3">2급</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>좌석 종류</strong></Label>
                                                <Input type="select" name="seat" onChange={this.handleChange}
                                                       value={this.state.seat}
                                                       id="seat" required>
                                                    <option value="1">일반</option>
                                                    <option value="2">우등</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>기차 종류</strong></Label>
                                                <Input type="select" name="train" onChange={this.handleChange}
                                                       value={this.state.train}
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
                                            <Label htmlFor="name" style={{color: "black"}}><strong>출발지</strong></Label>
                                            <Input type="select" name="departure" onChange={this.handleChange}
                                                   id="departure" value={this.state.departure} required>
                                                <option value="Inchoen">인천</option>
                                                <option value="Seoul">서울</option>
                                                <option value="Daejeon">대전</option>
                                                <option value="Gwangju">광주</option>
                                                <option value="Daegu">대구</option>
                                                <option value="Busan">부산</option>
                                                <option value="Ulsan">울산</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>도착지</strong></Label>
                                            <Input type="select" name="destination" onChange={this.handleChange}
                                                   id="destination" value={this.state.destination} required>
                                                <option value="Inchoen">인천</option>
                                                <option value="Seoul">서울</option>
                                                <option value="Daejeon">대전</option>
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
                                                <Label htmlFor="name" style={{color: "black"}}><strong>날짜</strong></Label>
                                                <Input type="date" name="date" onChange={this.handleChange}
                                                       id="date" value={this.state.date} required/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>시간</strong></Label>
                                                <Input type="time" name="time" onChange={this.handleChange}
                                                       id="time" value={this.state.time} required/>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col></Col>
                                        <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                            <Button variant="contained"
                                                    size="large"
                                                    color="primary"
                                                    style={{marginBottom: "10px", width: "100%"}}
                                                    onClick={this.hanleSearchClick}>조회
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
                <Card>
                    <CardBody>
                        <h2><strong>노선 목록</strong></h2>
                        <hr style={{border: "2px #e0e0e0 solid"}}/>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>기차 번호</th>
                                    <th>종점</th>
                                    <th>출발 시간</th>
                                    <th>도착 시간</th>
                                    <th>조회</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.routeList ? this._renderRouteTable() : ("해당하는 노선 목록이 없습니다.")}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default SearchRoutenSeat;
