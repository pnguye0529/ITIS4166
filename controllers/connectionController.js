const model = require('../models/connection');

exports.connections = (req, res, next) => {
    model.find()
    .then((connections) => res.render('./display/connections_index', {connections}))
    .catch(err=>next(err));
};

exports.newConnection = (req, res) => {
    res.render('./display/newConnection');
};

exports.create = (req, res, next) => {
    let connection = new model(req.body);
    connection.save()
    .then((connection) => res.redirect('/connections'))
    .catch(err => {
        if (err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

exports.connection_show = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection => {
        if(connection) {
            return res.render('./display/connection_show', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection => {
        if(connection)
            return res.render('./display/edit', {connection});
        else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
    }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection => {
        if(connection) 
            res.redirect('/connections/'+id);
        else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection => {
        if(connection) 
            res.redirect('/connections');
        else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
