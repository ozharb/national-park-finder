'use strict';

const apiKey = "Q6tJQnL5ETYedch00GreSPqMyzAT3oTgmiZs8BxK";

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.data.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson.data[i].url} target= "_blank">${responseJson.data[i].fullName} </a></h3>
        <img src=${responseJson.data[i].images[0].url} width="300">
      <p>${responseJson.data[i].description}</p>
      <p>Directions: <a href= "${responseJson.data[i].directionsUrl}" target= "_blank">${responseJson.data[i].directionsUrl}</a></p>
    
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(searchTerm, maxResults=10) {
  const params = {
    stateCode: searchTerm,
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);



  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    console.log('clicked')
    const searchTerm = $('#js-search-term').val();
    console.log(searchTerm)
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);