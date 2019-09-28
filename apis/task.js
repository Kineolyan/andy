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
	const tasks = await fetch(API_URL, fetchOptions('GET'))
		.then(response => response.json());
	return _(tasks)
		.sortBy(task => task.daysToTarget)
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

const FREQUENCY_PATTERN = /^(\d+)\s*([a-z]+)$/;
function parseFrequency(frequency) {
	const match = FREQUENCY_PATTERN.exec(frequency);
	return match === null
		? null
		: {
			duration: parseInt(match[1], 10),
			unit: match[2]
		};
}

export {
	readTasks,
	executeTask,
	readCatTask,
	cleanCat,
	parseFrequency
};
