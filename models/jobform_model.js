const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({

    companyLogo: {
        type: String,

    },
    companyName: {
        type: String,
        // required: true,
    },
    jobTitle: {
        type: String,
        // required: true,
    },
    jobNature: {
        type: Number,
        // required: true,
    },
    jobTime: {
        type: String,
        // required: true,
    },
    workplaceType:[ {
        type: String,
        
        
    }],
    workLocation: [{
        type: String,
    }
    ],
    jobCategory: [{
        type: String,
    }],
    skillsRequired:[ {
        type: String
    }], 
    experienceRequired: {
        type: String,
    },
    salaryType: {
        type: String,
    },
    salaryRange: {
        type: String,
    }, 
    otherBenefits: {
        type: String,
    }, 
    jobDescription: {
        type: String,
    }, 
 

});

const jobform = mongoose.model("jobform", jobSchema);
module.exports = jobform;