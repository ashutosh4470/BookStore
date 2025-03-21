import express from 'express'
import { Book } from '../models/BookModel.js';

const router = express.Router();

//Route for getOne book
router.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).send(book);        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:error.message});
    }
})
//Route for getAll books
router.get('/',async(req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).send({
            count:books.length,
            data:books
        });        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:error.message});
    }
})

router.put('/:id',async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:"Send all required Fields"});
        }

        const {id} = req.params;
        const result= await Book.findByIdAndUpdate(id,req.body);
        if(!result)
            return res.status(404).send({message:"Book Not Found"});
        return res.status(200).send({message:"Book Updated Successfully"});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:error.message});
    }
})

//Route for save book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send("Send all required fields")
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log("Error ", error.message);
        res.status(500).send({ message: error.message });
    }
})

//Route for deleteBook
router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result)
            return res.status(404).send({message:"Id Not found"});
        return res.status(200).send({message:"Item Deleted successfully"});

    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

export default router;