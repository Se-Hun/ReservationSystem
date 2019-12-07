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

class QnA extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
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

    fetchContent = (id) => {
        // let id = id
        // window.location.replace("/QnA/:id")
    }

    _renderQnATable = () => {
        const render = this.state.QnAList.map((QnA, _id) => {
            return (
                <tr key={_id} onClick={() => this.fetchContent(QnA._id)}>
                    <td>{QnA.title}</td>
                </tr>
            )
        })
        return render
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
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
                    {this.state.QnAList ? this._renderQnATable() : ("Loading...")}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default QnA;
