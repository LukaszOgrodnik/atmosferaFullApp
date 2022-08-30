from multiprocessing.sharedctypes import Value
import numpy as np
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from atmosfera import temperature, density, pressure, sound_speed, dynamic_viscosity, kinematic_viscosity, to_meters


class MyForm(BaseModel):
    height: np.float64
    #units: list = [{ "type": "height", "unit": str },
    #{ "type": "pressure", "unit": str },
    #{ "type": "temperature", "unit": str },
    #{ 'type': "density", "unit": str },
    #{ "type": "sound_speed", "unit": str },
    #{ 'type': "kinematic_viscosity", 'unit': str },
    #{ "type": "dynamic_viscosity", "unit": str }]


class UnitForm(BaseModel):
    unit_type: str
    unit_value: str


app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=origins,
                   allow_headers=origins)
atmosphere_data = {
    "height": {
        "value": 0,
        "unit": "m"
    },
    "temerature": {
        "value": temperature(0),
        "unit": "K"
    },
    "pressure": {
        "value": pressure(0),
        "unit": "Pa"
    },
    "sound_speed": {
        "value": sound_speed(0),
        "unit": "m/s"
    },
    "dynamic_viscosity": {
        "value": dynamic_viscosity(0),
        "unit": "Pa*s"
    },
    "kinematic_viscosity": {
        "value": kinematic_viscosity(0),
        "unit": "m^2/s"
    },
}


#Trying other ways of sending units
@app.put('/change-unit/{atmosphere_data_type}')
async def update_unit(atmosphere_data_type: str, unit_value: str):
    atmosphere_data[atmosphere_data_type]["unit"] = unit_value
    return atmosphere_data[atmosphere_data_type]

@app.put("/edit_values")
async def update_values(height:np.float64):
    atmosphere_data['height']['value'] = height
    height_m = to_meters(atmosphere_data['height']['value'],atmosphere_data['height']['unit'])
    atmosphere_data['temperature']['value'] = temperature(height_m)
    atmosphere_data['density']['value'] =density(height_m)
    atmosphere_data['pressure']['value'] =pressure(height_m)
    atmosphere_data['sound_speed']['value'] = sound_speed(height_m)
    atmosphere_data['dynamic_viscosity']['value'] = dynamic_viscosity(height_m)
    atmosphere_data['kinematic_viscosity']['value'] = kinematic_viscosity(height_m)
    return atmosphere_data

    
@app.get("/{atmosphere_data_type}")
def index(atmosphere_data_type: str):
    return atmosphere_data[atmosphere_data_type]


#This function gets height/data from backend, and calculates height in meteres
#TO DO: height needs a key
@app.post('/calc')
async def calculate_data(object: MyForm):
    global height_sent
    height_sent = to_meters(object.height)
    


#This function sends back atmosphere props to FrontEnd
#TO DO: All of the function calls should have a key unit
@app.get('/sent')
def send_data():
    return ({
        'temperature': temperature(height_sent),
        'density': density(height_sent),
        'pressure': pressure(height_sent),
        'sound_speed': sound_speed(height_sent),
        'dynamic_viscosity': dynamic_viscosity(height_sent),
        'kinematic_viscosity': kinematic_viscosity(height_sent)
    })
