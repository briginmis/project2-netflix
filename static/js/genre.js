// Create selector for Top10 Genre
genre_list_url = "/api/genre_list"

d3.json(genre_list_url).then(data => {
    Gen_list = data.genre

    Gen_list.forEach((name)=>{
        console.log(name.genre)
        var option = d3.select("#selGenre").append("option");
        option.text(name.genre);
        option.attr("value",name.genre);
    });
});

// Create function for plotting Top10
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

genretop10('Romance')
