
import { AsyncStorage } from 'react-native';

const profileKey = "userProfile";
const defaultProfile = "colombe";
const initialState = {
	version: 1
};
let state = {...initialState};

let listenerId = 0;
const listeners = new Map();

const get = () => state.id ? {...state} : undefined;

const notifyListeners = state => {
	listeners.forEach(cbk => cbk(state));
};

const set = (id) => {
	state.id = id;
	AsyncStorage.setItem(profileKey, JSON.stringify(state));

	notifyListeners(get());
};

const clear = () => {
	state = {...initialState};
	AsyncStorage.setItem(profileKey, JSON.stringify(state));
	notifyListeners(get());
};

const init = async () => {
	if (!state.id) {
		const data = await AsyncStorage.getItem(profileKey);
    if (data) {
			// Merge it with empty state
			state = JSON.parse(data);
		}
		if (!state.id) {
			const initializedState = {...state, id: defaultProfile}
			await AsyncStorage.setItem(
				profileKey,
				JSON.stringify(initializedState));
			state = initializedState;
		}
		return get();
	} else {
		return get();
	}
};

const initHook = (cbk) => {
	const id = ++listenerId;
	listeners.set(id, cbk);

	init().then(
		cbk,
		_e => cbk(null));

	return () => listeners.delete(id);
};

export default get;
export {
	clear,
	init,
	initHook,
	set,
};
