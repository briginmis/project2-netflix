
// Set url for to query the netflix data

url = "/api/main"

d3.json(url).then(function(data){
 
console.log(data)
    // all_movies = data.movie_id
    // all_date = data.ReleaseDate

    var Year = Object.keys(data)
    var movie_count = Object.values(data)
    
    var trace1 = {
        x: Year,
        y: movie_count,
        type: "line"
        // transforms: [{
        //     type: 'sort',
        //     target: 'y',
        //     order: 'descending'
        // }]
    };
    
    var data = [trace1];

    var layout = {
        title: 'Count of movie released every year',
        // barmode: 'group'
        xaxis: { title: "Year" },
        yaxis: { title: "Movie count" }
    };
    
    Plotly.newPlot("MovieCountPeryear", data, layout);
});


