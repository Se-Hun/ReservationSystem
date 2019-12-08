import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

class ResvList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ResvList: null,
      Data: new Array()
    };
  }

  componentDidMount() {
    this._getResvList()
  }

  _getResvList = async () => {
    const ResvList = await this._getResvIDList()
    // this.setState({
    //   ResvList: ResvList
    // })
    var allData=this.state.Data
    for(let i=0; i<ResvList.reservation.length; i++){
      // console.log(this._getResvData(ResvList.reservation[i]));
      // let a=this._getResvData(ResvList.reservation[i]);
      await Promise.resolve(this._getResvData(ResvList.reservation[i])).then((jsonResults) => {
        allData.push(jsonResults);
      })
      // allData.push(this._getResvData(ResvList.reservation[i]));
    }
    
    this.setState({
      ResvList: ResvList,
      Data: allData
    })
  }

  _getResvIDList = () => {
    let url = "http://localhost:5000/api/user/list/reservation"
    let loginAccount=sessionStorage.getItem("account");
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({account: loginAccount})
        })
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
  }

  _getResvData = (resvID) => {
    let url = "http://localhost:5000/api/reservation/getReservation"
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: resvID})
        })
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              return data
            })
            .catch(err => console.log(err))
  }

  _renderQnATable = () => {
    const render = this.state.Data.map((data, i) => {
      // console.log(this.state.Data);
      return (
        <tr key={data._id}>
          <th scope="row"><Link to={"/reservation/"+data._id}>{data.date}</Link></th>
          <td><Link to={"/reservation/"+data._id}>{data.departure}</Link></td>
          <td><Link to={"/reservation/"+data._id}>{data.arrival}</Link></td>
          <td><Link to={"/reservation/"+data._id}>{data.way}</Link></td>
        </tr>
      )
    })
    return render
}

  render() {
    // const userList = usersData.filter((user) => user.id < 10)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 예매목록
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">date</th>
                      <th scope="col">departure</th>
                      <th scope="col">arrival</th>
                      <th scope="col">way</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Data ? this._renderQnATable() : ("Loading...")}
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

export default ResvList;
