const path = require('path');
const bicycle = require('../controllers/bicycleController.js');
const user = require('../controllers/userController.js');


module.exports = function(app){
    app.post('/api/newbike', bicycle.create);
    app.post('/api/newuser', user.register);
    app.post('/api/login', user.login);
    app.get('/api/allBikes', bicycle.all);
    app.get('/api/allUsers', user.all);
    app.delete('/api/destroy/:id', bicycle.destroy)
    app.get('/api/currentuser', user.current);
    app.put('/api/updatebike/:id', bicycle.update)
    app.get('/api/getbike/:id', bicycle.getbike);

    app.get('*', function(req, res){
        res.sendFile(path.resolve('public', 'bicycleApp', 'dist', 'index.html'))
    })
}
