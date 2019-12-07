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
            QnAList: null
        };
    }

    componentDidMount() {
        this._getQnAList()
    }

    _getQnAList = async () => {
        const QnAList = await this._getQnAContents();
        this.setState({
            QnAList: QnAList
        })
    }

    _getQnAContents = () => {
        let url = "http://localhost:5000/api/qna/get_content";
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
    
    _renderQnATitle = () => {
        return (
            <p>
                {this.state.QnAList.title}
            </p>
        )
    }

    _renderQnAContent = () => {
        return (
            <p>
                {this.state.QnAList.content}
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
                            {this.state.QnAList ? this._renderQnATitle() : ("Loading...")}
                        </CardBody>
                    </Card>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col >
                        <Card>
                        <cardBody>
                            {this.state.QnAList ? this._renderQnAContent() : ("Loading...")}
                        </cardBody>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}

export default NoticeContent;