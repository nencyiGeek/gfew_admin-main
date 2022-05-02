import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"
import axios from "axios"
import { ContextLayout } from "../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  Edit,
  Trash2
} from "react-feather"
import "../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../assets/scss/pages/users.scss"
import { API_ROOT } from "../../config";
import userPofileIcon from '../../assets/img/userPofileIcon.png'

class Users extends React.Component {
  state = {
    rowData: null,
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    columnDefs: [
    //   {
    //     headerName: "ID",
    //     field: "id",
    //     width: 150,
    //     filter: true,
    //     headerCheckboxSelectionFilteredOnly: true,
    //     headerCheckboxSelection: true
    //   },
      {
        headerName: "Username",
        field: "first_name",
        filter: true,
        checkboxSelection: true,
       headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        width: 250,
        cellRendererFramework: params => {
          return (
            <div
              className="d-flex align-items-center cursor-pointer"
            //   onClick={() => history.push("/app/user/edit")}
            >
              <img
                className="rounded-circle mr-50"
                src={params.data.avatar}
                alt="user avatar"
                height="30"
                width="30"
              />
              <span>{params.data.name}</span>
            </div>
          )
        }
      },
      {
        headerName: "Email",
        field: "email",
        filter: true,
        width: 250
      },
      {
        headerName: "Name",
        field: "name",
        filter: true,
        width: 200
      },
      {
        headerName: "Country",
        field: "country",
        filter: true,
        width: 200
      },
      {
        headerName: "Role",
        field: "role",
        filter: true,
        width: 150
      },
      {
        headerName: "Status",
        field: "status",
        filter: true,
        width: 150,
        cellRendererFramework: params => {
          return params.value === "active" ? (
            <div className="badge badge-pill badge-light-success">
              {params.value}
            </div>
          ) : params.value === "blocked" ? (
            <div className="badge badge-pill badge-light-danger">
              {params.value}
            </div>
          ) : params.value === "deactivated" ? (
            <div className="badge badge-pill badge-light-warning">
              {params.value}
            </div>
          ) : null
        }
      },
      {
        headerName: "Verified",
        field: "is_verified",
        filter: true,
        width: 125,
        cellRendererFramework: params => {
          return params.value === true ? (
            <div className="bullet bullet-sm bullet-primary"></div>
          ) : params.value === false ? (
            <div className="bullet bullet-sm bullet-secondary"></div>
          ) : null
        }
      },
      {
        headerName: "Department",
        field: "department",
        filter: true,
        width: 160
      },
      {
        headerName: "Actions",
        field: "transactions",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="actions cursor-pointer">
              <Edit
                className="mr-50"
                size={15}
                // onClick={() => history.push("/app/user/edit")}
              />
              <Trash2
                size={15}
                // onClick={() => {
                //   let selectedData = this.gridApi.getSelectedRows()
                //   this.gridApi.updateRowData({ remove: selectedData })
                // }}
              />
            </div>
          )
        }
      }
    ]
  }

  async componentDidMount() {
      const url = API_ROOT + "users";
    await axios.get(url).then(response => {
        // console.log('-response?.data-', response.data);
        let list = response?.data?.data?.total || []; 
        list = list.sort((a, b) => {
            // const dateB = moment(b.createdAt, "DD/MM/YYYY").format();
            // const dateA = moment(a.createdAt, "DD/MM/YYYY").format();
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      let rowData = list.map(data=>{
          return {
            avatar: userPofileIcon,
            country: "US",
            department: "sales",
            email: data.email,
            // id: 97,
            is_verified: data.isEmailVerified || false,
            name: data.first_name + " " + data.last_name,
            role: "user",
            // status: "Active"
            username: data.first_name
          }
      })
        // console.log('-rowData-', rowData)
      this.setState({ rowData })
    })
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  toggleCollapse = () => {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onEntering = () => {
    this.setState({ status: "Opening..." })
  }

  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onExiting = () => {
    this.setState({ status: "Closing..." })
  }
  onExited = () => {
    this.setState({ status: "Closed" })
  }
  removeCard = () => {
    this.setState({ isVisible: false })
  }

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state
    // console.log('=rowData===========',rowData);
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                  </div>
                </div>
                {this.state.rowData !== null ? (
                  <ContextLayout.Consumer>
                    {context => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Users