#Import dependencies

import pandas as pd

#Create function to convert list in one cell, to many rows

def explode_into_rows_in_new_table (input_df:pd.DataFrame,id_column, explode_column):

    # Create lists to store id and list of amenities
    id_list=[]
    explode_list=[]
    #iterate through each row and convert the string lists to actual lists using split function
    for index,row in input_df.iterrows():
        id_list.append(row[id_column])
        explode_list.append(row[explode_column].split(","))
    
    # Create a data frame from the id and amenities for each instance
    df2=pd.DataFrame({id_column:id_list,explode_column:explode_list})

    # Explode (split the lists into new rows)
    df2=df2.explode(explode_column)
    df2=df2.reset_index(drop=True)
    return df2
