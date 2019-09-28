// @ts-check
import _ from 'lodash';

const API_URL = 'https://6hvkj4u44j.execute-api.eu-west-3.amazonaws.com/prod/tasks';

function fetchOptions(method) {
	return {
		method,
		mode: 'cors',
		cache: 'no-cache',
		headers: {},
		redirect: 'follow',
		referrer: 'no-referrer',
	};
}

async function readTasks() {
	const series = await fetch(API_URL, fetchOptions('GET'))
		.then(response => response.json());
	return _(series)
		.sortBy(serie => serie.timestamp)
		.value();
}

function executeTask(task) {
	return fetch(
		`${API_URL}/${task.id}/execution?jarvis=please`,
		fetchOptions('PUT'));
}

function readCatTask() {
	return fetch(`${API_URL}/cat`, fetchOptions('GET'))
		.then(response => response.json());
}

function cleanCat() {
	return executeTask({id: 'cat'});
}

export {
	readTasks,
	executeTask,
	readCatTask,
	cleanCat
};
