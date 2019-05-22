export default function reducer(state, { type, changes, payload, selectedHeroId, hero, change }) {
	let newState = { changes: state.changes };
	if (changes) {
		newState.changes = changes;
		newState.changesString = JSON.stringify(newState.changes);
	} else if (type === "selectHero" && selectedHeroId) {
		newState.selectedHero = newState.changes[selectedHeroId];
	} else if (type === "newChange" ) {
		
	} else {
		return state;
	}

	return newState;
};
