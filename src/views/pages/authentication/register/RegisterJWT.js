import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { connect } from "react-redux";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";
import { Alert } from "reactstrap";
import { history } from "../../../../history";
import { signUp } from "../../../../action/auth";
import "../../../../assets/scss/registerJWT.scss"
class RegisterJWT extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile: "",
    confirmPass: "",
    error: "",
    sucess: false,
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      login_type: "email",
      phone: this.state.mobile,
      email: this.state.email,
      password: this.state.password,
      lat: "1.2",
      long: "0.0",
      zipcode: "12345",
      first_name: this.state.first_name,
      social_token: "123455",
      last_name: this.state.last_name,
    };
    await signUp(payload);
    // this.callApi();
  };
  // callApi(){
  //   const {email, password, first_name, last_name,mobile} = this.state;
  //   const base_url = "http://localhost:2000";
  //   axios
  //   .post(base_url + "/api/v1/auth/register", {
  //     login_type:'email',
  //     phone:  mobile,
  //     email: email,
  //     password: password,
  //     lat:'1.2',
  //     long: '0.0',
  //     zipcode: '12345',
  //     first_name: first_name,
  //     social_token: '123455',
  //     last_name: last_name,
  //   })
  //   .then(response => {
  //     console.log(response);
  //     this.setState({sucess : true})
  //     if(response.data){
  //       history.push("/login");
  //     }

  //   })
  //   .catch(err => console.log(err.response.data))
  // }

  render() {
    const { error, sucess } = this.state;
    return (
      <Form onSubmit={this.handleRegister}>
        {error !== "" && <Alert color="warning">{error}</Alert>}
        {sucess && (
          <Alert color="success">{"User Registered sucessfully"} </Alert>
        )}

        <FormGroup >
          <Input
            name="first_name"
            type="text"
            placeholder="First Name"
            required
            value={this.state.first_name}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          {/* <Label>First Name</Label> */}
        </FormGroup>
        <FormGroup >
          <Input
            name="last_name"
            type="text"
            placeholder="Last Name"
            required
            value={this.state.last_name}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          {/* <Label>Last Name</Label> */}
        </FormGroup>
        <FormGroup >
          <Input
            name="mobile"
            type="text"
            placeholder="Mobile"
            required
            value={this.state.mobile}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          {/* <Label>Mobile</Label> */}
        </FormGroup>
        <FormGroup >
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          {/* <Label>Email</Label> */}
        </FormGroup>

        <FormGroup >
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          {/* <Label>Password</Label> */}
        </FormGroup>
        <FormGroup >
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            value={this.state.confirm_password}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          {/* <Label>Confirm Password</Label> */}
        </FormGroup>
        <FormGroup className="d-flex justify-content-center align-items-center">
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            // defaultChecked={true}
          />
        </FormGroup>
        <div className="d-flex justify-content-center ">
          <Button style={{ width: "75%" }} className="sign-up-button"  type="submit">
            Sign Up
          </Button>
          {/* <Button.Ripple
            color="primary"
            outline
            // onClick={() => {
            //   history.push("login")
            // }}
            href="/login"
          >
            Login
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple> */}
        </div>
        <div className="sign-up-label d-flex justify-content-center">
          <label>I have an account?</label>
          <p onClick={() => history.push("/login")}>&nbsp; Login</p>
        </div>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.register,
  };
};
export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT);
