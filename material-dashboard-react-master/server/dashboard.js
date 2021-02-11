module.exports = {

    //tasks
    tasks: function(req, res) {
		res.status(200).send("tasks")
    },
    //products
    products: function(req, res) {
		res.status(200).send("products")
    }
}