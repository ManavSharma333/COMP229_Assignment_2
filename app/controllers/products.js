let Products = require('../models/productsSchema');


module.exports.create = async function (req, res, next) {
    try {
        let newProduct = new Products(req.body);

        let result = await Products.create(newProduct);
        res.json(
            {
                success: true,
                message: "Product created sucessfully."
            }
        );
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.list = async function (req, res, next) {
    try {
        let list = await Products.find({});
        res.json(list);
    } catch (error) {
        next(error);
    }
}

exports.userByID = async function (req, res, next) {
    try {
        let productId = req.params.productId;
        req.user = await Products.findOne({ _id: productId });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.read = function (req, res) {
    res.json(req.user);
};

exports.update = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        let updatedUser = Products(req.body);
        updatedUser._id = productId;

        let result = await Products.updateOne({ _id: productId }, updatedProduct);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Product updated sucessfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Product not updated. Are you sure it exists?')
        }
    } catch (error) {
        next(error)
    }
}

module.exports.remove = async (req, res, next) => {
     try {
       let id = req.params.productId;
       let result = await Products.deleteOne({ _id: id });
       console.log("====> Result: ", result);
       if (result.deletedCount > 0) {
         res.json(
           {
             success: true,
             message: "Product deleted sucessfully."
           }
         )
       }
       else {
         // Express will catch this on its own.
         throw new Error('Product not deleted. Are you sure it exists?')
       }
     } catch (error) {
       console.log(error);
       next(error);
     }
    }
    