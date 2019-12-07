import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {Link} from 'react-router-dom';
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
    NavLink,
    Nav,
    NavItem,
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'

//const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class ConfirmReservation extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            isCancel: false,
            isEdit: false,
            ReserveList: null,
        };
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

    handleEditClick(radioSelected) {

        this.setState(prevState => ({
            isEdit: !prevState.isEdit,
        }));
    }

    handleCancelClick(radioSelected) {
        this.setState(prevState => ({
            isCancel: !prevState.isCancel,
        }));
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    _renderReserveTable = () => {
        let now = new Date();
        const render = this.state.ReserveList.map((reserved, _id) => {
            let old = new Date(reserved.time);
            let gap = now.getTime()-old.getTime;
            if(gap/1000<0){
                this.setState({
                    isEdit: true,
                    isCancel: true,
                })
            }
            return (
                <tr key={_id}>
                    <td>{reserved}</td>
                    <button disabled={this.state.isEdit} onClick={()=>this.handleEditClick(reserved._id)}>수정</button>
                    <button disabled={this.state.isCancel} onClick={()=>this.handleCancelClick(reserved._id)}>취소</button>
                </tr>
            )
        })
        return render
    }
    render() {

        return (
            <div className="animated fadeIn">

                <Table>
                    <thead>
                    <tr>
                        <th>예매 목록</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.ReserveList ? this._renderReserveTable() : ("Loading...")}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ConfirmReservation;
