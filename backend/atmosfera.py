import numpy
 
def temperature(height):
    if height < 11000.0:
        return 288.15 - height / 1000 * 6.5
    else:
        return 216.5
def density(height):
    if height < 11000.0:
        return 1.255 * (1 - height/ 44330) ** 4.256
    else:
        return 0.3639 * numpy.exp((height- 11000) / 6340)

def pressure(height):
    if height < 11000.0:
        return 101325 * (1 - height / 44300) ** 5.256
    else:
        return 22632 * numpy.exp((height- 11000) / 6340)

def sound_speed(height):
     return 340.3 * numpy.sqrt(temperature(height) / 288.15)

def dynamic_viscosity(height):
    return 1.458 * 10 ** (-6) * temperature(height) ** 1.5 / (temperature(height) + 100.4)

def kinematic_viscosity(height):
    return 1.40607 * 10 ** (-5) * 101325 / pressure(height) * (temperature(height) / 288.15) ** 1.754