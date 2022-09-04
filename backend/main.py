import numpy as np
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from atmosfera import temperature, density, pressure, sound_speed, dynamic_viscosity, kinematic_viscosity
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Units(BaseModel):
    height: str
    pressure: str
    density: str
    temperature: str
    sound_speed: str
    kinematic_viscosity: str
    dynamic_viscosity: str


class MyForm(BaseModel):
    height: float
    unitState: Units


#This function gets height/data from backend, and calculates height in meteres
#TO DO: height needs a key
@app.post('/calc')
async def calculate_data(object: MyForm):
    height_sent= object.height
    print(object)
    calc_units = object.unitState
    return {
            'temperature': temperature(height_sent, calc_units.height, calc_units.temperature),
            'density': density(height_sent, calc_units.height, calc_units.density),
            'pressure': pressure(height_sent, calc_units.height, calc_units.pressure),
            'sound_speed': sound_speed(height_sent, calc_units.height, calc_units.sound_speed),
            'dynamic_viscosity': dynamic_viscosity(height_sent, calc_units.height, calc_units.dynamic_viscosity),
            'kinematic_viscosity': kinematic_viscosity(height_sent, calc_units.height, calc_units.kinematic_viscosity)
        }