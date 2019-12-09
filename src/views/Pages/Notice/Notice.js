import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    Card,
    CardBody
} from 'reactstrap';

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NoticeList: null
        };
    }

    componentDidMount() {
        this._getNoticeList()
    }

    _getNoticeList = async () => {
        const NoticeList = await this._callApi();
        this.setState({
            NoticeList: NoticeList
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/notice/get_title_list";
        return fetch(url, {
            method: "GET",
        }).then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.log(err))
    }

    _renderNoticeTable = () => {
        const render = this.state.NoticeList.map((Notice, _id) => {
            return (
                <tr>
                    <Link to={"/notice/"+Notice._id} style={{textDecoration: "none", color: "black"}}>
                        <td colSpan={6}><strong>{Notice.title}</strong></td>
                    </Link>
                </tr>
            )
        })
        return render
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h2><strong>공지 사항</strong></h2>
                    <hr style={{border: "2px #e0e0e0 solid"}}/>
                    <Table striped>
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*    <th>글 제목</th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                        <tbody>
                            {this.state.NoticeList ? this._renderNoticeTable() : ("Loading...")}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default Notice;
