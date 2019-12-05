import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
      <div className="About">
        <p className="homepageFiller"> 
        The Ultimate Verb Conjugator is a language practicing tool for 
        foreign language learners. It helps them master different verb tenses
        and conjugations. Coming soon: French, German, Italian, and more!<br/> <br/>For now
        a protoype Spanish Verb Conjugator is up and running.
       
        </p>
      </div>
      <div className="buttons">   
              
              <Link to="/register" className="regLinkButton">
                Register
              </Link>

              &nbsp;

              
              <Link to="/login" className="loginLinkButton">
                Log In
              </Link>

          </div>


          </div>
      

      
    );
  }
}

export default Landing;