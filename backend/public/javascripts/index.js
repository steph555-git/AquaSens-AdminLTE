
const socket = io('http://192.168.1.4:4000')

socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO')
})

socket.on('data', (sensorsData) => {
    console.log(sensorsData)
    $('#tempCard1').text(sensorsData.sensors[0].temperature + '°C')
    $('#tempCard2').text(sensorsData.sensors[1].temperature + '°C')
    $('#tempCard3').text(sensorsData.sensors[2].temperature + '°C')
})
