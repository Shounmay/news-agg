let preferenceList = [];

const getPreferences = async () => {
	const newsSources = await fetch(
		`https://newsapi.org/v2/top-headlines/sources?apiKey=bc94d98d2b3c449f89a9236932fdfbe4`,
		{ method: 'GET' }
	);
	const responseSources = await newsSources.json();
	// console.log(Object.keys(responseSources));
	preferenceList = responseSources.sources.map((source) => {
		return source.name;
	});
	// console.log(preferenceList);
	return preferenceList;
};

const newsList = getPreferences();

module.exports = newsList;
