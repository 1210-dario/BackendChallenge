function setResponseWithError(res, status, message, code = 'error', data = []) {
    res.status(status)
    res.send({ code, message, data})
    return res
}

function setResponseWithOk(res, status, message, code = 'ok', data = []) {
    res.status(status)
    res.send({ code, message, data })
    return res
}

module.exports.setResponseWithError = setResponseWithError

module.exports.setResponseWithOk = setResponseWithOk