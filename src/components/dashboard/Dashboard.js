import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './Dashboard.css';
class Dashboard extends Component {

  state = {
    verbs: [],
    tenseText: "Press",
        verbText: "The ",
        formText: "Start Button",
        verbIndex: 0,
        formIndex: 0,
        userAttempt: "",
        score: 0,
        started: false
  };


  handleChange = (e) => {
        
    this.setState({ userAttempt: e.target.value})
  }

  runMain = () => {

    if (this.state.started) {
      if (this.state.verbs) {
        let verbIndex = this.state.verbIndex;
        let tenseIndex = this.state.tenseText;
        let formIndex = this.state.formIndex;

        console.log(this.state.verbs[verbIndex][tenseIndex][formIndex]);
        

        let answer = this.state.verbs[verbIndex][tenseIndex][formIndex];
        console.log(typeof answer);


        if (this.state.userAttempt === answer) {
            this.loadVerbs();
            this.state.score++;
        }

        
    }
    }
    
   
}

loadVerbs = () => {

    if (this.state.verbs.length > 0) {

      //change to be number of tenses
      let randTense = Math.floor(Math.random() * 4);
      
      switch (randTense) {
          case 0:
               this.setState({ tenseText: "present"});
               break;
          case 1:
              this.setState({ tenseText: "preterite"});
              break;
          case 2:
              this.setState({ tenseText: "imperfect"});
              break;
          case 3:
              this.setState({ tenseText: "future"});
              break;
          
      }

      let randVerb = Math.floor(Math.random() * this.state.verbs.length);
     
      this.setState({ verbText: this.state.verbs[randVerb].verb});
      this.setState({ verbIndex: randVerb});

      //will always be 6 because randForm will be betweeen 0 and 5 (6 different forms)
      let randForm = Math.floor(Math.random() * 6);
      this.setState({ formIndex: randForm });
      switch (randForm) {
          case 0:
              this.setState( {formText: "yo"});
              break;
          case 1:
              this.setState( {formText: "tú"});
              break;
          case 2:
              this.setState( {formText: "él/ella/usted"});
              break;
          case 3:
              this.setState( {formText: "nosotros"});
              break;
          case 4:
              this.setState( {formText: "vosotros"});
              break;
          case 5:
              this.setState( {formText: "ellos/ellas/ustedes"});
              break;
      
      }
    
  }

  if (!this.state.started) {
    this.setState({started: true});
  }

}

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.getDefaultVerbs()
      .then(res => (this.setState({verbs: res})))
      .catch(err => console.log(err));
    //.then(res => this.setState({ verbs: res}))
  }

  getDefaultVerbs = async () => {
    
    let url = "https://verbconj.herokuapp.com/getverbs";
    //const verbsresponse = await fetch('/getverbs');
    const verbsresponse = await fetch(url);
    console.log(verbsresponse);
    const verbsbody = await verbsresponse.json();
    console.log("In the function")
  
    console.log(verbsresponse);
    if (verbsresponse.status !== 200) {
      throw Error(verbsbody.message);
    }
    
    console.log(verbsbody);
    return verbsbody;
  };

render() {
    const { user } = this.props.auth;
return (

      <div className="mainBody">

          <div className="Greeting">

         
          {/* .split(" ")[0] */}
          <h4>
              <b>Welcome </b> {user.name + "!"}
              {/* <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app
              </p> */}
              <p>Hit start to begin </p>
            </h4>

          </div>

        <div className="Fieldtext">
          <p>Tense:</p>
          &nbsp;
          <p id = "tenseLabel"> {this.state.tenseText}</p>
          <br/>
        </div>


        <div className="Fieldtext">
         <p>Verb: </p>
         &nbsp;
         <p id = "verbLabel"> {this.state.verbText} </p>
         </div>


         <div className="Fieldtext">
         <p>Form: </p>
         &nbsp;
         <p id = "formLabel"> {this.state.formText} </p>

         </div>

         <div className="submitField">
            <input type = "text" ref = "userInput" value ={this.state.userAttempt} onChange={this.handleChange}></input>
            &nbsp;
            <button className="submitButton" onClick = {this.runMain}>Submit</button>
         </div>
        
        <br/>

        <div className="StartAndScore">
          {this.state.started ? <button className="startButton" >Conjugate Above!</button> :
          <button className="startButton" onClick = {this.loadVerbs} >Start</button>}
            
            <br/>
            &nbsp;
            &nbsp;
            &nbsp;
            <p id = "score"> Your score is: {this.state.score}</p>
        </div>

          
           
        

          <div className = "ending">
            <button onClick={this.onLogoutClick} className="logoutButton">
                Logout
              </button>
          </div>
      

      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);