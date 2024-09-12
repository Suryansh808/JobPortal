const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  updatedOn: {
    type: String,
    required: true
  },
  applyStatus: {
    type: String,
    required: true
  },
  applicationDeadline: {
    type: String,
    required: true
  },
  impressions: {
    type: Number,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  desiredSkills: {
    type: [String],
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    minSalary: {
      type: Number,
      required: true
    },
    maxSalary: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    per: {
      type: String,
      required: true
    }
  },
  workingDays: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  jobTiming: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String,
    required: true
  }
});

const Job = mongoose.model('Jobs', jobSchema);

const jobs = [
  {
    "jobTitle": "java",
    "companyName": "English Caffe",
    "location": "Noida",
    "updatedOn": "Jul 12, 2024",
    "applyStatus": "Applied",
    "applicationDeadline": "10 hours left",
    "impressions": 16624,
    "eligibility": "Fresher",
    "jobDescription": "We are looking for full-time Communication Trainers to join our team at English Caffe located in Noida. The successful candidate will be responsible for teaching English language classes to students of all levels, providing feedback and guidance, and helping students improve their English language skills.",
    "desiredSkills": [
      "Excellent command of the English language",
      "Strong communication and interpersonal skills",
      "Ability to teach English language classes to students of all levels",
      "Ability to provide feedback and guidance to students",
      "Ability to motivate and encourage students",
      "Ability to create and deliver engaging lessons",
      "Knowledge of English language teaching methods and techniques",
      "Knowledge of English language assessment tools",
      "Knowledge of English language learning resources",
      "Bachelor’s degree in English, Education, or a related field",
      "Teaching experience in a classroom or online setting",
      "Computer literacy and familiarity with online teaching platforms",
      "Flexibility and adaptability",
      "Patience and understanding"
    ],
    "experience": "No prior experience required",
    "salary": {
      "minSalary": 240000,
      "maxSalary": 360000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "5 Days",
    "jobType": "In Office",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "jobTitle": "Software Developer",
    "companyName": "Tech Solutions",
    "location": "Bangalore",
    "updatedOn": "Jul 14, 2024",
    "applyStatus": "Apply",
    "applicationDeadline": "5 days left",
    "impressions": 20345,
    "eligibility": "2+ years experience",
    "jobDescription": "Join our dynamic team as a Software Developer at Tech Solutions in Bangalore. You will work on exciting projects using cutting-edge technologies.",
    "desiredSkills": [
      "Proficiency in JavaScript, HTML, and CSS",
      "Experience with React.js and Node.js",
      "Knowledge of RESTful APIs",
      "Familiarity with database management systems",
      "Problem-solving skills",
      "Ability to work in a team"
    ],
    "experience": "2+ years",
    "salary": {
      "minSalary": 600000,
      "maxSalary": 900000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "5 Days",
    "jobType": "Hybrid",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "jobTitle": "Graphic Designer",
    "companyName": "Creative Minds",
    "location": "Mumbai",
    "updatedOn": "Jul 10, 2024",
    "applyStatus": "Applied",
    "applicationDeadline": "2 days left",
    "impressions": 18765,
    "eligibility": "Fresher",
    "jobDescription": "We are seeking a talented Graphic Designer to join Creative Minds in Mumbai. The role involves creating visually appealing designs for various media.",
    "desiredSkills": [
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio of design projects",
      "Attention to detail",
      "Creativity and innovation",
      "Time management skills"
    ],
    "experience": "No prior experience required",
    "salary": {
      "minSalary": 300000,
      "maxSalary": 450000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "6 Days",
    "jobType": "In Office",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "jobTitle": "Digital Marketing Executive",
    "companyName": "Market Leaders",
    "location": "Chennai",
    "updatedOn": "Jul 15, 2024",
    "applyStatus": "Apply",
    "applicationDeadline": "7 days left",
    "impressions": 15678,
    "eligibility": "1+ years experience",
    "jobDescription": "Market Leaders in Chennai is looking for a Digital Marketing Executive to manage online marketing campaigns and enhance our digital presence.",
    "desiredSkills": [
      "Experience with SEO and SEM",
      "Knowledge of Google Analytics",
      "Familiarity with social media marketing",
      "Strong communication skills",
      "Creative thinking"
    ],
    "experience": "1+ years",
    "salary": {
      "minSalary": 400000,
      "maxSalary": 550000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "5 Days",
    "jobType": "Remote",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "jobTitle": "Data Analyst",
    "companyName": "Data Insights",
    "location": "Hyderabad",
    "updatedOn": "Jul 11, 2024",
    "applyStatus": "Apply",
    "applicationDeadline": "4 days left",
    "impressions": 21478,
    "eligibility": "2+ years experience",
    "jobDescription": "Data Insights is hiring a Data Analyst to interpret data and help drive business decisions. The position is based in Hyderabad.",
    "desiredSkills": [
      "Proficiency in SQL",
      "Experience with data visualization tools",
      "Analytical mindset",
      "Attention to detail",
      "Ability to communicate complex data insights"
    ],
    "experience": "2+ years",
    "salary": {
      "minSalary": 500000,
      "maxSalary": 700000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "5 Days",
    "jobType": "Hybrid",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "jobTitle": "Human Resources Manager",
    "companyName": "People First",
    "location": "Pune",
    "updatedOn": "Jul 9, 2024",
    "applyStatus": "Apply",
    "applicationDeadline": "6 days left",
    "impressions": 17856,
    "eligibility": "3+ years experience",
    "jobDescription": "We are seeking an HR Manager to join People First in Pune. The role involves managing HR operations and fostering a positive workplace culture.",
    "desiredSkills": [
      "Strong leadership and management skills",
      "Knowledge of HR policies and procedures",
      "Excellent communication skills",
      "Problem-solving abilities",
      "Experience in recruitment and employee relations"
    ],
    "experience": "3+ years",
    "salary": {
      "minSalary": 700000,
      "maxSalary": 900000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "5 Days",
    "jobType": "In Office",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "jobTitle": "Product Manager",
    "companyName": "Innovatech",
    "location": "Delhi",
    "updatedOn": "Jul 13, 2024",
    "applyStatus": "Apply",
    "applicationDeadline": "3 days left",
    "impressions": 23465,
    "eligibility": "5+ years experience",
    "jobDescription": "Innovatech in Delhi is hiring a Product Manager to lead product development and strategy. This role is crucial to the success of our new product line.",
    "desiredSkills": [
      "Experience in product management",
      "Strong leadership and decision-making skills",
      "Knowledge of market research and analysis",
      "Ability to work with cross-functional teams",
      "Excellent communication skills"
    ],
    "experience": "5+ years",
    "salary": {
      "minSalary": 1200000,
      "maxSalary": 1500000,
      "currency": "INR",
      "per": "Year"
    },
    "workingDays": "5 Days",
    "jobType": "In Office",
    "jobTiming": "Full Time",
    "companyLogo": "https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

mongoose.connect('mongodb://localhost:27017/otp-auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return Job.insertMany(jobs);
  })
  .then(() => {
    console.log('Data imported successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error importing data: ', err);
  });
