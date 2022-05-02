import React from "react";
import { Link } from "react-router-dom";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions";
import { connect } from "react-redux";
import { history } from "../../../../history";
import axios from "axios";
import { Alert } from "reactstrap";
import { API_ROOT } from "../../../../config";
import "../../../../assets/scss/loginJWT.scss";
// const history = useHistory();
class LoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    error: "",
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.callApi();
  };

  componentDidMount() {}

  callApi() {
    // console.log('calling api');
    const { email, password } = this.state;

    const base_url = API_ROOT;
    axios
      .post(base_url + "auth/login", {
        email: email,
        password: password,
        login_type: "email",
      })
      .then((response) => {
        var loggedInUser;
        // console.log(response.data.data);
        if (response.data) {
          loggedInUser = response.data.data.user;
          this.props.loginWithJWT(loggedInUser);
          localStorage.setItem("geteatfitwell", JSON.stringify(loggedInUser));
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({ error: err.response.data.error });
        } else {
          this.setState({ error: "Something went wrong" });
        }
      });
  }

  render() {
    const { error } = this.state;
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          {error !== "" && <Alert color="warning">{error}</Alert>}
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup>
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              {/* <div className="form-control-position">
                <Mail size={15} />
              </div> */}
              {/* <Label>Email</Label> */}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              {/* <div className="form-control-position">
                <Lock size={15} />
              </div> */}
              {/* <Label>Password</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              {/* <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              /> */}
              <div className="forgot-password-label">
                <Link to="/forgetPassword">Forgot Password?</Link>
              </div>
            </FormGroup>
            {/* <div className="d-flex justify-content-between"> */}
            {/* <Button.Ripple
                color="primary"
                outline
                // onClick={() => {
                //   history.push("/register")
                // }}
                href="/register"
              >
                Register
              </Button.Ripple> */}
            <div className="d-flex justify-content-center ">
              <Button
                style={{ width: "75%" }}
                className="login-button"
                type="submit"
              >
                Login
              </Button>
            </div>
            {/* </div> */}
            <div className="icon-login-list">
              <div className="facebook-icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="svg-inline--fa fa-facebook-f fa-w-10 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    class=""
                  ></path>
                </svg>
              </div>

              <div className="facebook-icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  class="svg-inline--fa fa-google fa-w-16 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    class=""
                  ></path>
                </svg>{" "}
              </div>

              <div className="facebook-icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="linkedin-in"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="svg-inline--fa fa-linkedin-in fa-w-14 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                    class=""
                  ></path>
                </svg>{" "}
              </div>

              <div className="facebook-icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="comments"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  class="svg-inline--fa fa-comments fa-w-18 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
                    class=""
                  ></path>
                </svg>{" "}
              </div>
            </div>

            <div className="sign-up-label not-account">
              <label>Don't have an account?</label>
              <p onClick={() => history.push("/register")}>&nbsp; Sign Up</p>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT);
