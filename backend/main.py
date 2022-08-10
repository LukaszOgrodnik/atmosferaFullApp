import time
import numpy as np
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from atmosfera import temperature, density, pressure, sound_speed, dynamic_viscosity, kinematic_viscosity


class MyForm(BaseModel):
    height: np.float64


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/')
def get_current_time():
    return({"time": time.time()})

@app.post('/calc')
async def calculate_data(object:MyForm):
    global height_sent 
    height_sent = object.height
    
   
@app.get('/sent')
def send_data():
    return(
        {
            'temperature': temperature(height_sent), 
            'density' : density(height_sent),
            'pressure' : pressure(height_sent),
            'sound_speed' : sound_speed(height_sent),
            'dynamic_viscosity':dynamic_viscosity(height_sent),
            'kinematic_viscosity':kinematic_viscosity(height_sent)
        }
    )