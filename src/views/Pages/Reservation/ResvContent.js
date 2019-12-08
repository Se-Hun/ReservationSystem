import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

class ResvContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        resvData: null
    };
  }

  componentDidMount() {
    this._getData()
}

  _getData = async () => {
    const resvData = await this._getResvData();
    this.setState({
      resvData: resvData
    })
  }

  _getResvData = () => {
    let url = "http://localhost:5000/api/reservation/getReservation"
    var id=this.props.match.params.id;
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
    })
        .then(res => res.json())
        .then(data => {
          return data
        })
        .catch(err => console.log(err))
  }

  _jsonToKeyValueArray = (evt) => {
    let array=new Array();
    let key;
    for(key in evt) {
      if(key==="_id"||key==="state")
        continue;
      let keyLabel=this._keyToLabel(key);
      let valueLabel=this._valueToLabel(evt[key]);
      array.push(new Array(keyLabel, valueLabel));
    }
    return array;
  }

  // 필요 시 추가
  _keyToLabel=(key)=>{
    let label;
    switch(key){
      case "departure":
        label="출발지";
        break;
      case "arrival":
        label="도착지";
        break;
      case "date":
        label="날짜";
        break;
      case "time":
        label="시간";
        break;
      case "peoplenum":
        label="인원 수";
        break;
      case "age":
        label="연령";
        break;
      case "way":
        label="편도/왕복";
        break;
      case "card":
        label="결제 카드사";
        break;
      case "cardnum":
        label="결제 카드 번호";
        break;
      default:
        label=key;
    }
    return label;
  }

  // 필요 시 추가
  _valueToLabel=(value)=>{
    let label;
    switch(value){
      case "oneway":
        label="편도";
        break;
      case "return":
        label="왕복";
        break;
      case "children":
        label="아동";
        break;
      case "adult":
        label="어른";
        break;  
      default:
        label=value;
    }
    return label;
  }

  _renderQnATable = () => {
    let arr=this._jsonToKeyValueArray(this.state.resvData);
    const render = arr.map((([key, value]) => {
      return (
        <tr key={key}>
          <td>{`${key}`}</td>
          <td><strong>{value}</strong></td>
        </tr>
      )
    }));
    return render
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i> 예매 정보</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                    {this.state.resvData ? this._renderQnATable() : ("Loading...")}
                    </tbody>
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
