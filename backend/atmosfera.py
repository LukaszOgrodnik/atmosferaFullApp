import numpy

def to_meters(height, unit="m"):
    scale = {"m":1, "ft":1/3.2808, "km":1000}
    return height*scale[unit]

def temperature(height, unit = "K"):
    scale_multiplicator = {"K":1.0 , "C":1.0 , "Fa" :9.0/5.0, "R":9.0/5.0}
    scale_additor = {"K":0, "C":-273.15 , "Fa" :- 459.67 , "R":0}
    if height < 11000.0:
        return scale_multiplicator[unit]*(288.15 - height / 1000 * 6.5) + scale_additor[unit]
    else:
        return scale_multiplicator[unit]*(216.5) + scale_additor[unit]

def density(height, unit= "kg/m^3"):
    scale={"kg/m^3":1,"g/cm^3":1/1000,"sl/ft^3": 1/515.3788184 , "lb/ft^3" : 1/16.018463}
    if height < 11000.0:
        return (1.255 * (1 - height/ 44330) ** 4.256)*scale[unit]
    else:
        return (0.3639 * numpy.exp((height- 11000) / 6340))*scale[unit]

def pressure(height, unit = "Pa"):
    scale={"Pa":1,"hPa":1/100,"MPa":1/1000000,"psi":1/6.894757*1000,"atm":1/101325,"bar":1/100000}
    if height < 11000.0:
        return (101325 * (1 - height / 44300) ** 5.256)*scale[unit]
    else:
        return (22632 * numpy.exp((height- 11000) / 6340))*scale[unit]

def sound_speed(height, unit = "m/s"):
    scale = {"m/s":1,"km/h":1/3.6,"mph":1/0.44704 ,"kts":1/0.514}
    return (340.3 * numpy.sqrt(temperature(height) / 288.15))*scale[unit]

def kinematic_viscosity(height, unit = "m^2/s"):
    scale = {"m^2/s":1, "S":10000 ,"ft^2/s":1/0.09290304}
    return (1.458 * 10 ** (-6) * temperature(height) ** 1.5 / (temperature(height) + 100.4))*scale[unit]

def dynamic_viscosity(height,unit ="Pa*s"):
    scale = {"Pa*s":1, "P":10}
    return (1.40607 * 10 ** (-5) * 101325 / pressure(height) * (temperature(height) / 288.15) ** 1.754)*scale[unit]
