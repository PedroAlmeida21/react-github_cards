import React from 'react';
import './style/App.css';
import './style/github.scss';
import axios from 'axios';

// function Button(props) {
//   return <button onClick={props.onClick}>+{props.increment}</button>;
// }

// function Display(props) {
//   return <div>{props.counterNumber}</div>
// }

// function App(){
//   const [counter, setCounter] = useState(0);
//   const incrementNumber = () => setCounter(counter + 1);

//   const incrementTypeOne = 1;
//   const incrementTypeTwo = 2;

// return(
//   <div>
//     <Button onClick={() => setCounter(counter + incrementTypeOne)} increment={incrementTypeOne}/>
//     <Button onClick={() => setCounter(counter + incrementTypeTwo)} increment={incrementTypeTwo}/>
//     <Display counterNumber={counter}/>
//   </div>);
// }



// export  {
//   Button,
//   Display,
//   App
// }

class Card extends React.Component{
  render(){
    return(
      <div className="github-profile">
        <img src={this.props.avatar_url} alt=""/>
        <div className="info">
          <div className="name">{this.props.name}</div>
          <div className="company">{this.props.company}</div>
        </div>
      </div>
    );
  }
}

const CardList = (props) => (
  <div>
    {props.profile.map(element => <Card key={element.id} {...element}/>)}
  </div>
);

class Form extends React.Component{
  state = {userName: ''};

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.userName);
    const response = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    console.log(response.data);
    this.props.onSubmit(response.data);
    this.setState({userName: ''});
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="GitHub username" 
          value={this.state.userName} 
          onChange={event=>this.setState({userName: event.target.value})}
          required/>
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component{

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     profiles: []
  //   };
  // }

  state = {
    profiles: []
  };
  
  addNewProfile = (newProfile) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, newProfile]
    }));
  };

  render(){
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profile={this.state.profiles}/>
      </div>
    );
  }
}

export {
  App
}
