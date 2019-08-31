// @ts-check
import _ from 'lodash';

// const SHEET_ID = '1RtpgoMpHfqunNL92-0gVN2dA3OKZTpRikcUQz6uAxX8';
// const FIRST_ROW = 3;
// const RANGES  = `Notes!H${FIRST_ROW}:K${FIRST_ROW + 100}`;

// function formatSeries(data) {
// 	console.log('Data', data);
// 	return [1];
// }
// function readSeries(api) {
// 	return new Promise((resolve, reject) => {
// 		api.spreadsheets.values.get(
// 			{
// 				spreadsheetId: SHEET_ID,
// 				RANGES,
// 			},
// 			(err, res) => {
// 				if (err) {
// 					console.error('The API returned an error: ' + err);
// 					reject(err);
// 				} else {
// 					const rows = res.data.values;
// 					const result = formatSeries(rows);
// 					resolve(result);
// 				}
// 			});
// 	});
// }

// function recordWatchedEpisode(api, serie) {
// 	const range = `Notes!J${serie.row}:J${serie.row}`;
// 	const values = [serie.episodeIdx + 1];
// 	const payload = {
// 		spreadsheetId: SHEET_ID,
// 		range,
// 		valueInputOption: 'RAW',
// 		resource: {
// 			"range": range,
// 			"values": [values]
// 		}
// 	};
// 	return new Promise((resolve, reject) => {
// 		api.spreadsheets.values.update(
// 			payload,
// 			(err) => {
// 				if (err) {
// 					console.error('Cannot write data ' + err);
// 					reject(err);
// 				} else {
// 					console.log('Write successful!');
// 					resolve();
// 				}
// 			});
// 	});
// }

// const api = [readSeries, recordWatchedEpisode].reduce(
// 	(result, f) => {
// 		result[f.name] = withApi(f);
// 		return result;
// 	},
// 	{});

let serverState = [
	{
		name: 'Lucifer',
		episodeIdx: 4,
		lastEpisodeIdx: 21,
		row: 3,
		timestamp: 2
	},
	{
		name: 'Stranger Things',
		episodeIdx: 4,
		lastEpisodeIdx: 8,
		row: 4,
		timestamp: 1
	}
];
const fakeFetch = () => Promise.resolve(serverState);

async function readSeries() {
	const series = await fakeFetch();
	return _(series)
		.sortBy(serie => serie.timestamp)
		.value();
}

function recordWatchedEpisode(watchedSerie) {
	const serieState = serverState.find(serie => serie.row === watchedSerie.row);
	serieState.episodeIdx = watchedSerie.episodeIdx + 1;

	return Promise.resolve();
}

module.exports = {
	readSeries,
	recordWatchedEpisode
};