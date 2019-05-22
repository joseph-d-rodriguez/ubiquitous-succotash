import { createStore } from 'redux';
import reducer from './reducer';

export function createOwGtStore() {
	return createStore(
		reducer,
		{
			changes: {}
		}
	);
};
