const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true , unique: true },
  companyLogo:{type:String, required:true},
  // companyLocation: { type: String, required: true },
  companyType: { type: String, required: true },
  otherCompanyType:{ type: String },
  position: { type: String, required: true },
  businessmodel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword :  { type: String, required: true },
  companyId: { type: String, required: true, unique: true },  // Unique company ID
  jobPostLimit:{type:Number, default:2},
});

const Company = mongoose.model("CompanyUser", companySchema);
module.exports = Company;
