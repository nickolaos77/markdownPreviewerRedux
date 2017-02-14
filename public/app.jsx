import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import ReactRedux from 'react-redux';
//redux
const textChanged = (newText) => {
	return {
		type : 'TEXT_CHANGE',
		newText
	}
};

const reducer = (state = 'Heading Redux\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*', action) => {
	switch (action.type) {
		case 'TEXT_CHANGE':
			return action.newText;
		default:
			return state;
	}
};
const store = createStore(reducer);

//react
class App extends React.Component{
  constructor(props) {
   super(props);
 this.handleChange = this.handleChange.bind(this);
 this.rawMarkUp = this.rawMarkUp.bind(this);
 }
handleChange (event) {
       this.props.submitNewText(event.target.value);
      console.log(event.target.value);
		}
rawMarkUp(value){
      var rawMarkup = marked(value, {sanitize: true});
      return { __html: rawMarkup };
      }

 render() {
   return (
     <div className = 'row'>
        <div className = 'col-xs-12 col-sm-6' style={{marginTop: 60}}>
            <textarea onChange={ this.handleChange } rows="24" cols="50" >{this.props.text}
            </textarea>
        </div>
        <div className = 'col-xs-12 col-sm-6'>
            <span dangerouslySetInnerHTML={this.rawMarkUp(this.props.text)}></span>
        </div>
    </div>
   );
 }
};
const mapStateToProps = (state)=>{
	return {text:state}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		submitNewText: (text)=>{
			dispatch(textChanged(text))
		}
	}
}
const Container = connect(mapStateToProps, mapDispatchToProps)(App);
class AppWrapper extends React.Component {
	// render the Provider here
  render (){
    return(
<Provider store={store}>
 <Container/>
</Provider>
      )
  }
	// change code above this line
};

ReactDOM.render(<AppWrapper/>, document.getElementById('app'));
