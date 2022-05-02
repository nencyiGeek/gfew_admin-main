import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { history } from "../../../history";
import * as Icon from "react-feather"
import moment from "moment";
import { toast } from "react-toastify";
const CustomHeader = props => {
  const handleCreatePoll = () => {
    history.push("/createpoll");
  }
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary" onClick={handleCreatePoll} >{props.title ? `Add ${props.title}` : "Add New"}</Button.Ripple>
      </div>
      {/* <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div> */}
    </div>
  )
}

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Question",
        selector: "question",
        sortable: true,
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.question}
                style={{ width: 170 }}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.question}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Poll Name",
        selector: "pollname",
        sortable: true,
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0" onClick={() => this.rowEditHandlar(row)}>
              <span
                title={row.pollName}
                style={{ cursor: 'pointer' }}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.pollName}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "End Date",
        selector: "startDate",
        sortable: true,
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <p className="text-bold-500 text-truncate mb-0">{moment(row.endDate).format('DD/MM/YYYY')}</p>
          </div>
        )
      },
      // {
      //   name: "Option",
      //   selector: "options",
      //   sortable: true,
      //   cell: row =>
      //     row.options.map((r) => {
      //       return (
      //         <p className="text-bold-500 mb-0">{r.name},</p>
      //       )
      //     })
      // },
      {
        name: "Responce Count",
        selector: "responceCount",
        sortable: true,
        cell: row => {
          return (
            <p className="text-bold-500 mb-0">{row.responses.length}</p>
          )
        }
      },
      {
        name: "Actions",
        selector: "actions",
        sortable: true,
        cell: row => {
          return (
            <div className="d-flex flex-column align-items-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Button.Ripple color="primary"
                    onClick={() => this.editHandlar(row._id, row)}
                  >
                    <Icon.Edit size={15} />
                  </Button.Ripple>
                </li>
                <li className="list-inline-item">
                  <Button.Ripple color="success" onClick={() => this.deleteHandlar(row._id, row.pollId)}>
                    <Icon.Trash size={15} />
                  </Button.Ripple>
                </li>
              </ul>
            </div>
          )
        }

      },
    ],
    filteredData: [],
    value: ""
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.polldata
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase())
        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  deleteHandlar(id, pollid) {
    this.props.deletePoll({ pollId: id, pollType: pollid }).then(res => {
      this.props.getPollData();
      toast.success('Delete successfully..')
    });
  }

  editHandlar = (id, row) => {
    history.push({
      pathname: `/createpoll/${id}`,
      state: { detail: row }
    });
  }

  rowEditHandlar = (row) => {
    history.push({
      pathname: '/commentDetails',
      state: { data: row }
    });
  }
  render() {
    let { columns, value, filteredData } = this.state;
    const { title, toggleModal, polldata } = this.props;
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title ? title : "custome"}</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : polldata}
            columns={columns}
            noHeader
            pagination
            subHeader
            subHeaderComponent={
              <CustomHeader
                toggleModal={toggleModal}
                title={title}
                value={value} />
                // handleFilter={this.handleFilter} />
            }
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableCustom
