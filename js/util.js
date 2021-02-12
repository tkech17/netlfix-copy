function randomizeApiResponse(originalResponse, maxDup, midDup) {
	let newResponse = [].concat(originalResponse);
	let amount = Math.floor(Math.random() * (maxDup-midDup) ) + midDup; 
	for(let i = 0; i < amount; i++) {
		newResponse = newResponse.concat(originalResponse)
	}
	let shuffled = newResponse.sort( () => .5 - Math.random() );
	return newResponse;
}

export {randomizeApiResponse};
