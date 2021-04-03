

const handleSignin = (req, res, db) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data[0].hash === password) {
                return db.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => res.json(user[0]))                        
            } else {
                res.status(400).json('Wrong password')
            }
        })
        .catch(err => res.status(400).json('Wrong email'))
}


module.exports = {
    handleSignin
}