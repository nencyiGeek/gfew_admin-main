import React from "react"
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody
} from "reactstrap"
import classnames from "classnames"
import { Settings, Lock, Info, Instagram, Link, Bell } from "react-feather"
import GeneralTab from "./General"
import ChangePassword from "./ChangePassword"
import InfoTab from "./Info"
import SocialLinks from "./SocialLinks"
import Connection from "./Connection"
import Notifications from "./Notifications"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

import "../../../assets/scss/pages/account-settings.scss"

class AccountSettings extends React.Component {
  state = {
    activeTab: "1",
    windowWidth: null
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }

  updateWidth = () => {
    this.setState({ windowWidth  : window.innerWidth })
  }

  componentDidMount() {
    if(window !== undefined){
      this.updateWidth()
      window.addEventListener("resize", this.updateWidth)
    }
  }
  

  render() {
    let {windowWidth} = this.state
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Account Settings"
          breadCrumbParent="Pages"
          breadCrumbActive="Account Settings"
        />
        <div className={`${windowWidth >= 769 ? "nav-vertical" : "account-setting-wrapper"}`}>
          <Nav className="account-settings-tab nav-left mr-0 mr-sm-3" tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "1"
                })}
                onClick={() => {
                  this.toggle("1")
                }}
              >
                <Settings size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">General</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "2"
                })}
                onClick={() => {
                  this.toggle("2")
                }}
              >
                <Lock size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Change Password</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "3"
                })}
                onClick={() => {
                  this.toggle("3")
                }}
              >
                <Info size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "4"
                })}
                onClick={() => {
                  this.toggle("4")
                }}
              >
                <Instagram size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Social Links</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "5"
                })}
                onClick={() => {
                  this.toggle("5")
                }}
              >
                <Link size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Connections</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "6"
                })}
                onClick={() => {
                  this.toggle("6")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Notifications</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "7"
                })}
                onClick={() => {
                  this.toggle("7")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Survey</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "6"
                })}
                onClick={() => {
                  this.toggle("8")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Acceptance Video</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "9"
                })}
                onClick={() => {
                  this.toggle("9")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Upload Food Image</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "10"
                })}
                onClick={() => {
                  this.toggle("10")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Review</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "11"
                })}
                onClick={() => {
                  this.toggle("11")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Invite Friends</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "12"
                })}
                onClick={() => {
                  this.toggle("12")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Poll</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "13"
                })}
                onClick={() => {
                  this.toggle("13")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Launch class</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "14"
                })}
                onClick={() => {
                  this.toggle("14")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Launch Competition </span>
              </NavLink>
            </NavItem>

          </Nav>
          <Card>
            <CardBody>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <GeneralTab />
                </TabPane>
                <TabPane tabId="2">
                  <ChangePassword />
                </TabPane>
                <TabPane tabId="3">
                  <InfoTab />
                </TabPane>
                <TabPane tabId="4">
                  <SocialLinks />
                </TabPane>
                <TabPane tabId="5">
                  <Connection />
                </TabPane>
                <TabPane tabId="6">
                  <Notifications />
                </TabPane>
                <TabPane tabId="7">
                  <Notifications />
                </TabPane>
                <TabPane tabId="7">
                  <Notifications />
                </TabPane>
                <TabPane tabId="7">
                  <Notifications />
                </TabPane>
                <TabPane tabId="8">
                  <Notifications />
                </TabPane>
                <TabPane tabId="9">
                  <Notifications />
                </TabPane>
                <TabPane tabId="10">
                  <Notifications />
                </TabPane>
                <TabPane tabId="11">
                  <Notifications />
                </TabPane>
                <TabPane tabId="12">
                  <Notifications />
                </TabPane>
                <TabPane tabId="13">
                  <Notifications />
                </TabPane>
                <TabPane tabId="14">
                  <Notifications />
                </TabPane>
                <TabPane tabId="15">
                  <Notifications />
                </TabPane>
                
              </TabContent>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}

export default AccountSettings
