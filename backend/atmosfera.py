import numpy as np

def to_si(value, type, unit):
    scale = {
        'height': {"m": 1,"ft": 1 / 3.2808,"km": 1000},
        'pressure': {"Pa": 1,"hPa": 100,"MPa": 1000000,"psi": 6.894757 * 1000,"atm": 101325,"bar": 100000},
        'density': {"kg/m^3": 1,"g/cm^3": 1000,"sl/ft^3": 515.3788184,"lb/ft^3": 16.018463},
        'temperature':{"K":1.0 , "C":1.0 , "Fa" :5.0/9.0, "R":5.0/9.0}
    }
    if type =='temperature':
        temperature_scale_additor ={"K":0, "C":+273.15 , "Fa" :+459.67 , "R":0}
        addition_factor_value = temperature_scale_additor [unit] 
    else:
        addition_factor_value=0
    type_chosen = scale[type]
    multiplication_factor_value = type_chosen[unit]
    return value * multiplication_factor_value+addition_factor_value


def from_si(value, type, unit):
    scale_multiplcator = {
        'height': {"m": 1, "ft": 3.2808,"km": 1 / 1000},
        'pressure': {"Pa": 1,"hPa": 1 / 100,"MPa": 1 / 1000000,"psi": 1 / (6.894757 * 1000),"atm": 1 / 101325,"bar": 1 / 100000},
        'density': {"kg/m^3": 1,"g/cm^3": 1 / 1000,"sl/ft^3": 1 / 515.3788184,"lb/ft^3": 1 / 16.018463},
        'temperature':{"K":1.0 , "C":1.0 , "Fa" :9.0/5.0, "R":9.0/5.0},
        'sound_speed':{"m/s":1,"km/h":1/3.6,"mph":1/0.44704 ,"kts":1/0.514},
        'kinematic_viscosity':{"m^2/s":1, "S":10000 ,"ft^2/s":1/0.09290304},
        'dynamic_viscosity': {"Pa*s":1, "P":10}
    }
    if type =='temperature':
        temperature_scale_additor = {"K":0, "C":-273.15 , "Fa" :- 459.67 , "R":0}
        addition_factor_value = temperature_scale_additor [unit]
    else:
        addition_factor_value=0
    type_chosen = scale_multiplcator[type]
    multiplication_factor_value = type_chosen[unit]
    return value * multiplication_factor_value+addition_factor_value

def pressure_height(pressure,pressure_unit = 'Pa', height_unit = 'm'):
    pressure = to_si(pressure,'pressure', pressure_unit)
    height = 44330*(1-(pressure/101325)**(1/5.256))
    if height < 11000.0:
        return from_si(height,'height',height_unit)
    else:
        height = 11000 - 6340* np.log(pressure/22632)
        return from_si(height,'height',height_unit)

def density_height(density,density_unit = 'Pa', height_unit = 'm'):
    density = to_si(density,'density', density_unit)
    height = 44330*(1-(density/1.255)**(1/4.256))
    if height < 11000.0:
        return from_si(height,'height',height_unit)
    else:
        height = 11000 - 6340* np.log(pressure/0.3639)
        return from_si(height,'height',height_unit)

def temperature(height, height_unit = "m", temperature_unit = "K", ):
    height = to_si(height,'height',height_unit)
    if height < 11000.0:
        temperature= 288.15 - height / 1000 * 6.5
        return from_si(temperature,'temperature',temperature_unit)
    else:
        temperature = 216.5
        return from_si(temperature,'temperature',temperature_unit)

def density(height,height_unit = "m", density_unit= "kg/m^3",):
    height = to_si(height,'height',height_unit)
    scale={"kg/m^3":1,"g/cm^3":1/1000,"sl/ft^3": 1/515.3788184 , "lb/ft^3" : 1/16.018463}
    if height < 11000.0:
        density = 1.255 * (1 - height/ 44330) ** 4.256
        return from_si(density,'density', density_unit)
    else:
        return (0.3639 * np.exp(-(height- 11000) / 6340))*scale[unit]

def pressure(height, height_unit = "m", pressure_unit = "Pa"):
    height = to_si(height,'height',height_unit)
    if height < 11000.0:
        pressure = 101325 * (1 - height / 44300) ** 5.256 
        return from_si(pressure,"pressure", pressure_unit)
    else:
        pressure = 22632 * np.exp(-(height- 11000) / 6340)
        return from_si(pressure,"pressure", pressure_unit)

def sound_speed(height, height_unit = "m", sound_speed_unit = "m/s"):
    height = to_si(height,'height',height_unit)
    sound_speed= 340.3 * np.sqrt(temperature(height) / 288.15)
    return from_si(sound_speed,'sound_speed',sound_speed_unit)

def kinematic_viscosity(height, height_unit = "m", kinematic_viscosity_unit = "m^2/s"):
    height = to_si(height,'height',height_unit)
    kinematic_viscosity =1.458 * 10 ** (-6) * temperature(height) ** 1.5 / (temperature(height) + 100.4)
    return from_si(kinematic_viscosity,'kinematic_viscosity',kinematic_viscosity_unit)

def dynamic_viscosity(height, height_unit = "m",dynamic_viscosity_unit ="Pa*s"):
    height = to_si(height,'height',height_unit)
    dynamic_viscosity = 1.40607 * 10 ** (-5) * 101325 / pressure(height) * (temperature(height) / 288.15) ** 1.754
    return from_si(dynamic_viscosity,'dynamic_viscosity',dynamic_viscosity_unit)

