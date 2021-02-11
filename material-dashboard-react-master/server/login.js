const UsersData = [
    {
        "username": "a",
        "password": "1"
    },
    {
        "username": "b",
        "password": "2"
    },
    {
        "username": "c",
        "password": "d"
    }
]
module.exports = {
    //login
    login: function(req, res) {
        console.log(req.text);
		res.status(200).send("login")
    }
}