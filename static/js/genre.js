// Set url for to query the earthquake data
genre_list_url = "/api/genre_list"

d3.json(genre_list_url).then(data => {
    Gen_list = data.Genre
    console.log(Gen_list)
    for (const [key, value] of Object.entries(Gen_list)) {
        console.log(value);
        var option = d3.select("#selGenre").append("option");
        option.text(value);
        option.attr("value",value);
      }
    // Gen_list.forEach((name) => {
    //   var option = d3.select("#selGenre").append("option");
    //   option.text(name);
    //   option.attr("value",name);
    // });

    // updatePlotly()
});

function genretop10(Genre){
    url = "/api/genreTop10/" + Genre

    d3.json(url).then(function(data){

        all_title = data.Title
        all_revenue = data.Boxoffice

        var Titles = Object.values(all_title)
        var Revenue = Object.values(all_revenue)
        
        var trace1 = {
            x: Titles,
            y: Revenue,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        };
        
        var data = [trace1];

        var layout = {
            title: 'Top ' + Genre + ' Shows on Netflix',
            barmode: 'group'
        };
        
        Plotly.newPlot("Top10byGenre", data, layout);
    });}

// genretop10('Romance')