from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from atmosfera import temperature, density, pressure, sound_speed, dynamic_viscosity, kinematic_viscosity, pressure_height
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000","http://127.0.0.1:3000/height", "http://localhost:3000/height"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Units(BaseModel):
    height: Optional [str]
    pressure_height: Optional[str]
    pressure: Optional [str]
    density: Optional [str]
    temperature: Optional [str]
    sound_speed: Optional [str]
    kinematic_viscosity: Optional [str]
    dynamic_viscosity: Optional [str]


class MyForm(BaseModel):
    height: float
    unitState: Units

class HeightCalculations(BaseModel):
    type: str
    value: float
    units: Units


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

@app.post('/height')
async def calculate_height(object: HeightCalculations):
    print(object)
    if object.type == 'pressure':
        return{
            'pressure_height': pressure_height(object.value, object.units.pressure, object.units.pressure_height)
        }