const product = require("../models/product_model.js")
const jobform = require("../models/jobform_model.js")
const jwt = require('jsonwebtoken')

const addproduct = async (req, res) => {
    try {



        const { name, description, price, category } = req.body;
        // await jobpost.deleteMany({})

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: " name, description, price, category are  required ", success: false })
        }

        if (price < 0) {
            return res.status(400).json({ message: " price should be a positive number ", success: false })
        }

        const newproduct = await product.create({ name, description, price, category });

        res.status(201).json({
            message: " product is added successfully",
            productID: newproduct._id,


            success: true
        });


    } catch (error) {

        res.status(400).json({ msg: "Internel server error form job", error })

    }
}

const updateproduct = async (req, res) => {
    try {
 
        const { name, description, price, category } = req.body;

        const productID = req.params.productId
        if (!productID) {
            res.status(400).json({ message: "job Id required", success: false })
        }

        if (!name && !description && !price && !category) {
            return res.status(400).json({ message: " enter any detail ", success: false })
        }


        const existproduct = await product.findById(productID)
        if (!existproduct) {
            res.status(400).json({ message: "job not found", success: false })
        }
        console.log(typeof name)

        if (name && typeof name !== 'string') {
            return res.status(400).json({ error: " Invalid  name formate ", success: false })
        }
        if (description && typeof description !== 'string') {
            return res.status(400).json({ error: " Invalid  description formate ", success: false })
        }
        if (price < 0) {
            return res.status(400).json({ error: " price should be a positive number ", success: false })
        }
        if (category && typeof category !== 'string') {
            return res.status(400).json({ error: " Invalid  category formate ", success: false })
        }



        if (name) {
            existproduct.name = name
        }

        if (description) {
            existproduct.description = description
        }

        if (price) {
            existproduct.price = price
        }

        if (category) {
            existproduct.category = category
        }

        return res.status(200).json({ message: "product updated", productID: existproduct._id, success: true, updateproduct: existproduct })

    } catch (error) {
        console.log(error)

    }

}

const deleteproduct = async (req, res) => {
    const productID = req.params.productId
    if(!product){
        return res.status(200).json({ message: "product id required", success: true })
    }
    // await product.deleteMany({})
    await product.deleteOne({ _id: productID })
    return res.status(200).json({ message: "product deleted", success: true })
}


const getallproduct = async (req, res) => {
    try {
        const products = await product.find();

        if(products==""){
            return res.status(200).json({ error: "product not found" })
        }
        res.send({ products })
        console.log("posts send succesfully ")
    } catch (error) {

    }
}

const getpostbyid = async (req, res) => {
    try {
        const jobid = req.params.id
        const job = await jobpost.findById(jobid)
        if (!job) {
            res.status(400).json({ message: "job not found", success: false })
        }
        return res.status(200).json({ job, success: true })

    } catch (error) {
        console.log(error)

    }

}

const getadminjob = async (req, res) => {

    try {
        const posts = await jobpost.find(req.user.EmailId)
        if (!posts) {
            res.status(200).json("job not found")
        }
        else { res.send(posts) }
    } catch (error) {

        res.status(200).json("job not found")
    }
}


const jobformpost = async (req, res) => {

    try {
        await jobpost.deleteMany({})
        let { companyLogo, companyName, workLocation, jobTitle, jobNature, jobTime, workplaceType, jobCategory, skillsRequired, experienceRequired, salaryType, salaryRange, otherBenefits, jobDescription } = req.body
        jobformdata = await jobform.create({ companyLogo, companyName, workLocation, jobTitle, jobNature, jobTime, workplaceType, jobCategory, skillsRequired, experienceRequired, salaryType, salaryRange, otherBenefits, jobDescription })

        res.status(201).json({ message: "job created successfuly", success: true, jobformdata })


    } catch (error) {

        console.log(error)

    }
}

module.exports = { addproduct, updateproduct, deleteproduct, getallproduct, getpostbyid, getadminjob, jobformpost }