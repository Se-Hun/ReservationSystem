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

import QnA from "../QnA";

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const data = [
    {
        "id": 1,
        "title": "aaa",
    },
    {
        "id": 2,
        "title": "bbb",
    },
]

class Notice extends Component {

    constructor(props) {
        super(props);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

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

        this.setState({
            NoticeList: data
        })
        console.log(this.state)
    }

    _callApi = () => {
        let url = "http://localhost:5000/get/api/"

        return fetch(url, {
            method: "GET",
            // body : {}
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(err => console.log(err))
    }
    fetchContent = (id) => {
        // const id = id;
        // window.location.replace("/notice/:id")
    }
    _renderNoticeTable = () => {
        const render = this.state.NoticeList.map((Notice, id) => {
            return (
                <tr key={id} onClick={() => this.fetchContent(QnA.id)}>
                    <td>{Notice.title}</td>
                </tr>
            )
        })
        return render
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected,
        });
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
                    {this.state.NoticeList ? this._renderNoticeTable() : ("Loading...")}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Notice;
