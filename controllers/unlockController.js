import "dotenv/config";

// form rendering
export const unlock_get = (req, res, next) => {
    if(req.query.origin == undefined){
        req.query.origin = "/student";
    }
    if(req.session.password == process.env.UNLOCK_PASSWORD){
        return next();
    }
    res.render("unlock", {title: "Unlock", unlock: true});
};

export const unlock_post = (req, res, next) => {
    req.session.password = req.body.password;
    if(req.body.password == process.env.UNLOCK_PASSWORD){ 
        return next();
    }
    res.redirect("back");
}

export const lock_get = (req, res) => {
    req.session.destroy();
    res.redirect("/unlock");
}

export const redirect = (req, res) => {
    res.redirect(req.query.origin);
}; 