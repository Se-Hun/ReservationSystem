import React, {Component} from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';

class NoticeContent extends Component {
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
        const NoticeList = await this._getNoticeContents();
        this.setState({
            NoticeList: NoticeList
        })
    }

    _getNoticeContents = () => {
        let url = "http://localhost:5000/api/notice/get_content";
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
    
    _renderNoticeTitle = () => {
        return (
            <p>
                {this.state.NoticeList.title}
            </p>
        )
    }

    _renderNoticeContent = () => {
        return (
            <p>
                {this.state.NoticeList.content}
            </p>
        )
    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                    <Card>
                        <CardBody>
                            {this.state.NoticeList ? this._renderNoticeTitle() : ("Loading...")}
                        </CardBody>
                    </Card>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col >
                        <Card>
                        <CardBody>
                            {this.state.NoticeList ? this._renderNoticeContent() : ("Loading...")}
                        </CardBody>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}

export default NoticeContent;

