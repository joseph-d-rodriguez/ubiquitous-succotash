import React, { Component } from 'react';
import logo from './logo.svg';
import owLogo from './Overwatch_circle_logo.svg';
import './App.css';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class Change extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li>{this.props.change.description || this.props.change}</li>
		);
	}
}

connect(
	function mapChangeStateToProps(state, props) {
		return {
			change: props.change
		}
	}
)(Change);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.selectHero = this.selectHero.bind(this);
	}

	selectHero(event) {
		const heroId = event.target.innerText;
		console.log('selectHero: ' + heroId);
		this.props.selectHero(heroId);
	}

	hasSelectedHero() {
		return this.props.selectedHero;
	}
		
	hasChanges() {
		return this.hasSelectedHero() && this.props.selectedHero.changes && this.props.selectedHero.changes.length;
	}

	render() {
		console.log('render selectedHero: ', this.props.selectedHero);

		let liChanges = null;
		if (this.props.selectedHero && this.props.selectedHero.changes) {
			liChanges = this.props.selectedHero.changes.map((change, i) => <li key={i}>{change.description || change}</li>);
		}

		console.log('liChanges: ', liChanges);

  return (
    <div className="App">
      <header className="App-header">
        <img src={owLogo} className="App-logo" alt="logo" />
	  	<h1>Overwatch GT</h1>
	  	<label>A place to discuss better balance using <a href="https://playoverwatch.com/en-us/news/22938941/introducing-the-overwatch-workshop">The Workshop</a></label>
      </header>
	  <div className="changes">
	    <h3>Heroes: </h3>
	    { 
			Object.keys(this.props.changes).map(key => (
				<button onClick={this.selectHero} key={key}>{key}</button>
			)) 
		}
	    { 
		  this.hasSelectedHero() ?
		    (
			  <div>
		        <h4>Changes: </h4>
				{ 
				  this.hasSelectedHero() && !this.hasChanges() ? 
					(
					  <mark>
				        This hero does not have any changes currently
					  </mark>
					) : 
					null 
				}
	            <ul>
	  		      {liChanges}
	            </ul>
	          </div>
			) : <mark>Select a hero to see their changes</mark>
		  }
	  </div>
    </div>
  );
	}
}

const mapStateToProps = state => ({
	changes: state.changes,
	changesString: state.changesString,
	selectedHero: state.selectedHero
});

const mapActionsToProps = {
	selectHero: heroId => {
		return {
			type: "selectHero",
			selectedHeroId: heroId
		};
	}
};

export default connect(mapStateToProps, mapActionsToProps)(App);
