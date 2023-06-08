const mongoose = require('mongoose')
const { AQUASENSDB_USER, AQUASENSDB_PASSWORD } = process.env

class initDbConnection {
    constructor() {
        const uri = `mongodb+srv://${AQUASENSDB_USER}:${AQUASENSDB_PASSWORD}@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority`
        const dbName = 'AquaSensDB'
        const maxAttempts = 3
        let attemptCount = 0

        if (!initDbConnection.instance) {
            initDbConnection.instance = this
        }

        const connectWithRetry = async () => {
            try {
                await mongoose.connect(uri)
                console.log('Connected database successfully')
                this.db = mongoose.connection.db
            }
            catch (error) {
                console.log(error)
                attemptCount++
                if (attemptCount < maxAttempts) {
                    console.log(`Retrying after 2 seconds. Attempt ${attemptCount} of ${maxAttempts}`)
                    setTimeout(connectWithRetry, 2000)
                }
            }
        };

        connectWithRetry()

        return initDbConnection.instance
    }
}

module.exports = initDbConnection