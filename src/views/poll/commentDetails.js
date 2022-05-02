import React from "react"
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
} from "reactstrap"
import DataTable from "react-data-table-component"
import moment from "moment"


class commentDetails extends React.Component {
    state = {
        commentdata: [],
        polldata: [],
        responsedata: [],
        rankingResponse: [],
        commentColumns: [
            {
                name: "Comment Data",
                selector: "commentdata",
                sortable: true,
                cell: row => {
                    return (
                        <p className="text-bold-500 mb-0">{row.data}</p>
                    )
                }
            },
            {
                name: "Email",
                selector: "email",
                sortable: true,
                cell: row => {
                    return (
                        <p className="text-bold-500 mb-0">{row.userEmail}</p>
                    )
                }
            },
        ],
        responseColumns: [
            {
                name: "Responses",
                selector: "response",
                sortable: true,
                cell: row => {
                    let optionName
                    this.state.polldata.options.map((data) => {
                        let id = data._id;
                        if (id === row.response) {
                            optionName = data.name
                        }
                        return null;
                    })
                    return (
                        <div>
                            {this.state.polldata.pollName === "Number Vote Poll" || this.state.polldata.pollName === "Ranking Poll" ?
                                <p className="text-bold-500 mb-0"  style={{cursor: 'pointer'}} onClick={() => this.rowEditHandlar(row)}>{row._id}</p>
                                :
                                <p className="text-bold-500 mb-0">{optionName}</p>
                            }
                        </div>
                    )
                }
            },
            {
                name: "Email",
                selector: "email",
                sortable: true,
                cell: row => {
                    return (
                        <p className="text-bold-500 mb-0">{row.userEmail}</p>
                    )
                }
            },
            {
                name: "Created Date",
                selector: "createdAt",
                sortable: true,
                cell: row => {
                    return (
                        <p className="text-bold-500 mb-0">{moment(row.createdAt).format('DD/MM/YYYY')}</p>
                    )
                }
            },
        ],
        rowResponseDetails: [
            {
                name: "Responses",
                selector: "response",
                sortable: true,
                cell: row => {
                    let optionName
                    this.state.polldata.options.map((data) => {
                        let id = data._id;
                        if (id === row.optionId) {
                            optionName = data.name
                        }
                        return null;
                    })
                    return (
                        <p className="text-bold-500 mb-0">{optionName}</p>
                    )
                }
            },
            {
                name: "Selected Value",
                selector: "selectedvalue",
                sortable: true,
                cell: row => {
                    return (
                        <p className="text-bold-500 mb-0">{row.selectedValue}</p>
                    )
                }
            },
        ],
        rankingResponseDetails: [
            {
                name: "Responses",
                selector: "response",
                sortable: true,
                cell: row => {
                    let optionName
                    this.state.polldata.options.map((data) => {
                        let id = data._id;
                        if (id === row.optionId) {
                            optionName = data.name
                        }
                        return null;
                    })
                    return (
                        <p className="text-bold-500 mb-0">{optionName}</p>
                    )
                }
            },
            {
                name: "Rank",
                selector: "rank",
                sortable: true,
                cell: row => {
                    return (
                        <p className="text-bold-500 mb-0">{row.rank}</p>
                    )
                }
            },
        ]
    }

    componentWillReceiveProps(props) {
        let polldata = props.location.state.data;
        this.setState({ polldata: polldata })
    }
    rowEditHandlar = (row) => {
        this.setState({ responsedata: row.response, rankingResponse:row.response })
    }
    render() {
        let { commentColumns, polldata, responseColumns, rowResponseDetails, responsedata, rankingResponse, rankingResponseDetails } = this.state
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Comments Details</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                    <DataTable
                        className="dataTable-custom"
                        data={polldata.comments}
                        columns={commentColumns}
                        noHeader
                        pagination
                    />
                </CardBody>

                <CardHeader>
                    <CardTitle>Responce Details</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                    <DataTable
                        className="dataTable-custom"
                        data={polldata.responses}
                        columns={responseColumns}
                        noHeader
                        pagination
                    />
                </CardBody>
                {this.state.polldata.pollName === "Number Vote Poll" ?
                    <CardBody className="rdt_Wrapper">
                        <DataTable
                            className="dataTable-custom"
                            data={responsedata}
                            columns={rowResponseDetails}
                            noHeader
                            pagination
                        />
                    </CardBody>
                    : null}

                {this.state.polldata.pollName === "Ranking Poll" ?
                    <CardBody className="rdt_Wrapper">
                        <DataTable
                            className="dataTable-custom"
                            data={rankingResponse}
                            columns={rankingResponseDetails}
                            noHeader
                            pagination
                        />
                    </CardBody>
                    : null}

            </Card>
        )
    }
}

export default commentDetails
