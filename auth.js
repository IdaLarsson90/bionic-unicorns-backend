const apiKeys = [
    '7BTxHCyHvzIME5TI',
    'ngfeNG1ipq9Q2PJK',
    'zaCmZA74PLKCrD8Y',
    'KwOi5em2TYNmi8Dd',
    'edVCj1E6zDZRztaq'
]

function auth (request, response, next) {
    const apiKey = request.headers['api-key'];
    if (apiKey && apiKeys.includes(apiKey)) {
        next();
    } else {
        const resObj = {
            error: 'No valid key'
        }
        response.json(resObj)
    }
}

module.exports = {auth}