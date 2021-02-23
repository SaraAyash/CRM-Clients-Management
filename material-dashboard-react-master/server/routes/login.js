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

// var isValidLogin = function(item){
//     UsersData.forEach(user => {
//         if (item.username == user['username'] && item.password == user[])
//         console.log(element);
//     });
// };

module.exports = {
    //login
    login: function(req, res) {
        // isValidLogin(req.body);
        console.log(req.body);
		res.status(200).send("login")
    }
}