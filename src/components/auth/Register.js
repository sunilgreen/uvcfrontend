import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import './Register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }; 
    
    if (this.state.name != null) {
      this.props.registerUser(newUser, this.props.history);
    }
    //this.props.registerUser(newUser, this.props.history);
  };

 
  
  render() {
    const { errors } = this.state;
    
    return (
      <div>

          <div className="backToHomeButton2">
          <Link to="/" className="backToHomeLink2">
            Back to home
          </Link>

          </div>

          <h4 className="centerText"> Register below</h4>
          <div className="haveAccount">

         
              
              <p className="grey-text text-darken-1">
                Already have an account? 
                &nbsp;

                <Link to="/login" className="loginButton2">Log in</Link>
              </p>

            </div>

            <br/>
            <br/>

            <div className="mainForm">
            
            <form noValidate onSubmit={this.onSubmit} className="theForm">
            <div className="input-field col s12">
            <label htmlFor="name">Name: </label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="name"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
               <p className="red-text">{errors.name}</p>
              </div>
          
              <div className="leftLabel">
              <label htmlFor="email">Email:</label>
              &nbsp;
             
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}/>
                  <p className="red-text">{errors.email}</p>

              </div>
              <div className="input-field col s12">
                <label htmlFor="password">Password: </label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}/>

                  <p className="red-text">{errors.password}</p>
              
              </div>
              <div className="input-field col s12">
              <label htmlFor="password2">Confirm Password: </label>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}/>
                
                <p className="red-text">{errors.password2}</p>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  type="submit"
                  className="signUpButton">
                  Sign up
                </button>
              </div>
            </form>

            </div>

            </div>
         
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};




const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});



export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));