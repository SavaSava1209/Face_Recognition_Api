
const handleRegister = (req, res, db) => {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('Incorrect form submission')
    } 
     db.transaction(trx => {
      trx.insert({
        hash: password,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
handleRegister 
}