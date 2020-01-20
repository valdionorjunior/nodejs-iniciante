class BaseRoutes {

    static methods() {
        return Object.getOwnPropertyNames(this.prototype)  //pega todos os metodos onde
                        .filter(method => method !== 'constructor' && !method.startsWith('_')) //os metodos n sejam o construtor e não começam com '_'
    }


}

module.exports = BaseRoutes