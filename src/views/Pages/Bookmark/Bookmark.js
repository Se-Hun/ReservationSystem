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

const data = []

class Bookmark extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      /*userID: this.props.location.state.userID,*/
      accountname: '',
      bookmarkList: null,
    };
  }
  //북맠은 어케 불러올까
   componentDidMount() {
    this._getBookmarkList()
  //   fetch('/api/getUsername')
  //       .then(res => res.json())
  //       .then(user => this.setState({ this.state.accountname: user.accountname }));
   }

   _getBookmarkList = async () => {
    const bookmarkList = await this.callApi
     this.setState({
       bookmarkList: data
     })
     console.log(this.state)
   }

   _callApi = () =>   {
     let url = "http://localhost:5000/get/api/"

     return fetch(url, {
       method: "GET",
     }).then(res => res.json())
         .then(data => {
           console.log(data)
           return data
         })
         .catch(err => console.log(err))
   }

   _renderBookmarkTable = () => {
     const render = this.state.bookmarkList.map((bookmark, id) => {
           return(
               <tr key={id}>
                 <td>{bookmark.title}</td>
               </tr>
           )
        }
     )
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
      <div className="animated fadeIn">
        <Row>
          <Col></Col>

          <Col sm="6" lg="6">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                {/*{this.state.accountname}님의 즐겨찾기 목록입니다.*/}
              </CardBody>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Table>
          <thead>
          <tr>
            <th>글 제목</th>
          </tr>
          </thead>
          <tbody>
          {this.state.bookmarkList ? this._renderBookmarkTable() : ("Loading...")}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Bookmark;
