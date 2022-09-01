import numpy as np
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from atmosfera import temperature, density, pressure, sound_speed, dynamic_viscosity, kinematic_viscosity, to_meters


class Units(BaseModel):
    height: str
    pressure: str
    density: str
    temperature: str
    sound_speed: str
    kinematic_viscosity: str
    dynamic_viscosity: str


class MyForm(BaseModel):
    height: np.float64
    unitState: Units


app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=origins,
                   allow_headers=origins)

# atmosphere_data = {
#     "height": {
#         "value": 0,
#         "unit": "m"
#     },
#     "temerature": {
#         "value": temperature(0),
#         "unit": "K"
#     },
#     "pressure": {
#         "value": pressure(0),
#         "unit": "Pa"
#     },
#     "sound_speed": {
#         "value": sound_speed(0),
#         "unit": "m/s"
#     },
#     "dynamic_viscosity": {
#         "value": dynamic_viscosity(0),
#         "unit": "Pa*s"
#     },
#     "kinematic_viscosity": {
#         "value": kinematic_viscosity(0),
#         "unit": "m^2/s"
#     },
# }
height_sent= 0 
calc_units = {}

#This function gets height/data from backend, and calculates height in meteres
#TO DO: height needs a key
@app.post('/calc')
async def calculate_data(object: MyForm):
    height_sent= to_meters(object.height, object.unitState.height)
    calc_units = object.unitState.dict()
    return {'message' : 'Data sent succesfully', 'height' : height_sent, 'units' : calc_units}


#This function sends back atmosphere props to FrontEnd
#TO DO: All of the function calls should have a key unit
@app.get('/sent')
async def send_data():
    return ({
        'temperature':
        temperature(height_sent, calc_units["temperature"]),
        'density':
        density(height_sent, calc_units["density"]),
        'pressure':
        pressure(height_sent, calc_units["pressure"]),
        'sound_speed':
        sound_speed(height_sent, calc_units["sound_speed"]),
        'dynamic_viscosity':
        dynamic_viscosity(height_sent, calc_units["dynamic_viscosity"]),
        'kinematic_viscosity':
        kinematic_viscosity(height_sent, calc_units["kinematic_viscosity"])
    })
