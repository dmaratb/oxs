/** users log endpoints  */
const { Auth } = require('../auth');
const { Logs } = require('../Models/logs.model');
const router = require('express').Router();


router.post('/login', async (req, res) => {
    try {
        const { token, name } = await Auth.login(req.body);
        Logs.addLog(req.body.username, 'login');

        res.cookie('authorization', token);
        res.status(200);
        res.send({ username: name });
    } catch (err) {
        res.status(err.status);
        res.send(err.message);
    }
});


router.post('/logout', async (req, res) => {
    try {
        const username = await Auth.logout(req.cookies);
        Logs.addLog(username, 'logout');

        res.clearCookie('authorization');
        res.status(200);
        res.send();
    } catch (err) {
        res.status(err.status);
        res.send(err.message);
    }
});


module.exports = router;