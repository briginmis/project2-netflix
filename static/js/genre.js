function init() {

    // Load language chart 1

    url = "/api/genrelanguage/Aboriginal";

    d3.json(url).then(function(data){

        var genres = Object.keys(data.Languages)
        var movies = Object.values(data.Languages)
        
        var trace1 = {
            x: genres,
            y: movies,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        };
        
        var data = [trace1];

        var layout = {
            title: 'Number of movies by genre in Aboriginal',
            barmode: 'group',
            xaxis: {
                title: 'Genres'
            },
            yaxis: {
                title: 'Number of movies'
            }
        };
        
        Plotly.newPlot("GenreFilterLanguage", data, layout);

    });

    // Load language chart 2

    url = "/api/genrelanguage/Aboriginal";

    d3.json(url).then(function(data){

        var genres = Object.keys(data.Languages)
        var movies = Object.values(data.Languages)
        
        var trace1 = {
            x: genres,
            y: movies,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        };
        
        var data = [trace1];

        var layout = {
            title: 'Number of movies by genre in Aboriginal',
            barmode: 'group',
            xaxis: {
                title: 'Genres'
            },
            yaxis: {
                title: 'Number of movies'
            }
        };
        
        Plotly.newPlot("GenreFilterLanguage2", data, layout);

    });

    // Load top 10 movies chart

    url = "/api/genreTop10/Action"

    d3.json(url).then(function(data){

        all_title = data.Title
        all_revenue = data.Boxoffice

        var Titles = Object.values(all_title)
        var Revenue = Object.values(all_revenue)
        
        var trace1 = {
            x: Revenue,
            y: Titles,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }],
            orientation: "h",
            text: Titles,
            marker: {
                color: 'rgb(158,202,225)',
                line: {
                  color: 'rgb(8,48,107)',
                  width: 1.5
                }
            }
        };
        
        var data = [trace1];

        var layout = {
            title: 'Top Drama Movies on Netflix',
            barmode: 'group',
            yaxis: {
                visible: false
            },
            xaxis: {
                title: 'Box Office Revenue ($)'
            }
        };
        
        Plotly.newPlot("Top10byGenre", data, layout);
    });

    // Load number of movies by genre pie chart

    url = "/api/genremovies"

    d3.json(url).then(function(data){

        console.log

        var Genres = Object.keys(data.movie_id)
        var Movies = Object.values(data.movie_id)
        
        var trace1 = {
            labels: Genres,
            values: Movies,
            type: "pie"
        };
        
        var data = [trace1];

        var layout = {
            title: 'Number of movies by Genre'
        };
        
        Plotly.newPlot("GenrePieChart", data, layout);
    });

};

// Create selector for Top10 Genre
genre_list_url = "/api/genre_list"

d3.json(genre_list_url).then(data => {
    Gen_list = data.genre

    Gen_list.forEach((name)=>{
        // console.log(name.genre)
        var option = d3.select("#selGenre").append("option");
        option.text(name.genre);
        option.attr("value",name.genre);
    });
});

// Create function for plotting Top10
function updategenretop10(){

    var dropdownMenu = d3.select("#selGenre");

    var Genre = dropdownMenu.property("value");

    url = "/api/genreTop10/" + Genre

    d3.json(url).then(function(data){

        all_title = data.Title
        all_revenue = data.Boxoffice

        var Titles = Object.values(all_title)
        var Revenue = Object.values(all_revenue)
        
        var trace1 = {
            x: Revenue,
            y: Titles,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }],
            orientation: "h",
            text: Titles,
            marker: {
                color: 'rgb(158,202,225)',
                line: {
                  color: 'rgb(8,48,107)',
                  width: 1.5
                }
            }
        };
        
        var data = [trace1];

        var layout = {
            title: 'Top ' + Genre + ' Movies on Netflix',
            barmode: 'group',
            yaxis: {
                visible: false
            },
            xaxis: {
                title: 'Box Office Revenue ($)'
            }
        };
        
        Plotly.newPlot("Top10byGenre", data, layout);
    });}


// Create selector for Language graph
language_list_url = "/api/language_list"

d3.json(language_list_url).then(lan => {
    Lan_list = lan.language;

    Lan_list.forEach((lang)=>{
        var option = d3.select("#selLanguage").append("option");
        option.text(lang.language);
        option.attr("value",lang.language);
    });
});

// Create selector for Language graph 2
language_list_url = "/api/language_list"

d3.json(language_list_url).then(lan => {
    Lan_list = lan.language;

    Lan_list.forEach((lang)=>{
        var option = d3.select("#selLanguage2").append("option");
        option.text(lang.language);
        option.attr("value",lang.language);
    });
});

// Create function for plotting Genre chart by Language
function updateLanguages(){

    var dropdownMenu = d3.select("#selLanguage");

    var Language = dropdownMenu.property("value");

    url = "/api/genrelanguage/" + Language;

    d3.json(url).then(function(data){

        console.log(data.Languages);


        var genres = Object.keys(data.Languages)
        var movies = Object.values(data.Languages)

        console.log(genres);
        console.log(movies);
        
        var trace1 = {
            x: genres,
            y: movies,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        };
        
        var data = [trace1];

        var layout = {
            title: 'Number of movies by genre in ' + Language,
            barmode: 'group',
            xaxis: {
                title: 'Genres'
            },
            yaxis: {
                title: 'Number of movies'
            }
        };
        
        Plotly.newPlot("GenreFilterLanguage", data, layout);
    });
}

// Create function for plotting Genre chart by Language
function updateLanguages2(){

    var dropdownMenu = d3.select("#selLanguage2");

    var Language = dropdownMenu.property("value");

    url = "/api/genrelanguage/" + Language;

    d3.json(url).then(function(data){

        var genres = Object.keys(data.Languages)
        var movies = Object.values(data.Languages)

        console.log(genres);
        console.log(movies);
        
        var trace1 = {
            x: genres,
            y: movies,
            type: "bar",
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        };
        
        var data = [trace1];

        var layout = {
            title: 'Number of movies by genre in ' + Language,
            barmode: 'group',
            xaxis: {
                title: 'Genres'
            },
            yaxis: {
                title: 'Number of movies'
            }
        };
        
        Plotly.newPlot("GenreFilterLanguage2", data, layout);
    });
}

// Call functions when a change takes place to the DOM
d3.selectAll("#selGenre").on("change", updategenretop10);
d3.selectAll("#selLanguage").on("change", updateLanguages);
d3.selectAll("#selLanguage2").on("change", updateLanguages2);

// Plot initial charts
init();