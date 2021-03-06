from flask import Flask, session, request, redirect, render_template, Blueprint, jsonify
import pandas as pd
from os import listdir
from os.path import isfile, join
import json
import pickle
import numpy as np
import datetime as dt
import markdown as md
from flask_restx import Api, Resource, fields

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/movie_data.sqlite")


#################################################
# Flask Setup
#################################################
# create flask app
app = Flask(__name__,static_url_path='/static')

# create api blueprint 
blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(blueprint, doc="/doc/")
app.register_blueprint(blueprint)

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
@api.route("/main")
class Movie_count(Resource):
    def get(self):
        df_all = pd.read_sql('select*from movies_data',engine)
        df_netflix_release_date = df_all['Netflix Release Date']
        df_movie_count = df_netflix_release_date.str[:4].value_counts()
        
        return df_movie_count.to_dict()

@api.route("/countries")
class countries(Resource):
    def get(self):
        results = [
            {
                "id": list(row)[0],
                "movie_id": list(row)[1],
                "country":list(row)[2],

            }for row in engine.execute('select*from country_data').all()]
        return {"countries":results}


@api.route("/genre_list")
class genre_list(Resource):
    def get(self):
        results = [
            {
                "id": list(row)[0],
                "genre": list(row)[1],
            }for row in engine.execute('select*from genre_list_data').all()]
        return {"genre":results}

@api.route("/genreTop10/<selectedGenre>")
class Genre(Resource):
    def get(self, selectedGenre):
        df_genre = pd.read_sql('select*from genre_data',engine)
        df_all = pd.read_sql('select*from movies_data',engine)
        df_selected = df_genre[df_genre['Genre']==selectedGenre]
        df_selected_movie = df_selected['movie_id']
        df_trim = df_all[['Boxoffice','movie_id','Title']]
        filter1 = df_trim['movie_id'].isin(df_selected_movie)
        df_show = df_trim[filter1]
        df_show = df_show.sort_values(by=['Boxoffice'], ascending=False)
        df_show = df_show.head(10)
        return df_show.to_dict()

@api.route("/genremovies")
class GenreMovies(Resource):
    def get(self):
        genre_df = pd.read_sql('select * from genre_data', engine)
        grouped_df = genre_df.groupby('Genre').count()
        return grouped_df.to_dict()


@api.route("/language_list")
class languages_list(Resource):
    def get(self):
        results = [
            {
                "id": list(row)[0],
                "language": list(row)[1],
            }for row in engine.execute('select*from languages_list_data').all()]
        return {"language":results}

@api.route("/genrelanguage/<selectedLanguage>")
class GenreLanguage(Resource):
    def get(self, selectedLanguage):
        genre_df = pd.read_sql('select * from genre_data', engine)
        languages_df = pd.read_sql('select * from languages_data', engine)
        merge_df = pd.merge(genre_df, languages_df, on = "movie_id")
        selected_language_df = merge_df[merge_df['Languages'] == selectedLanguage]
        grouped_df = selected_language_df.groupby('Genre').count()
        return grouped_df.to_dict()
# -------------API routes END------------- #


if __name__ == '__main__':
    app.run(debug=True)
