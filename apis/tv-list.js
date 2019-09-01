// @ts-check
import _ from 'lodash';

const API_URL = 'https://6hvkj4u44j.execute-api.eu-west-3.amazonaws.com/prod';
let serverState = [
	{
		name: 'Lucifer',
		episodeIdx: 4,
		lastEpisodeIdx: 21,
		id: 0,
		timestamp: 2
	},
	{
		name: 'Stranger Things',
		episodeIdx: 4,
		lastEpisodeIdx: 8,
		id: 1,
		timestamp: 1
	}
];
const fakeFetch = () => Promise.resolve(serverState);

async function readSeries() {
	const series = await fetch(
		`${API_URL}/series`,
		{
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {},
			redirect: 'follow',
			referrer: 'no-referrer',
		})
		.then(response => response.json());
	return _(series)
		.sortBy(serie => serie.timestamp)
		.value();
}

async function recordWatchedEpisode(watchedSerie) {
	const response = await fetch(
		`${API_URL}/series/${watchedSerie.id}/episode?secret=username`,
		{
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			body: JSON.stringify(watchedSerie.episodeIdx),
		});
	return undefined;
}

module.exports = {
	readSeries,
	recordWatchedEpisode
};
