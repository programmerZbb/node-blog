//  数据模型，数据来源

class BaseModel {
    constructor (data, message) {
        if (data === 'string') {
            this.message = data
            this.data = null
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.code = 0
    }
}
class EroorModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.code = -1
    }
}

module.exports = {
    SuccessModel,
    EroorModel
}