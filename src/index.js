import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as firebase from 'firebase/app';
import 'firebase/firestore';


// Request permission to react-ow-gt, 
// Then download config json object to src/firebase-config.json
import firebaseConfig from './firebase-config.json'; 

var fireApp = firebase.initializeApp(firebaseConfig);


function parseFirestoreHeroDoc(firebaseHeroDoc) {
	let hero = { id: firebaseHeroDoc.id },
		doc = firebaseHeroDoc.data();

	hero.changes = doc.changes;
	return hero;
}

function reducer(state, { type, changes, payload, selectedHeroId }) {
	let newState = { changes: state.changes };
	if (changes) {
		newState.changes = changes;
		newState.changesString = JSON.stringify(newState.changes);
		console.log('reducer has changes: ', newState.changesString.substring(0, 30) + '...');

	} else if (type === "selectHero" && selectedHeroId) {
		newState.selectedHero = newState.changes[selectedHeroId];
	} else {
		return state;
	}

	return newState;
}

const store = createStore(
	reducer,
	{
		changes: {}
	}
);

console.log('hello state: ', store.getState());


// listen to firestore collection
var db = firebase.firestore(),
	heroesRef = db.collection('heroes');

heroesRef.onSnapshot(snapshot => {
	snapshot.docChanges().forEach(change => {
		let state = store.getState(),
			changes = state.changes,
			hero = parseFirestoreHeroDoc(change.doc);
		switch (change.type) {
			case "added":
			case "modified":
				changes[hero.id] = hero;
				
				break;
			case "deleted":
				// taking a guess at firestore delete conventions...
				delete changes[hero.id];
				break;
		}
		console.log(`Firestore ${change.type} ${change.doc.id}.`);
		store.dispatch({
			type: `firebase:${change.type}`,
			changes
		});

		// If changes are for our selected hero, then we need to make sure to capture the changes in the DOM object
		const selectedHeroId = state.selectedHero ? state.selectedHero.id : null;
		if (selectedHeroId == hero.id) {
			store.dispatch({
				type: 'selectHero',
				selectedHeroId
			});
		}
	});
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
