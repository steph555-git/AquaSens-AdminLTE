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
    setTimeout(progressBarAdvanced(66), 2000)
}

const checkIfSensorsAreRegisterInDB = async (dataSensorsList) => {
    try {
        console.log(dataSensorsList)
        const sensorsID = []
        for (i = 0; i < dataSensorsList.length; i++) {
            sensorsID.push(dataSensorsList[i].id)
        }
        const getUserData = await fetch('/profile/sensors')
        const userData = await getUserData.json()

        console.log('Sensors List', userData.sensors)

        if (userData.sensors == undefined) {
            setTimeout(progressBarAdvanced(75), 2000)
            return false
        }
        else {
            setTimeout(progressBarAdvanced(75), 2000)
            return userData.sensors
        }
    } catch (error) {
        console.log('err', error)
    }
}

const progressBarAdvanced = (value) => {
    progressBar.setAttribute("style", `width: ${value}%`)
    progressBar.textContent = `${value}%`
}

sensorsButton.addEventListener('click', async (e) => {

    try {
        imgArrowsRotate.className = "fas fa-solid fa-sync fa-spin"
        progressBarAdvanced(33)
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

        const checkIfSensorsAreRegisterInDataBase = await checkIfSensorsAreRegisterInDB(dataSensorsList)
        if (!checkIfSensorsAreRegisterInDataBase) {
            // any sensors are registers in database

            for (let i = 0; i < dataSensorsList.length; i++) {
                const tbl = document.getElementById("sensorsTable").rows[i + 1].cells[3]
                tbl.innerHTML = '<span class="badge bg-danger">Not register</span>'
            }
            console.log('Nothing is register')
            progressBarAdvanced(100)
        } else {
            // some sensors are registers : check wish one ?
            console.log(checkIfSensorsAreRegisterInDataBase)
            progressBarAdvanced(100)
        }

        imgArrowsRotate.className = "fa-solid fa-arrows-rotate"
        toastr.success('Generating list of sensors successfully', 'Successful')

    }
    catch (error) {
        imgArrowsRotate.className = "fa-solid fa-arrows-rotate"
        console.log(error)
        toastr.error(error.message, 'Error')
    }
})

