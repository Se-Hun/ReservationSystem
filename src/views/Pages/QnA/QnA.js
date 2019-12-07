import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
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
                    <Link to={"/qna/"+QnA._id}>
                    <td>{QnA.title}</td>
                    </Link>
                </tr>
            )
        })
        return render
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>글 제목</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.QnAList ? this._renderQnATable() : ("Loading...")}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default QnA;
