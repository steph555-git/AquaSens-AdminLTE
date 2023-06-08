const getTemperatureAPI = async () => {
    const response = await fetch('http://192.168.1.4:4000/api/sensors')
    const data = await response.json()
    return data
}

module.exports = getTemperatureAPI
