async function sendResult(res, status, error, msg, data){
    return res.json({status, error, msg, data})
};

module.exports = {
    sendResult,
}