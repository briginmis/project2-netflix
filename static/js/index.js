
// Set url for to query the earthquake data

url = "/api/genre/Comedy"

d3.json(url).then(function(data){
    console.log(data.movie_id)
});