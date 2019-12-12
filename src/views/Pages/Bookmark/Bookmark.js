import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardBody, Table} from 'reactstrap';
import Button from '@material-ui/core/Button';

const convert = {
    Inchoen : "인천",
    Seoul : "서울",
    Daejeon : "대전",
    Daegu : "대구",
    Busan : "부산"
}

class Bookmark extends Component {

    state = {
        bookmarks: "",
        departure: "",
        arrival : "",
    }

    componentDidMount() {
        this._getBookMarks()
    }

    _getBookMarks = async() => {
        const bookmarks = await this._callApi();

        this.setState({
            bookmarks : bookmarks,
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/api/user/bookmarks"

        const account = sessionStorage.getItem("account")

        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({account: account})
        }).then(res => res.json())
            .then(data => {

                    console.log(data)
                if(data.error) {
                    const errorCode = data.error
                    // 아무것도 없을 때 어떻게 되는지 해봐야함!
                    if(errorCode === 1) {
                        return "잘못된 접근입니다."
                    }
                    if(errorCode === 2) {
                        return "해당 Id 정보가 없습니다."
                    }
                    else {
                        return "잘못된 접근입니다."
                    }
                }
                else {
                    if(data.bookmarks === undefined || data.bookmarks === null || data.bookmarks === "" || data.bookmarks.length < 1) {
                        return "즐겨찾기가 비어 있습니다. 즐겨찾기를 추가해주세요."
                    }
                    else {
                        return data.bookmarks
                    }
                }
            })
            .catch(err => console.log(err))
    }

    _renderBookmarks = () => {
        let bookmarks = this.state.bookmarks

        if(typeof bookmarks === "string") {
            return (
                <div>
                    {bookmarks}
                </div>
            )
        }
        else {
            const render = bookmarks.map((bookmark, id) => {
                return(
                    <tr key={id}>
                        <td>{convert[bookmark.departure]}</td>
                        <td>{convert[bookmark.arrival]}</td>
                        <td>
                            <Link to={{
                                pathname: '/home',
                                state: {
                                    departure: convert[bookmark.departure],
                                    destination: convert[bookmark.arrival],
                                }
                            }} style={{textDecoration: "none"}}>
                                <Button variant="contained"
                                        size="medium"
                                        color="primary">
                                    조회
                                </Button>
                            </Link>
                        </td>
                    </tr>
                )
            })
            return render
        }
    }

    render() {
        return(
            <div style={{marginTop: "30px"}}>
                <Card>
                    <CardBody>
                        <h3><strong>즐겨찾기 목록</strong></h3>
                        <hr style={{border: "2px #e0e0e0 solid"}}/>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>출발지</th>
                                    <th>도착지</th>
                                    <th>조회</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookmarks ? (this._renderBookmarks()) : <tr><td>"Loading..."</td></tr>}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Bookmark;