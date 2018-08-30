var router = require('express').Router()
var faker = require('faker')
var Product = require('../models/product')

router.get('/add-product', function(req, res, next) {
    res.render('main/add-product')
})

router.post('/add-product', function(req, res, next) {
    var product = new Product()

    product.category = req.body.category_name
    product.name = req.body.product_name
    product.price = req.body.product_price
    product.cover = faker.image.image()

    product.save(function(err) {
        if (err) throw err
        res.redirect('/add-product')
    })
})
router.get('/generate-fake-data', function(req, res, next) {
    for (var i = 0; i < 90; i++) {
        var product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.cover = faker.image.image()

        product.save(function(err) {
            if (err) throw err
        })
    }
    res.redirect('/add-product')
});
router.get('/products/:page', (req, res) => {
    var perPage = 9
    var page = req.params.page || 1
    var CurrentPage = parseInt(page);
    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('main/product', {
                    Products: products,
                    current: CurrentPage,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
});

    

router.get('/', (req, res) => {
       res.redirect('/products/1');
});

module.exports = router