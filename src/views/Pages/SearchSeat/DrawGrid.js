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
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {Redirect} from 'react-router-dom';

class DrawGrid extends React.Component {
    render() {
        return (
            <div className="container">
                <h2></h2>
                <table className="grid">
                    <tbody>
                    <tr>
                        console.log(this.props.seat)
                        <td>{ this.props.seat.map( row =>
                            <td
                                className={this.props.reserved.indexOf(row) > -1? 'reserved': 'available'}
                                key={row} onClick = {(e) => this.onClickSeat(e, row)}>{row} </td>) }</td>
                    </tr>
                    </tbody>
                </table>

                <AvailableList available = { this.props.available } />
                <ReservedList reserved = { this.props.reserved } />
            </div>
        )
    }

    onClickSeat(seat) {
        this.props.onClickData(seat);
    }
}


class AvailableList extends React.Component {
    render() {
        const seatCount = this.props.available.length;
        return(
            <div className="left">
                <h4>Available Seats: ({seatCount == 0 ? 'No seats available' : seatCount})</h4>
                <ul>
                    {this.props.available.map( res => <li key={res}>{res}</li> )}
                </ul>
            </div>
        )
    }
}

class ReservedList extends React.Component {
    render() {
        return(
            <div className="right">
                <h4>Reserved Seats: ({this.props.reserved.length})</h4>
                <ul>
                    { this.props.reserved.map(res => <li key={res} >{res}</li>) }
                </ul>
            </div>
        )
    }
}

export default DrawGrid
