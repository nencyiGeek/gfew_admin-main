import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
} from "reactstrap";
import classnames from "classnames";
// import { ModalComponent } from "../../components/utils";
// import winnerImage from "../../assets/img/logo/winner-trophy.jpg";
import * as Icon from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCoffee,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import Info from "../../components/Challenge/Info";
import RecentActivity from "../../components/Challenge/recentActivity";
import Rules from "../../components/Challenge/rules";
import ToDo from "../../components/Challenge/todo";
import { history } from "../../history";
import { toast } from "react-toastify";
import * as ApiCallIng from "../../ApiStructure";
// import Skipped from "../../components/Challenge/skipped";
import CreateChallenge from "../../views/challenge/CreateChallenge";
import ConfirmModal from "../../components/utils/ConfirmModal";

const ChallengeTabs = ["Info", "Rules", "ToDo", "Recent Activity"];
class Challenge extends Component {
  state = {
    activeTab: 0,
    active: 0,
    isCreateModalOpen: false,
    dataChallenge: null,
    recentactivitydata: null,
    totalcount: 0,
    deleteModalShow: false
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
  handleDeleteChallenge = () => {
    // console.log(history.location.search);
    const SearchQuery = history.location.search;
    const SearchQuerySplit = SearchQuery.split("id=");
    if (SearchQuerySplit.length > 1) {
      ApiCallIng.deleteParticularChallenge(SearchQuerySplit[1])
        .then((response) => {
          // console.log(response.data);
          toast.success("Challenge successfully deleted!");
          history.push("/challenge/dashboard");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to delete this challenge!");
        });
    } else {
      toast.error("Unable to delete this challenge!");
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isCreateModalOpen !== this.state.isCreateModalOpen) {
      const SearchQuery = history.location.search;
      const SearchQuerySplit = SearchQuery.split("id=");
      // console.log(SearchQuerySplit);
      if (SearchQuerySplit.length > 1) {
        this.fetchParticularChallenge(SearchQuerySplit[1]);
      }
    }
  };
  componentDidMount = () => {
    // console.log(history.location.search);
    const SearchQuery = history.location.search;
    const SearchQuerySplit = SearchQuery.split("id=");
    // console.log(SearchQuerySplit);
    if (SearchQuerySplit.length > 1) {
      this.fetchParticularChallenge(SearchQuerySplit[1]);
      this.fetchAllRecentActivity(SearchQuerySplit[1]);
      this.fetchUserCountInChallenge(SearchQuerySplit[1])
    }
  };
  fetchAllRecentActivity = (id) => {
    ApiCallIng.fetchAllRecentActivity(id)
      .then((res) => {
        // console.log(res.data.data);
        const data = res.data.data;
        
        // console.log(data);
        this.setState({ recentactivitydata: data }, () => {
          // console.log(this.state.recentactivitydata);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchUserCountInChallenge = (id) => {
    ApiCallIng.countUserInChallenge(id)
    .then((res) => {
      // console.log(res.data.data.total_users);
      this.setState({totalcount : res.data.data.total_users})
    })
    .catch((err) => {
      console.log(err);
    })
  }
  fetchParticularChallenge = (id) => {
    ApiCallIng.fetchParticularChallenge(id)
      .then((res) => {
        this.setState(
          {
            dataChallenge: res.data.data,
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleModalCloseForEditC = () => {
    this.setState({
      isCreateModalOpen: false,
    });
  };
  handleModalOpenForEditC = () => {
    // console.log("open");

    this.setState({
      isCreateModalOpen: true,
    });
  };

  handleDeleteConfirm = () => {
    this.setState(prevState => ({
      deleteModalShow: !prevState.deleteModalShow
    }))
    console.log(this.state.deleteModalShow)
  }


  challengeTabHeaders = () => {
    return ChallengeTabs.map((data, index) => {
      return (
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === index,
            })}
            onClick={() => {
              this.toggle(index);
            }}
          >
            {data}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    // console.log("-stater--", this.state);
    const { dataChallenge, totalcount } = this.state;
    // console.log(dataChallenge?.challengename);
    return (
      <>
        <React.Fragment>
          <Card className="challenge-view">
            <CardHeader>
              <CardTitle className="challenge-header-title">
                <Row>
                  <Col className=" align-self-center px-1 py-0 challenge-title">
                    <h2>
                      {dataChallenge?.challengename
                        ? dataChallenge?.challengename
                        : ""}
                    </h2>
                    <p>
                      {dataChallenge?.description
                        ? dataChallenge?.description
                        : ""}
                    </p>
                  </Col>
                  <Col xs="3" className="d-flex justify-content-end ">
                    <Icon.Trash2
                      className="cursor-pointer"
                      // onClick={this.handleDeleteChallenge}
                      onClick={this.handleDeleteConfirm}
                      
                    />
                  </Col>
                  {/* <Col lg="6" md="6" sm="6" xs="6" className="text-center align-self-center px-1 py-0"> */}
                  {/* <img src={winnerImage} alt="loginImg" /> */}
                  {/* </Col> */}
                </Row>
                <Row className="challenge-desc-info">
                  <Col sm="6" className="challenge-col">
                    <Button
                      onClick={this.handleModalOpenForEditC}
                      color="danger"
                      className="join-challenge-button"
                    >
                      Edit Challenge
                      {/* <Icon.ArrowRight size={20} className="fonticon-wrap" /> */}
                    </Button>
                  </Col>
                  <Col
                    sm="6"
                    className="challenge-col d-flex align-items-center justify-content-sm-end mt-sm-0 mt-2"
                  >
                    <Icon.Users size={20} className="fonticon-wrap" /> {totalcount ? totalcount : 0} &nbsp;
                    <FontAwesomeIcon icon={faTrophy} /> $
                    {dataChallenge?.priceamount
                      ? dataChallenge?.priceamount
                      : ""}
                  </Col>
                </Row>
              </CardTitle>
            </CardHeader>
            <CardBody className="challenge-view-body">
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={0}>
                  <Nav tabs className="nav-justified">
                    {this.challengeTabHeaders()}
                  </Nav>
                  <TabContent className="py-50" activeTab={this.state.active}>
                    {/* {this.ChallengeTabComponents.map((data, index) => {
                    return <TabPane tabId={index}>{data}</TabPane>;
                  })} */}
                    <TabPane tabId={0}>
                      <Info dataChallenge={this.state.dataChallenge} />
                    </TabPane>
                    <TabPane tabId={1}>
                      <Rules dataChallenge={this.state.dataChallenge} />
                    </TabPane>
                    <TabPane tabId={2}>
                      <ToDo dataChallenge={this.state.dataChallenge} />
                    </TabPane>
                    <TabPane tabId={3}>
                      <RecentActivity
                        dataChallenge={this.state.dataChallenge}
                        recentactivitydata={this.state.recentactivitydata}
                      />
                    </TabPane>
                  </TabContent>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </React.Fragment>
        <CreateChallenge
          isForEdit={true}
          toggle={this.handleModalCloseForEditC}
          modal={this.state.isCreateModalOpen}
          dataChallenge={this.state.dataChallenge}
        />
        <ConfirmModal
            modal={this.state.deleteModalShow}
            toggleModal={this.handleDeleteConfirm}
            onConfirm={this.handleDeleteChallenge}
            title="Delete Challenge"
            body="Are you sure you want to delete challenge ?"
            buttonText="Delete"
            buttonColor="danger"
          />
      </>
    );
  }
}
export default Challenge;