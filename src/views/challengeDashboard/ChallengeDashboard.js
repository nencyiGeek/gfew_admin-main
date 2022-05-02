import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { TopCardDetail, CardDetail } from "../../components/utils";
import { Search } from "react-feather";
import CreateChallenge from "../../views/challenge/CreateChallenge";
import * as ApiCallIng from "../../ApiStructure/index";
import classnames from "classnames";
// import InfiniteScroll from "react-infinite-scroll-component";
export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchvalue: "",
      valueForCard: [],
      valueForTopCard: [],
      isCreateModalOpen: false,
      isForEdit: false,
      activeTab: "1",
      active: "1",
    };
  }
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 30 }))
      });
    }, 1500);
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggle = (tab) => {
    if (this.state.active !== tab) {
      this.setState({ active: tab });
    }
  };
  fetchAllData = () => {
    ApiCallIng.fetchAllChallenge()
      .then((response) => {
        // console.log(response);
        this.setState({ valueForCard: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  challengeDashboardCount = () => {
    ApiCallIng.challengeDashboardCount()
      .then((response) => {
        // console.log(response.data.data);
        const dataValue = response && response.data && response.data.data;

        let dataForTopCardTemp = [
          {
            Title: dataValue?.today ? dataValue.today : 0,
            colorValue: "#F86060",
            borderColorValue: "#F86060",
            discText: "Today's challenge",
          },
          {
            Title: dataValue?.upcoming ? dataValue.upcoming : 0,
            colorValue: "#0990F2",
            borderColorValue: "#0990F2",
            discText: "Upcoming challenge",
          },
          {
            Title: dataValue?.total ? dataValue.total : 0,
            colorValue: "#F8B471",
            borderColorValue: "#F8B471",
            discText: "Total challenge",
          },
          {
            Title: dataValue?.completed ? dataValue.completed : 0,
            colorValue: "#44CEBB",
            borderColorValue: "#44CEBB",
            discText: "Total challenge completed",
          },
        ];

        this.setState({ valueForTopCard: dataForTopCardTemp });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    // Simple GET request using axios
    this.fetchAllData();
    this.challengeDashboardCount();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState, this.state.isCreateModalOpen);
    if (this.state.isCreateModalOpen !== prevState.isCreateModalOpen) {
      this.fetchAllData();
    }
  }
  handleModalOpenForNewC = () => {
    this.setState({
      isCreateModalOpen: true,
      isForEdit: false,
    });
  };
  handleModalCloseForNewC = () => {
    this.setState({
      isCreateModalOpen: false,
    });
  };

  render() {
    const {
      searchvalue,
      isForEdit,
      valueForCard,
      valueForTopCard,
      isCreateModalOpen,
    } = this.state;
    return (
      <>
        <Row>
          {valueForTopCard && valueForTopCard.length
            ? valueForTopCard.map((data, index) => {
                return (
                  <Col xs="12" sm="6" lg="3" key={index}>
                    <TopCardDetail
                      Title={data.Title}
                      colorValue={data.colorValue}
                      borderColorValue={data.borderColorValue}
                      discText={data.discText}
                    />
                  </Col>
                );
              })
            : null}

          {/* <Col xs="12" sm="6" lg="3">
            <TopCardDetail
              Title={"05"}
              colorValue="#0990F2"
              borderColorValue="#0990F2"
              discText="Upcoming challenge"
            />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <TopCardDetail
              Title={"05"}
              colorValue="#F8B471"
              borderColorValue="#F8B471"
              discText="Total challenge"
            />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <TopCardDetail
              Title={"05"}
              colorValue="#44CEBB"
              borderColorValue="#44CEBB"
              discText="Total challenge completed"
            />
          </Col> */}
        </Row>
        <div className="mt-2 d-flex flex-column flex-sm-row flex-row justify-content-end">
          <div className="mr-sm-2">
            <div className="search-bar">
              <Form>
                <FormGroup className="position-relative has-icon-left">
                  <Input
                    type="text"
                    className="round"
                    placeholder="Search..."
                    value={searchvalue}
                    onChange={(e) =>
                      this.setState({ searchvalue: e.target.value })
                    }
                  />
                  <div className="form-control-position px-1">
                    <Search size={15} />
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>
          <div sm="12" lg="3">
            <Button color="danger" onClick={this.handleModalOpenForNewC}>
              Create New Challenge
            </Button>
          </div>
        </div>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" style={{background:"white"}}>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.active === "1",
                  })}
                  style={{margin: "5px"}}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Today's challenge
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.active === "2",
                  })}
                  style={{margin: "5px"}}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Upcoming challenge
                </NavLink>
              </NavItem>
              {/* <NavItem>
                    <NavLink disabled>Disabled</NavLink>
                  </NavItem> */}
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.active === "3",
                  })}
                  style={{margin: "5px"}}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Completed Challenge
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={this.state.active}>
              <TabPane tabId="1">
                <Row className="mt-3">
                  {/* <InfiniteScroll
          dataLength={valueForCard.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        > */}
                  {valueForCard &&
                    valueForCard.map((data, index) => {
                      return (
                        <Col key={index} xs="12" sm="6" md="4" lg="3">
                          <CardDetail
                            index={index}
                            img={data.avatar}
                            title={data.challengename}
                            RangeTime={
                              data &&
                              data.schedulechallenge &&
                              data.schedulechallenge.from
                                ? data.schedulechallenge.from
                                : ""
                            }
                            dateValue={
                              data &&
                              data.schedulechallenge &&
                              data.schedulechallenge.to
                                ? data.schedulechallenge.to
                                : ""
                            }
                            Button_Name="Go to Challenge"
                            Price={data.priceamount}
                            tagValue={data.tags}
                            data={data}
                          />
                        </Col>
                      );
                    })}
                    {/* </InfiniteScroll> */}
                </Row>
              </TabPane>
              <TabPane tabId="2">
              <Row className="mt-3">
                  {valueForCard &&
                    valueForCard.map((data, index) => {
                      return (
                        <Col key={index} xs="12" sm="6" md="4" lg="3">
                          <CardDetail
                            index={index}
                            img={data.avatar}
                            title={data.challengename}
                            RangeTime={
                              data &&
                              data.schedulechallenge &&
                              data.schedulechallenge.from
                                ? data.schedulechallenge.from
                                : ""
                            }
                            dateValue={
                              data &&
                              data.schedulechallenge &&
                              data.schedulechallenge.to
                                ? data.schedulechallenge.to
                                : ""
                            }
                            Button_Name="Go to Challenge"
                            Price={data.priceamount}
                            tagValue={data.tags}
                            data={data}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </TabPane>
              <TabPane tabId="3">
              <Row className="mt-3">
                  {valueForCard &&
                    valueForCard.map((data, index) => {
                      return (
                        <Col key={index} xs="12" sm="6" md="4" lg="3">
                          <CardDetail
                            index={index}
                            img={data.avatar}
                            title={data.challengename}
                            RangeTime={
                              data &&
                              data.schedulechallenge &&
                              data.schedulechallenge.from
                                ? data.schedulechallenge.from
                                : ""
                            }
                            dateValue={
                              data &&
                              data.schedulechallenge &&
                              data.schedulechallenge.to
                                ? data.schedulechallenge.to
                                : ""
                            }
                            Button_Name="Go to Challenge"
                            Price={data.priceamount}
                            tagValue={data.tags}
                            data={data}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </TabPane>
            </TabContent>
          </TabPane>
          {/* <TabPane className="component-code" tabId="2">
                {tabsJustified}
              </TabPane> */}
        </TabContent>

        {/* <Row className="mt-3">
          {valueForCard &&
            valueForCard.map((data, index) => {
              return (
                <Col key={index} xs="12" sm="6" md="4" lg="3">
                  <CardDetail
                    index={index}
                    img={data.avatar}
                    title={data.challengename}
                    RangeTime={
                      data &&
                      data.schedulechallenge &&
                      data.schedulechallenge.from
                        ? data.schedulechallenge.from
                        : ""
                    }
                    dateValue={
                      data &&
                      data.schedulechallenge &&
                      data.schedulechallenge.to
                        ? data.schedulechallenge.to
                        : ""
                    }
                    Button_Name="Go to Challenge"
                    Price={data.priceamount}
                    tagValue={data.tags}
                    data={data}
                  />
                </Col>
              );
            })} */}
        {/* 
          <Col xs="12" sm="6" lg="3">
            <CardDetail Button_Name="Go to Challenge" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <CardDetail Button_Name="Go to Challenge" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <CardDetail Button_Name="Go to Challenge" />
          </Col> */}
        {/* </Row> */}
        {/* <div className=" d-flex justify-content-center my-2">
          <Button
            className="button_color_0990f2 text-white"
          >
            View More
          </Button>
        </div> */}
        <CreateChallenge
          isForEdit={isForEdit}
          toggle={this.handleModalCloseForNewC}
          modal={isCreateModalOpen}
        />
      </>
    );
  }
}
