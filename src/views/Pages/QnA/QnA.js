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


//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

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
            QnAList: data,
        })
        console.log(this.state)
    }

    _callApi = () => {
        let url = "http://localhost:5000/get/api/~~~~"

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
        let id = id
        // window.location.replace("/QnA/:id")
    }

    _renderQnATable = () => {
        // console.log(this.state.QnAList)
        const render = this.state.QnAList.map((QnA, id) => {
            return (
                <tr key={id} onClick={() => this.fetchContent(QnA.id)}>
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

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

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
