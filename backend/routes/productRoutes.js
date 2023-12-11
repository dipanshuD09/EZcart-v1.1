import express from "express";
//import products from '../data/products.js';
import { getProducts, getProductById } from '../controllers/productController.js';
import { error } from "console";
const router = express.Router();

// router.get('/', asyncHandler( async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
// }));

// router.get('/:id', asyncHandler( async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//        return res.json(product);
//     } else {
//         res.status(404);
//         throw new error('Product Not Found');
//     };
// }));

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;