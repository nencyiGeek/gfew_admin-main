import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col
} from "reactstrap"
// import RegisterFirebase from "./RegisterFirebase"
// import RegisterAuth0 from "./RegisterAuth0"
import RegisterJWT from "./RegisterJWT"
import coverImg from "../../../../assets/img/logo/coverImg.jpg"
import "../../../../assets/scss/pages/authentication.scss"

class Register extends React.Component {
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
          className="login-card rounded-5 mb-0 h-auto w-auto" 
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
                <Card className="rounded-0 mb-0 p-2" style={{    height: "100%"}} >
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h4 className="mb-0 sign-up-title" style={{color:"#016937"}}><b>Sign Up</b></h4>
                    </CardTitle>
                  </CardHeader>
                  {/* <p className="px-2 auth-title mb-0">
                    Fill the below form to create a new account.
                  </p> */}
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
                        Register
                      </NavLink>
                    </NavItem>
                    
                  </Nav> */}
                  <CardBody className="pt-1 pb-50">
                    {/* <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1"> */}
                        <RegisterJWT />
                      {/* </TabPane>
                    </TabContent> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Register
