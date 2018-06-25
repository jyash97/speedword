import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      value: "",
      words:[],
      index:0,
      count:60,
      error:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
  }

  handleChange(e) {
    console.log(true);
    const value = e.target.value;
    if(value !== ' '){
      if(this.state.words[this.state.index].startsWith(value)){
        this.setState({
          error:false,
          value
        })
      }else{
        this.setState({
          error:true,
          value
        })
      }
    }
  }

  handleSpace(e){
    if(e.key.toLowerCase() === ' '){
      if(e.target.value === this.state.words[this.state.index]){
        this.setState({
          index:this.state.index + 1,
          value:''
        })
      }
    }
  }

  componentDidMount() {
    fetch("http://www.randomtext.me/api/")
      .then(raw => raw.json())
      .then(data => {
        const text = data.text_out.split("<p>")
          .join("")
          .split("</p>")
          .join("");
        const words = text.split(' ');
        this.counter = setInterval(() => this.setState({
          count:this.state.count - 1
        }),1000)
        return this.setState({
          text,
          words
        });
      });

    this.interval = setTimeout(()=>this.handleTimeout(),60000)
  }

  handleTimeout(){
    clearInterval(this.counter)
    this.setState({
      timeOut:true,
      count:0
    })
  }

  componentWillUnmount(){
    clearInterval(this.counter)
  }

  render() {
    return (
      <div className="container">
        <h1>Time Left : {this.state.count}s</h1>
        <p>
          {this.state.words.map((word,index) => index < this.state.index ? <strong key={word}>{word} </strong> : `${word} `
          )}
        </p>
        {
          this.state.timeOut ? `${this.state.index} wpm` : <input className={this.state.error ? 'red' : 'green'} value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleSpace}/>
        }
      </div>
    );
  }
}

export default App;
