import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { dataSource: [{ id: 0, text: 'Checker Rate', status: true }] };
  }
  componentDidMount() {
  debugger;  
  }
  updateState(id,state){
    let index=-1;
    for(let i=0;i<this.state.dataSource.length;i++){
      if (this.state.dataSource[i].id.toString() === id) {
        index = i;
        break;
      }
    }
    if(index!==-1){
      let data=this.state.dataSource.slice(0);
      data[index].status=state;
      this.setState({dataSource:data});
    }
  }
  keypress(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
      this.setState({
        dataSource: ([{
          id: (this.state.dataSource.length + 1),
          text: this.refs.edit.value,
          status: false
        }]).concat(this.state.dataSource)
      });
      this.refs.edit.value = '';
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <input type="text" ref='edit' onKeyUp={this.keypress.bind(this)} />
        </div>
        <div>
          <ListView data={this.state.dataSource} change={this.updateState.bind(this)} />
        </div>

      </div>
    );
  }
}
class ListView extends Component {
  change(args) {
    let li = args.target.closest('li');
    //args.target.checked ? li.classList.add("strike-line") : li.classList.remove('strike-line');
    this.props.change(li.id,args.target.checked);
  }
  render() {
    return (<ul className="list-group">
      {this.props.data.map((content) => (
        <li className={content.status?"list-group-item strike-line":"list-group-item"} key={content.id.toString()} id={content.id.toString()}>
          <span className="input-group-addon" style={{ 'display': 'inline' }}>
             <input type="checkbox" checked={content.status} onChange={this.change.bind(this)} /> 
          </span>
          {content.text}
        </li>
      ))
      }
    </ul>)
  }
}

export default App;
