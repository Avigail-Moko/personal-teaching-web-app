const mongoose = require('mongoose');
const Product = require('../models/products');




module.exports={
    createProduct:(req,res)=>{
            const { lesson_title, category, price, length, description, userId } = req.body;
            if (!req.file) {
                return res.status(400).json({ message: 'לא נבחר קובץ' });
            }
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                lesson_title,
                category,
                price,
                length,
                description,
                userId,
                image: {
                    filename: req.file.filename,
                    path: req.file.path,
                    // ייתכן שתרצי להוסיף גם את שאר המידע שמחזיק multer על הקובץ, כמו size וכו'
                }
            });
            product.save().then((result) => {
                console.log(result);
                res.status(200).json({
                    message: 'product created'
                });
            }).catch(error => {
                console.error('Error:', error);
                res.status(500).json({
                    message: 'product not saved',
                });
            });
        },

    getProduct: (req,res)=>{
        const userId = req.query.userId;
        Product.find({ userId })
            .exec()
            
            .then(product => {
                //הפונקציה הזאת מפריעה לסרבר לרוץ:
                // const product_image = Buffer.from(product.productImage.split(',')[1], 'base64');
                // res.writeHead(200, {
                //     'Content-Type': 'image/png',
                //     'Content-Length': imageBuffer.length,
                // });
               return res.status(200).json({product});
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).json({
                  message: 'Error retrieving products',
                });
              });
    },
    deleteProduct: (req, res) => {
        const _id = req.query._id; 

        Product.deleteOne({_id: _id }).then(()=>{
            res.status(200).json({
                message: 'product deleted'
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        })
    },
    updateProduct: (req, res) => {
        const _id = req.query._id; 
        const updateFields = req.body; // אובייקט שיכיל את כל השדות שברצונך לעדכן
           // אם יש קובץ חדש, עדכן את נתיב התמונה
           if (req.file) {
            updateFields.image = req.file.path;
        }

        Product.updateOne({ _id: _id }, { $set: updateFields })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Product updated successfully',
                    result: result
                });
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({
                    error: error
                });
            });
    }
    
}
