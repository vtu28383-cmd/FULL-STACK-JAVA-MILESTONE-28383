import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

export default function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).send("Invalid Token");
    }
}