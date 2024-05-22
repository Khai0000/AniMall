import mongoose from "mongoose";
import {ProductModel} from "./productsModel.js";

export const getAllProducts = async(req,res)=>{
    try{
        const response = await ProductModel.find().sort({ createdAt: -1 });
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

export const getOneProduct = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error:"Invalid product id"});

    try{
        const response = await ProductModel.findById({_id:id});

        if(!response)
            return res.status(404).json({error:"The product is not found"});

        return res.status(200).json(response);

    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addProduct = async (req,res)=>{
    const {title, description, image, animaltag, producttag, price,ratings,comments,stockLevel,hidden} = req.body;
    console.log(req.body);
    try{
        const newProduct = await ProductModel.create({
            title,
            description,
            image, 
            animaltag, 
            producttag,
            price,
            ratings,
            comments,
            stockLevel,
            hidden
        })
        return res.status(200).json(newProduct);
    }catch (error){
        return res.status(400).json({error:error.message});
    }
}

export const addComment = async (req, res)=>{
    const {id} = req.params;
    const {name, content} = req.body;
    try{
        const productToUpdate = await ProductModel.findById({_id:id});
        if(!productToUpdate){
            return res.status(404).json({error:"Product not found"});
        }

        const newComment = {name,content};
        productToUpdate.comments.push(newComment);
        await productToUpdate.save();

        const addedComment = productToUpdate.comments.find(
            (comment)=>comment.name === name && comment.content === content
        );

        return res.status(201).json(addedComment);
    }catch (error){
        console.error("Error adding comment:",error);
        res.status(500).json({error:"Internal server error"});
    }
};

export const addRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
  
    if (rating < 1 || rating > 5) {
      return res.status(400).send({ error: 'Rating must be between 1 and 5' });
    }
  
    try {
      const product = await ProductModel.findById(id);
  
      if (!product) {
        return res.status(404).send({ error: 'Product not found' });
      }
  
      product.ratings[rating] = (product.ratings[rating] || 0) + 1;
  
      let totalRatings = 0;
      for (let i = 1; i <= 5; i++) {
        totalRatings += product.ratings[i];
      }
      product.ratings.total = totalRatings;
  
      await product.save();
  
      res.status(200).send({ message: 'Rating added successfully', product });
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  };

export const deleteComment = async (req, res)=>{
    const {productId, commentId} = req.params;

    try{
        const productToDeleteComment = await ProductModel.findById({_id: productId});

        if(!productToDeleteComment){
            return res.status(404).json({error: "Product not found"});
        }

        productToDeleteComment.comments.pull({_id: commentId});

        await productToDeleteComment.save();

        return res.status(200).json({message:"Comment deleted successfully"});
    }catch (error){
        console.error("Error deleting comment:",error);
        res.status(500).json({error:"Internal server error"});
    }
};


