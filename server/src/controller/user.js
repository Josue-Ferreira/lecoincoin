const signin = (req, res) => {
    res.status(200).send('Hello from router')
}

const signup = (req, res) => {
    res.status(200).send('Hello from router')
}

module.exports = {
    signin,
    signup
}