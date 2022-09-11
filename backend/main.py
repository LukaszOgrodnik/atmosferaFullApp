from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from atmosfera import temperature, density, pressure, sound_speed, dynamic_viscosity, kinematic_viscosity, pressure_height , density_height,temperature_pressure_height
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
    density_height:Optional[str]
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

class HeightCalculations2(BaseModel):
    pressure: float
    temperature: Optional [float]
    units: Units

#This function gets height/data from backend, and calculates height in meteres
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

# @app.post('/height')
# async def calculate_height(object: HeightCalculations):
#     print(object)
#     if object.type == 'pressure':
#         return{
#             'pressure_height': pressure_height(object.value, object.units.pressure, object.units.pressure_height)
#         }
#     if object.type == 'density':
#         return{
#             'density_height': density_height(object.value, object.units.density, object.units.density_height)
#         }
#     if object.type == 'temperture_pressure':
#         return{
#             'temperture_pressure' : temperature_pressure_height()
#         }

@app.post('/height')
async def calclate_height_2(object: HeightCalculations2):
    pressure_height_value = pressure_height(object.pressure, object.units.pressure, object.units.pressure_height)
    temperature_value = temperature(pressure_height_value,object.units.pressure_height ,object.units.temperature)
    return_message = {'pressure_height':pressure_height_value, 'temperature' : temperature_value}
    if object.temperature != None:
        density_height_value = temperature_pressure_height(object.temperature, object.pressure, object.units.temperature, object.units.pressure, object.units.density_height)
        return_message.update({'density_height': density_height_value})
    return return_message