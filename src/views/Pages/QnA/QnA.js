import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    Card,
    CardBody
} from 'reactstrap';

class QnA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QnAList: null
        };
    }

    componentDidMount() {
        this._getQnAList()
    }

    _getQnAList = async () => {
        const QnAList = await this._callApi()
        this.setState({
            QnAList: QnAList,
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/qna/get_title_list"
        return fetch(url, {
            method: "GET",
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }

    _renderQnATable = () => {
        const render = this.state.QnAList.map((QnA, _id) => {
            return (
                <tr>
                    <td>
                        <Link to={"/qna/"+QnA._id} style={{textDecoration: "none", color: "black"}}>
                            {QnA.title}
                        </Link>
                    </td>
                </tr>
            )
        })
        return render
    }

    render() {
        return (
            <Card style={{marginTop: "20px"}}>
                <CardBody>
                    <h2><strong>Q & A</strong></h2>
                    <hr style={{border: "2px #e0e0e0 solid"}}/>
                    <Table>
                        <tbody>
                            {this.state.QnAList ? this._renderQnATable() : ("Loading...")}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default QnA;
