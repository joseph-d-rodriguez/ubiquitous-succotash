export default function reducer(state, { type, changes, payload, selectedHeroId }) {
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
};
