from flask import Flask, render_template
from sqlalchemy import create_engine

# database setup 
engine_movies = create_engine("sqlite:///movie_data.sqlite")
engine_country = create_engine("sqlite:///country_data.sqlite")
engine_genre = create_engine("sqlite:///genre_data.sqlite")
engine_languages = create_engine("sqlite:///languages_data.sqlite")

# flask app setup
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("templates/index.html")

@app.route("/statsbygenre")
def names():
    return render_template("templates/stats_genre.html")

@app.route("/statsbycountry")
def names():
    return render_template("templates/stats_country.html")


if __name__ == '__main__':
    app.run(debug=True)
