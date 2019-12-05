import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
  }

  if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}



  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  onSubmit = e => {
    e.preventDefault();const userData = {
      email: this.state.email,
      password: this.state.password
    };
    

    this.props.loginUser(userData);
  };


  render() {
    const { errors } = this.state;
    
    return (
     
          <div className="loginBody">
            <div className="backToHomeButton">
            <Link to="/" className="backToHomeLink"> Back to home </Link>
            </div>
            <div className="infoText" style={{ paddingLeft: "11.250px" }}> 
              <h4> Login below </h4>
              <p className="foo"> Don't have an account? 
                &nbsp;
                <Link to="/register" className="registerLink">Register</Link>
              </p>
            </div>


            <form noValidate onSubmit={this.onSubmit}>
              <div className="emailField">
                <label htmlFor="email">Email</label>
                &nbsp;
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>

                <br/>

                <label htmlFor="password">Password</label>
                &nbsp;
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                
                
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>

                <br/>

              </div>




              <div className="passwordField">
               
              </div>


              


              <div className="loginDiv">
                <button type="submit" className="loginButton"> Login </button>
              </div>
            </form>
          </div>
        
      
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
