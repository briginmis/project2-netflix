from flask import Flask, session, request, redirect, render_template, Blueprint, jsonify
import pandas as pd
from os import listdir
from os.path import isfile, join
import json
# from fbprophet import Prophet
import pickle
import datetime as dt
import markdown as md
from flask_restx import Api, Resource, fields

# database setup 
# engine = create_engine("sqlite:///titanic.sqlite")



# create flask app
app = Flask(__name__,static_url_path='/static')

# create api blueprint 
blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(blueprint, doc="/doc/")
app.register_blueprint(blueprint)

# read in dataset
df_all = pd.read_csv("data/main.csv")
df_genre = pd.read_csv("data/genre.csv")
df_languages = pd.read_csv("data/languages.csv")
df_country = pd.read_csv("data/country.csv")

# -------------HTML pages routes------------- #
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/stats_country")
def stats_country():
    return render_template("stats_country.html")

@app.route("/stats_genre")
def stats_genre():
    return render_template("stats_genre.html")
# -------------HTML pages routes END------------- #

# -------------API routes------------- #
@api.route("/country/<selectedCountry>")
class Country(Resource):
    def get(self, selectedCountry):
        return df_country[df_country['Country Availability']==selectedCountry].to_dict()

@api.route("/languages/<selectedlanguages>")
class Languages(Resource):
    def get(self, selectedlanguages):
        return df_languages[df_languages['Languages']==selectedlanguages].to_dict()

@api.route("/genre/<selectedGenre>")
class Genre(Resource):
    def get(self, selectedGenre):
        return df_genre[df_genre['Genre']==selectedGenre].to_dict()

@api.route("/genreTop10/<selectedGenre>")
class Genre(Resource):
    def get(self, selectedGenre):
        df_selected = df_genre[df_genre['Genre']==selectedGenre]
        df_selected_movie = df_selected['movie_id']
        df_trim = df_all[['Boxoffice','movie_id','Title']]
        filter1 = df_trim['movie_id'].isin(df_selected_movie)
        df_show = df_trim[filter1]
        df_show = df_show.sort_values(by=['Boxoffice'], ascending=False)
        df_show = df_show.head(10)
        return df_show.to_dict()
# -------------API routes END------------- #


if __name__ == '__main__':
    app.run(debug=True)
