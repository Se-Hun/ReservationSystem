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
        // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            NoticeList: null
        };
    }

    componentDidMount() {
        this._getNoticeList()
    }

    _getNoticeList = async () => {
        const NoticeList = await this._callApi();
        console.log(NoticeList);
        this.setState({
            NoticeList: NoticeList
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/notice/get_content";
        var id=this.props.match.params.id;
        console.log(JSON.stringify({id: id}));
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
    
    _renderNoticeContent = () => {
        const render = this.state.NoticeList.map((Notice, _id) => {
            return (
                <tr>
                    <td>{Notice.content}</td>
                </tr>
            )
        })
        return render
    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                    <Card>
                        <CardBody>
                            제목
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
                            내용
                            {/* {this.state.NoticeList ? this._renderNoticeContent() : ("Loading...")} */}
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

