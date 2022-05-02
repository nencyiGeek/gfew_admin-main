import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col
} from "reactstrap"

import coverImg from "../../../../assets/img/logo/coverImg.jpg"
import "../../../../assets/scss/pages/authentication.scss"
// import LoginAuth0 from "./LoginAuth0"
// import LoginFirebase from "./LoginFirebase"
import LoginJWT from "./LoginJWT"

class Login extends React.Component {
  state = {
    activeTab: "1"
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    return (
      <Row 
      className="m-0 justify-content-center"
      style={{height: "100%"}}
      >
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center align-items-center"
          style={{ padding: "0"}}
        >
          <Card 
          style={{
          backgroundColor:"#016937"}}
          className="login-card rounded-5 mb-0 h-auto w-auto m-2" 
          >
            <Row className="m-0 d-flex justify-content-center">
            <Col
                md="6"
                sm="12"
                className="text-center d-none d-lg-block align-self-center px-1 py-0 p-5"
              >
                <img  className="img-fluid" src={coverImg} alt="coverImg"  />
              </Col>
              

              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2" style={{height: "100%"}} >
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h3 className="mb-0 login-title" style={{color:"#016937"}}><b>Your Recipes Are Waiting</b></h3>
                      <p className="login-view-content text-muted"  >To get personalised recommendation & use all of get Fit Feature, please Connect below</p>
                    </CardTitle>
                  </CardHeader>
                  {/* <p className="px-2 auth-title">
                    Welcome back, please login to your account.
                  </p> */}
                  <LoginJWT />
                  {/* <Nav tabs className="px-2">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        Login
                      </NavLink>
                    </NavItem> */}
                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
                      >
                        Firebase
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
                        Auth0
                      </NavLink>
                    </NavItem> */}
                  {/* </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <LoginJWT />
                    </TabPane> */}
                    {/* <TabPane tabId="2">
                      <LoginFirebase />
                    </TabPane>
                    <TabPane tabId="3">
                      <LoginAuth0 />
                    </TabPane> */}
                  {/* </TabContent> */}
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login
