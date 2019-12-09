// import React, {Component, lazy, Suspense} from 'react';
// import {Bar, Line} from 'react-chartjs-2';
// import {
//     Badge,
//     Button,
//     ButtonDropdown,
//     ButtonGroup,
//     ButtonToolbar,
//     Card,
//     CardBody,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//     Col,
//     Dropdown,
//     DropdownItem,
//     DropdownMenu,
//     DropdownToggle, FormGroup, Input, Label,
//     Progress,
//     Row,
//     Table,
// } from 'reactstrap';
// import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
// import {Redirect} from 'react-router-dom';
// import DrawGrid from './DrawGrid'
// //const Widget03 = lazy(() => import('../../../../../views/Widgets/Widget03'));
// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')
// var train = {}
//
// const data = []
// const defaultProps = {
//     peoplenum: 1,
//     disdegree: 1,
//     seat: 1,
//     departure: "",
//     destination: "",
//     date: "",
//     time: "",
// }
//
// class SearchSeat extends Component {
//     constructor(props) {
//         super(props);
//
//         this.toggle = this.toggle.bind(this);
//         this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
//
//         this.state = {
//             seatList: [
//                 'A1', 'A2',
//                 'B1', 'B2',
//                 'C1', 'C2',
//                 'D1', 'D2',
//                 'E1', 'E2'
//             ],
//             seatAvailable: [
//                 'A1', 'A2',
//                 'B1', 'B2',
//                 'C1', 'C2',
//                 'D1', 'D2',
//                 'E1', 'E2'
//             ],
//             seatReserved: [],
//             dropdownOpen: false,
//             radioSelected: 2,
//             seatList: null,
//             redirect: false,
//             peoplenum: this.props.location.state ? this.props.location.state.peoplenum : defaultProps.peoplenum,
//             disdegree: this.props.location.state ? this.props.location.state.disdegree : defaultProps.disdegree,
//             // seat: this.props.location.state ? this.props.location.state.seat : defaultProps.seat,
//             departure: this.props.location.state ? this.props.location.state.departure : defaultProps.departure,
//             destination: this.props.location.state ? this.props.location.state.destination : defaultProps.destination,
//             date: this.props.location.state ? this.props.location.state.date : defaultProps.depadaterture,
//             time: this.props.location.state ? this.props.location.state.time : defaultProps.time,
//             presentnum: 0
//         };
//     }
//
//     toggle() {
//         this.setState({
//             dropdownOpen: !this.state.dropdownOpen,
//         });
//     }
//
//     onRadioBtnClick(radioSelected) {
//         this.setState({
//             radioSelected: radioSelected,
//         });
//     }
//
//     onClickData(seat) {
//         if (this.state.seatReserved.indexOf(seat) > -1) {
//             this.setState({
//                 seatAvailable: this.state.seatAvailable.concat(seat),
//                 seatReserved: this.state.seatReserved.filter(res => res != seat)
//             })
//         } else {
//             this.setState({
//                 seatReserved: this.state.seatReserved.concat(seat),
//                 seatAvailable: this.state.seatAvailable.filter(res => res != seat)
//             })
//         }
//     }
//
//     componentDidMount() {
//         this._getSeatList()
//     }
//
//     _getSeatList = async () => {
//         const seatList = await this._callApi
//         this.setState({
//             seatList: data
//         })
//     }
//     _callApi = () => {
//         let url = ""
//         fetch(url, {
//             method: "GET"
//         }).then(res => res.json())
//             .then(data => {
//                 //data rendering
//                 data.forEach(function (element) {
//                     let tmp = element.split("_")
//                     // seat[tmp[2]] = true
//                     // train[tmp[1]] = seat
//                 });
//                 // return data
//             })
//             .catch(err => console.log(err))
//     }
//
//
//     loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
//     handleClick = (e) => {
//         if (this.state.presentnum > this.state.peoplenum) {
//             alert("정원 초과!")
//         } else {
//             var seatList = this.state.seatList
//             // seat[[e.target.name]] = false
//             this.setState(prevState => {
//                 // presentnum: prevState.presentnum+1
//                 seatList: seatList.concat(e.target.value)
//             })
//         }
//     }
//
//     handleSubmit = (e) => {
//         this.setState({
//             redirect: true
//         })
//     }
//
//     render() {
//         //go to reserve
//         if (this.state.redirect) {
//             console.log(this.state)
//             return <Redirect to={{
//                 pathname: '/reserve',
//                 state: {
//                     peoplenum: this.state.peoplenum,
//                     disdegree: this.state.disdegree,
//                     seat: this.state.seat,
//                     departure: this.state.departure,
//                     destination: this.state.destination,
//                     date: this.state.date,
//                     time: this.state.time,
//                     seatList: this.state.seatList
//                 }
//             }}></Redirect>
//         }
//
//         //rendering page
//         //defalt 칸: 2
//         //앞 뒤로 움직일 수 있는 화살표로 업데이트
//         //모든 칸의 레이아웃은 2*5 총 10개 좌석
//
//         return (
//             <div className="animated fadeIn">
//                 <h1>Seat Reservation System</h1>
//                 <DrawGrid
//                     seat={this.state.seat}
//                     available={this.state.seatAvailable}
//                     reserved={this.state.seatReserved}
//                     onClickData={this.onClickData.bind(this)}
//                 />
//             </div>
//         );
//     }
// }
//
// export default SearchSeat;

import React, {Component} from 'react';

const data = {

}

class SearchSeat extends Component {
    render() {
        return(
            <div></div>
        )
    }
}

export default SearchSeat