import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, FormGroup, Input, Label,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


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
        // const render = this.state.NoticeList.map((Notice, _id) => {
            return (
                <p>
                    {this.state.NoticeList.title}
                </p>
            )
        // })
        // return render
    }

    _renderNoticeContent = () => {
        // const render = this.state.NoticeList.map((Notice, _id) => {
        //     return (
        //         <tr>
        //             <td>{Notice.content}</td>
        //         </tr>
        //     )
        // })
        // return render
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
                        <cardBody>
                            {this.state.NoticeList ? this._renderNoticeContent() : ("Loading...")}
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

