import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';

class QnAContent extends Component {
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
                <h3>{this.state.QnAList.title}</h3>
            </p>
        )
    }

    _renderQnAContent = () => {
        return (
            <p>
                <h3>{this.state.QnAList.content}</h3>
            </p>
        )
    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <Card>
                    <CardHeader>
                        <h2 style={{color:"#0067a3"}}><strong>Question</strong></h2>
                    </CardHeader>
                    <CardBody>
                        {this.state.QnAList ? this._renderQnATitle() : ("Loading...")}
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 style={{color: "#dc143c"}}><strong>Answer</strong></h2>
                    </CardHeader>
                    <CardBody>
                        {this.state.QnAList ? this._renderQnAContent() : ("Loading...")}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default QnAContent;