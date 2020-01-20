const BaseRoutes = require('./base/baseRoutes')

class HeroRoutes extends BaseRoutes{

    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:  '/herois',
            method: 'GET',
            hendler: (request, headers) => {
                return this.db.read()
            }
        }
    }

    create () {
        return {
            path:  '/herois',
            method: 'POST',
            hendler: (request, headers) => {
                return this.db.read()
            }
        }
    }
}

module.exports = HeroRoutes