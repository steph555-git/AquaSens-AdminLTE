const sensorsButton = document.getElementById('callSensorsListAPI')
const imgArrowsRotate = document.getElementById('imgArrowsRotate')
const progressBar = document.getElementById('progressBar')

const generateTableHTML = (dataSensorsList) => {
    const tbl = document.getElementById("sensorsTable")
    let tblBody = document.getElementById("sensorsTbody")

    for (let i = 0; i < dataSensorsList.length; i++) {
        const row = document.createElement("tr")
        for (const key in dataSensorsList[i]) {

            const cell = document.createElement("td")
            const cellText = document.createElement("div")
            cellText.innerHTML = `${dataSensorsList[i][key]}`
            cell.setAttribute("style", "text-align:center")
            cell.appendChild(cellText)
            row.appendChild(cell)
        }
        tblBody.appendChild(row)
    }
    tbl.appendChild(tblBody)
    progressBar.setAttribute("style", "width: 66%")
    progressBar.textContent = "66%"
}

const checkIfSensorsAreResisterInDB = (dataSensorsList) => {
    console.log(dataSensorsList)
    const sensorsID = []
    for (i = 0; i < dataSensorsList.length; i++) {
        sensorsID.push(dataSensorsList[i].id)

    }
    console.log(sensorsID)
}

sensorsButton.addEventListener('click', async (e) => {
    try {
        imgArrowsRotate.className = "fas fa-solid fa-sync fa-spin"
        progressBar.setAttribute("style", "width: 33%")
        progressBar.textContent = "33%"
        document.getElementById("sensorsTbody").innerHTML = ''
        const response = await fetch('http://192.168.1.4:4000/api/sensors')
        const dataSensorsList = await response.json()

        for (let i = 0; i < dataSensorsList.length; i++) {
            delete dataSensorsList[i].temperature
            dataSensorsList[i].description = ''
            dataSensorsList[i].status = ''
            dataSensorsList[i].setting = '<button type="button" class="btn" style="border:hidden;" data-toggle="modal" data-target="#modal-default"><span class="badge bg-primary" style="padding: 5px;"><i class="fas fa-thin fa-pen-to-square"></i></span></button>'
        }

        generateTableHTML(dataSensorsList)

        checkIfSensorsAreResisterInDB(dataSensorsList)

        imgArrowsRotate.className = "fa-solid fa-arrows-rotate"
        toastr.success('Generating list of sensors successfully', 'Successful')

    }
    catch (error) {
        imgArrowsRotate.className = "fa-solid fa-arrows-rotate"
        console.log(error)
        toastr.error(error.message, 'Error')
    }
})

