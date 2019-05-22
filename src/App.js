import React, { Component } from 'react';
import logo from './logo.svg';
import owLogo from './Overwatch_circle_logo.svg';
import './App.css';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { newChange } from './firebaser';

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

		this.state = {
			isAddingChange: false,
			newChange: ''
		};
		this.selectHero = this.selectHero.bind(this);
		this.hasSelectedHero = this.hasSelectedHero.bind(this);
		this.hasChanges = this.hasChanges.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveNewChange = this.saveNewChange.bind(this);
	}

	selectHero(event) {
		const heroId = event.target.innerText;
		//console.log('selectHero: ' + heroId);
		this.props.selectHero(heroId);
	}

	hasSelectedHero() {
		return this.props.selectedHero;
	}
		
	hasChanges() {
		return this.hasSelectedHero() && this.props.selectedHero.changes && this.props.selectedHero.changes.length;
	}

	handleChange(event) {
		this.setState({ newChange: event.target.value });
	}

	saveNewChange() {
		if (
			this.hasSelectedHero() &&
			this.state.isAddingChange && 
			this.state.newChange
		) {
			newChange(this.props.selectedHero, this.state.newChange);
		}
	}

	render() {
		//console.log('render selectedHero: ', this.props.selectedHero);

		let liChanges = null;
		if (this.props.selectedHero && this.props.selectedHero.changes) {
			liChanges = this.props.selectedHero.changes.map((change, i) => <li key={i}>{change.description || change}</li>);
		}

		//console.log('liChanges: ', liChanges);

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
				<button 
				  onClick={() => 
					this.setState({
					  isAddingChange: true
					})
				  }>
				  Add Change
				</button>
				{ 
				  this.state.isAddingChange ?
				    (
					  <span>
						<input 
						  placeholder="What needs to change?"
						  value={this.state.newChange}
						  onChange={this.handleChange} 
						/>
						<button 
						  onClick={this.saveNewChange}
						  disabled={!this.state.newChange}
						>
						  Save
					    </button>
					  </span>
					):
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
	selectHero: heroId => ({
		type: "selectHero",
		selectedHeroId: heroId
	})
};

export default connect(mapStateToProps, mapActionsToProps)(App);
