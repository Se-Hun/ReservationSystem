import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, } from 'reactstrap';
import { Link } from 'react-router-dom';
import {isLoggedIn} from "../../../utils/auth";

class ResvContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resvData: null,
      isCancel: false,
      isEdit: false,
      reserveTime: []
    };
  }

  componentDidMount() {
    if(!isLoggedIn()) {
            alert("로그인을 해주세요.")
            window.location.replace("/")
            return
        }
    this._getData()
  }

  _getData = async () => {
    const resvData = await this._getResvData();
    this.setState({
      resvData: resvData
    })
    console.log(resvData);
    this._getTimeList();
  }

  _getResvData = () => {
    let url = "http://localhost:5000/api/reservation/getReservation"
    var id = this.props.match.params.id;
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        return data
      })
      .catch(err => console.log(err))
  }

  _getTimeList = async () => {
    let Timelist = []
    let reserved = this.state.resvData;
    let now = new Date().getHours();
    let time = reserved.time.split(':')
    let old = time[0]
    let gap = now - old;
    if (gap > 0) {
      Timelist[reserved._id] = true
    } else {
      Timelist[reserved._id] = false
    }
    this.setState({
      reserveTime: Timelist
    })
  }

  _jsonToKeyValueArray = (evt) => {
    let array = new Array();
    let key;
    for (key in evt) {
      if (key === "_id" || key === "state")
        continue;
      let keyLabel = this._keyToLabel(key);
      let valueLabel = this._valueToLabel(evt[key]);
      array.push(new Array(keyLabel, valueLabel));
    }
    return array;
  }

  // 필요 시 추가
  _keyToLabel = (key) => {
    let label;
    switch (key) {
      case "departure":
        label = "출발지";
        break;
      case "arrival":
        label = "도착지";
        break;
      case "date":
        label = "날짜";
        break;
      case "time":
        label = "시간";
        break;
      case "peoplenum":
        label = "인원 수";
        break;
      case "age":
        label = "연령";
        break;
      case "way":
        label = "편도/왕복";
        break;
      case "card":
        label = "결제 카드사";
        break;
      case "cardnum":
        label = "결제 카드 번호";
        break;
      case "seat":
        label = "좌석 번호";
        break;
      case "level":
        label = "좌석 종류";
        break;
      case "disdegree":
        label = "장애 정도";
        break;
      default:
        label = key;
    }
    return label;
  }

  // 필요 시 추가
  _valueToLabel = (value) => {
    let label;
    switch (value) {
      case "children":
        label = "아동";
        break;
      case "adult":
        label = "어른";
        break;
      case "Daejeon":
        label = "대전";
        break;
      case "Seoul":
        label = "서울";
        break;
      case "Busan":
        label = "부산";
        break;
      case "Inchoen":
        label = "인천";
        break;
      case "Daegu":
        label = "대구";
        break;
      default:
        label = value;
    }
    return label;
  }

  _renderResvTable = () => {
    let arr = this._jsonToKeyValueArray(this.state.resvData);
    const render = arr.map((([key, value]) => {
      if(key === "편도/왕복") {
        return(
            <tr key={key}>
              <td>{`${key}`}</td>
              <td><strong>{(value === "1") ? ("편도") : ("왕복")}</strong></td>
            </tr>
        )
      }
      if(key === "좌석 종류") {
        return(
            <tr key={key}>
              <td>{`${key}`}</td>
              <td><strong>{(value === "1") ? ("일반") : ("우등")}</strong></td>
            </tr>
        )
      }
      if(key === "장애 정도") {
        return(
            <tr key={key}>
              <td>{`${key}`}</td>
              <td><strong>{(value === "1") ? ("일반") : ((value === "2") ? ("1급") : ("2급"))}</strong></td>
            </tr>
        )
      }

      return (
        <tr key={key}>
          <td>{`${key}`}</td>
          <td><strong>{value}</strong></td>
        </tr>
      )
    }));
    return render
  }

  /*
  _renderReserveTable = () => {
    let reserved = this.state.resvData;
    return (
      <tr key={reserved._id}>
        <td>{this.state.reserveTime[reserved._id] ? (
          <Link to={{
            pathname: '/editReservation', state: {
              peoplenum: reserved.peoplenum,
              disdegree: reserved.disdegree,
              seat: reserved.seat,
              departure: reserved.departure,
              arrival: reserved.arrival,
              date: reserved.date,
              time: reserved.time,
              train: reserved.train,
              route: reserved.route,
            }
          }} style={{ textDecoration: "none" }}>
            <Button>수정</Button>
          </Link>
        ) : (
            <Button disabled>수정</Button>
          )}</td>
        <td>{this.state.reserveTime[reserved._id] ? (
          <Link to={{
            pathname: '/confirmCancelReservation', state: {
              peoplenum: reserved.peoplenum,
              seat: reserved.seat,
              departure: reserved.departure,
              arrival: reserved.arrival,
              date: reserved.date,
              time: reserved.time,
              train: reserved.seat[0],
              // route: reserved.route,
              disdegree:reserved.disdegree,
              id: reserved._id,
              cardcompany: reserved.card,
              cardnum: reserved.cardnum
            }
          }} style={{ textDecoration: "none" }}>
            <Button>취소</Button>
          </Link>
        ) : (
            <Button disabled>취소</Button>
          )}</td>
      </tr>
    )
  }
   */

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card style={{marginTop: "20px"}}>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i> 예매 정보</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {this.state.resvData ? this._renderResvTable() : <tr><td>"Loading..."</td></tr>}
                  </tbody>

                  {/*<tbody>*/}
                    {/*{this.state.resvData ? this._renderReserveTable() : <tr><td>"Loading..."</td></tr>}*/}
                  {/*</tbody>*/}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ResvContent;
