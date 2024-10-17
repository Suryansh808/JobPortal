const mongoose = require('mongoose');
const AdminControlSchema = new mongoose.Schema({
    logo: { type: String },
    slider: [{type: String},],
    industries: [{title: { type: String },image: { type: String },text: { type: String }}],
    services: [{title: { type: String },image: { type: String },text: { type: String }}],
    products: [{title: { type: String },image: { type: String },text: { type: String }}],
    projects: [{title: { type: String },image: { type: String },text: { type: String }}],
    missionVision: {mission: { type: String },vision: { type: String }},
    recentUpdate: [{image: { type: String },text: { type: String }}],
    pressReleases: [{image: { type: String },text: { type: String }}],
});

// Export the modely
const AdminControl = mongoose.model('AdminControl', AdminControlSchema);

module.exports = AdminControl;