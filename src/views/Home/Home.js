import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    Row,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import Button from '@material-ui/core/Button';

import Notice from '../Pages/Notice'

const converter = {
    인천: "Inchoen",
    서울: "Seoul",
    대전: "Daejeon",
    광주: "Gwangju",
    대구: "Daegu",
    부산: "Busan",
    울산: "Ulsan"
}

class Home extends Component {
    constructor(props) {
        super(props);

        let departure = ''
        let destination = ''
        if (props.location.state) {
            departure = props.location.state.departure
            destination = props.location.state.destination
        }

        this.state = {
            Redirect: false,
            dropdownOpen: false,
            radioSelected: 2,
            departure: departure,
            destination: destination,
            date: '',
            time: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const deptForConvert = this.state.departure
        const destForConvert = this.state.destination

        this.setState({
            Redirect: true,
            departure : converter[deptForConvert],
            destination : converter[destForConvert]
        })

    }

    _renderOptionForBookmarks = (spot) => {
        const locations = Object.keys(converter);

        let render = locations.map((location, id) => {
            if (location === this.state[spot]) {
                return
            }
            return (
                <option value={location} key={id}>{location}</option>
            )
        })

        render.unshift(<option value={spot} key={-1}>{this.state[spot]}</option>)

        return render
    }

    _renderOptionForDefault = () => {
        const locations = Object.keys(converter);

        const render = locations.map((location, id) => {
            return (
                <option value={location} key={id}>{location}</option>
            )
        })

        return render
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        if (this.state.Redirect) {
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
                <form onSubmit={this.handleSubmit} style={{marginTop: "20px"}}>
                    <Row>
                        <Col></Col>
                        <Col sm="6" lg="6">
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>출발지</strong></Label>
                                            <Input type="select" name="departure" onChange={this.handleChange}
                                                   id="departure" value={this.state.departure} required>
                                                {this.state.departure ? (this._renderOptionForBookmarks('departure')) : (this._renderOptionForDefault())}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name" style={{color: "black"}}><strong>도착지</strong></Label>
                                            <Input type="select" name="destination" onChange={this.handleChange}
                                                   id="destination" value={this.state.destination} required>
                                                {this.state.destination ? (this._renderOptionForBookmarks('destination')) : (this._renderOptionForDefault())}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>날짜</strong></Label>
                                                <Input type="date" name="date" onChange={this.handleChange}
                                                       id="date" placeholder="Enter your date" required/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="name" style={{color: "black"}}><strong>시간</strong></Label>
                                                <Input type="time" name="time" onChange={this.handleChange}
                                                       id="time" placeholder="Enter your time" required/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Col col="6" sm="2" md="2" xl className="mb-3 mb-xl-0">
                                        <Button variant="contained"
                                                    size="large"
                                                    color="primary"
                                                    style={{marginBottom: "10px", width: "100%"}}
                                                    onClick={this.handleSubmit}>조회
                                        </Button>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row></Row>
                </form>
                <Row>
                    <Col>
                        <Notice/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;
