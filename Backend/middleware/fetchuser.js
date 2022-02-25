const jwt = require('jsonwebtoken');
const jwt_secret ="Khatmina@987";

const fetchuser = (req , res, next) => {
    const token = req.header('token')

    if (!token){
        res.status(401).send({error:"Please authernciate using valid token"})
    }


try {
const data = jwt.verify(token,jwt_secret)
req.user = data.user;
next();
}
catch (error){
    res.status(401).send({error:"Please authernciate using valid token"})
}
}
module.exports = fetchuser