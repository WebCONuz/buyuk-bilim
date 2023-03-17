const protucted = (req, res, next) => {
    if(!req.session.isLogged){
        res.redirect('/');
    }
    next();
}

const guest = (req, res, next) => {
    if(req.session.isLogged){
        res.redirect('/');
    }
    next();
}

module.exports = {
    protucted,
    guest
}