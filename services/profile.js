
import { AsyncStorage } from 'react-native';

const profileKey = "userProfile";
const defaultProfile = "colombe";
let state = {
	version: 1
};

let listenerId = 0;
const listeners = new Map();

const get = () => state.id ? {...state} : undefined;

const set = (id) => {
	state.id = id;
	AsyncStorage.setItem(profileKey, JSON.stringify(state));

	// Notification loop
	const visibleState = get();
	listeners.forEach(cbk => cbk(visibleState));
};

const init = async () => {
	const keys = await AsyncStorage.getAllKeys();

	if (!state.id) {
		const data = await AsyncStorage.getItem(profileKey);
    if (!data) {
			await AsyncStorage.setItem(
				profileKey,
				JSON.stringify({...state, id: defaultProfile}));
			state.id = defaultProfile;
			// Merge it with empty state
			state = JSON.parse(data);
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
	init,
	initHook,
	set,
};
