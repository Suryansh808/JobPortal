// import React, { useState } from "react";
// import { FaDownload, FaSave, FaHome, FaPhone, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaChevronCircleRight, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import "./CreateResume.css";


// const CreateResume = () => {
//   const [skills, setSkills] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [achievements, setAchievements] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [educations, setEducations] = useState([]);
//   const [sections, setSections] = useState([]);

//   const addSkill = () => setSkills([...skills, { skill: "write your skill here" }]);
//   const remSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

//   const addLang = () => setLanguages([...languages, { lang: "LANGNAME", level: "level u know" }]);
//   const remLang = (index) => setLanguages(languages.filter((_, i) => i !== index));

//   const addAch = () => setAchievements([...achievements, { achievement: "Write your achievement" }]);
//   const remAch = (index) => setAchievements(achievements.filter((_, i) => i !== index));

//   const addInt = () => setInterests([...interests, { interest: "Write interest" }]);
//   const remInt = (index) => setInterests(interests.filter((_, i) => i !== index));

//   const addEdu = () => setEducations([...educations, { degree: "YOUR DEGREE", institute: "Institute name", year: "Passing Year" }]);
//   const remEdu = (index) => setEducations(educations.filter((_, i) => i !== index));

//   const addSec = () => setSections([...sections, { title: "NEW SECTION", description: "This is the description part of your new section." }]);
//   const remSec = (index) => setSections(sections.filter((_, i) => i !== index));

//   const printPdf = () => {
//     // Your print function implementation here
//   };

//   return (
//     <div className="text-black">
//       <div className="nav">
//         <button id="cmd" onClick={printPdf} className="navbtn"><FaDownload /></button>
//         <form>
//           <input type="hidden" id="custinfo" name="custinfo" />
//           <button className="navbtn"><FaSave /></button>
//         </form>
//         <button className="navbtn"><FaHome /></button>
//       </div>

//       <div className="resume" id="resume">
//         <section id="print">
//           <div className="head">
//             <div className="main">
//               <span className="name" contentEditable={true}>YOUR</span> <span contentEditable={true}>NAME</span>
//               <div className="post" contentEditable={true}>YOUR JOB PROFILE</div>
//             </div>

//             <div className="contacts">
//               <span className="content" contentEditable={true}>000-000-0000</span>
//               <span className="symbol"><FaPhone /></span><br />
//               <span className="content" contentEditable={true}>someone@example.com</span><span className="symbol"><FaEnvelope /></span><br />
//               <span className="content" contentEditable={true}>linkedin/username.com</span><span className="symbol"><FaLinkedin /></span><br />
//               <span className="content" contentEditable={true}>123 St City, St 00000</span><span className="symbol"><FaMapMarkerAlt /></span>
//             </div>
//           </div>

//           <div className="line"></div>
//           <div className="mainbody">
//             <div className="leftside">
//               <span className="title">MY SKILLS</span><br /><br />
//               <div>
//                 {skills.map((skill, index) => (
//                   <div className="skill" key={index}>
//                     <span><input type="checkbox" className="input-checkbox" /></span>
//                     <span><FaChevronCircleRight /></span>
//                     <span contentEditable={true}>{skill.skill}</span>
//                   </div>
//                 ))}
//                 <button id="skilladd" type="button" className="btn btn-success" onClick={addSkill}><FaPlusCircle /> Skill</button>
//                 <button id="skillrem" type="button" className="btn btn-danger" onClick={() => remSkill(skills.length - 1)}><FaMinusCircle /> Skill</button>
//               </div>

//               <br /><br /><span className="title">LANGUAGES</span><br /><br />
//               <div>
//                 {languages.map((language, index) => (
//                   <div className="language" key={index}>
//                     <span><input type="checkbox" className="input-checkbox" /></span>
//                     <span contentEditable={true}>{language.lang}</span> - <span contentEditable={true}>{language.level}</span>
//                   </div>
//                 ))}
//                 <button id="langadd" type="button" className="btn btn-success" onClick={addLang}><FaPlusCircle /> Language</button>
//                 <button id="langrem" type="button" className="btn btn-danger" onClick={() => remLang(languages.length - 1)}><FaMinusCircle /> Language</button>
//               </div>

//               <br /><br /><span className="title">ACHIEVEMENTS</span><br /><br />
//               <div>
//                 {achievements.map((achieve, index) => (
//                   <div className="achieve" key={index}>
//                     <span><input type="checkbox" className="input-checkbox" /></span>
//                     <span contentEditable={true}>{achieve.achievement}</span>
//                   </div>
//                 ))}
//                 <button id="achadd" type="button" className="btn btn-success" onClick={addAch}><FaPlusCircle /> Achievement</button>
//                 <button id="achrem" type="button" className="btn btn-danger" onClick={() => remAch(achievements.length - 1)}><FaMinusCircle /> Achievement</button>
//               </div>

//               <br /><br /><span className="title">INTERESTS</span><br /><br />
//               <div>
//                 {interests.map((interest, index) => (
//                   <div className="achieve" key={index}>
//                     <span><input type="checkbox" className="input-checkbox" /></span>
//                     <span contentEditable={true}>{interest.interest}</span>
//                   </div>
//                 ))}
//                 <button id="Intadd" type="button" className="btn btn-success" onClick={addInt}><FaPlusCircle /> Interest</button>
//                 <button id="Intrem" type="button" className="btn btn-danger" onClick={() => remInt(interests.length - 1)}><FaMinusCircle /> Interest</button>
//               </div>
//             </div>

//             <div className="border"></div>
//             <div className="rightside">
//               <span className="title">PROFILE</span><br /><br />
//               <div contentEditable={true}>
//                 Here you can write the basic information about your career, like your forte, and something about yourself that
//                 you want your interviewer to know. Try to keep it brief and only provide necessary information. Do not include information which is
//                 already written in your resume in another section.
//               </div>

//               <br /><br /><span className="title">EDUCATION</span><br /><br />
//               <div>
//                 {educations.map((edu, index) => (
//                   <div className="edublock" key={index}>
//                     <span><input type="checkbox" className="input-checkbox" /></span>
//                     <span className="education-head" contentEditable={true}>{edu.degree}</span>
//                     <div><span contentEditable={true}>{edu.institute}</span> - <span contentEditable={true}>{edu.year}</span></div>
//                   </div>
//                 ))}
//                 <button id="eduadd" type="button" className="btn btn-success" onClick={addEdu}><FaPlusCircle /> Education</button>
//                 <button id="edurem" type="button" className="btn btn-danger" onClick={() => remEdu(educations.length - 1)}><FaMinusCircle /> Education</button>
//               </div>

//               <br /><br />
//               <div className="new-section-div">
//                 {sections.map((sec, index) => (
//                   <div key={index}>
//                     <span><input type="checkbox" className="input-checkbox" /></span>
//                     <span className="title" contentEditable={true}>{sec.title}</span><br /><br />
//                     <div contentEditable={true}>{sec.description}</div>
//                   </div>
//                 ))}
//                 <button id="secadd" type="button" className="btn btn-success" onClick={addSec}><FaPlusCircle /> Section</button>
//                 <button id="secrem" type="button" className="btn btn-danger" onClick={() => remSec(sections.length - 1)}><FaMinusCircle /> Section</button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default CreateResume;
import React, { useState } from "react";
import { FaDownload, FaSave, FaHome, FaPhone, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaChevronCircleRight, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
// Assuming html2pdf is imported or accessible
import html2pdf from 'html2pdf.js';

const CreateResume = () => {
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [interests, setInterests] = useState([]);
  const [educations, setEducations] = useState([]);
  const [sections, setSections] = useState([]);
  const [maxNewSection, setMaxNewSection] = useState(0);

  const saveresume = () => {
    const sec = document.getElementById("print");
    const value1 = sec.innerHTML;
    const info = document.getElementById("custinfo");
    if (info) {
      info.value = value1;
    }
  };

  const printPdf = () => {
    const content = document.getElementById("resume");
    const allButtons = document.querySelectorAll("#print button");
    const allInputCheckboxes = document.querySelectorAll(".input-checkbox");

    allButtons.forEach((button) => {
      button.classList.add("none");
    });
    allInputCheckboxes.forEach((input) => {
      input.classList.add("none");
    });

    html2pdf(content, {
      html2canvas: { scale: 1, logging: true, dpi: 500 },
    }).then(() => {
      allButtons.forEach((button) => {
        button.classList.remove("none");
      });
      allInputCheckboxes.forEach((input) => {
        input.classList.remove("none");
      });
    });
  };

  const addSkill = () => {
    setSkills([...skills, { skill: "write your skill here" }]);
    saveresume();
  };

  const remSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
    saveresume();
  };

  const addLang = () => {
    setLanguages([...languages, { lang: "LANGNAME", level: "level u know" }]);
    saveresume();
  };

  const remLang = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
    saveresume();
  };

  const addAch = () => {
    setAchievements([...achievements, { achievement: "Write your achievement" }]);
    saveresume();
  };

  const remAch = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
    saveresume();
  };

  const addInt = () => {
    setInterests([...interests, { interest: "Write interest" }]);
    saveresume();
  };

  const remInt = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
    saveresume();
  };

  const addEdu = () => {
    setEducations([...educations, { degree: "YOUR DEGREE", institute: "Institute name", year: "Passing Year" }]);
    saveresume();
  };

  const remEdu = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
    saveresume();
  };

  const addSec = () => {
    if (maxNewSection < 5) {
      setSections([...sections, { title: "NEW SECTION", description: "This is the description part of your new section." }]);
      setMaxNewSection(maxNewSection + 1);
      saveresume();
    } else {
      alert("Max 5 NEW SECTION can be added!");
    }
  };

  const remSec = (index) => {
    setSections(sections.filter((_, i) => i !== index));
    setMaxNewSection(maxNewSection - 1);
    saveresume();
  };

  return (
    <div id="createResume" className="text-black">
      <div className="nav">
        <button id="cmd" onClick={printPdf} className="navbtn"><FaDownload /></button>
        <form>
          <input type="hidden" id="custinfo" name="custinfo" />
          <button className="navbtn"><FaSave /></button>
        </form>
        <button className="navbtn"><FaHome /></button>
      </div>

      <div className="resume" id="resume">
        <section id="print">
          <div className="head">
            <div className="main">
              <span className="name" contentEditable={true}>YOUR</span> <span contentEditable={true}>NAME</span>
              <div className="post" contentEditable={true}>YOUR JOB PROFILE</div>
            </div>

            <div className="contacts">
              <span className="content" contentEditable={true}>000-000-0000</span>
              <span className="symbol"><FaPhone /></span><br />
              <span className="content" contentEditable={true}>someone@example.com</span><span className="symbol"><FaEnvelope /></span><br />
              <span className="content" contentEditable={true}>linkedin/username.com</span><span className="symbol"><FaLinkedin /></span><br />
              <span className="content" contentEditable={true}>123 St City, St 00000</span><span className="symbol"><FaMapMarkerAlt /></span>
            </div>
          </div>

          <div className="line"></div>
          <div className="mainbody">
            <div className="leftside">
              <span className="title">MY SKILLS</span><br /><br />
              <div id="skills">
                {skills.map((skill, index) => (
                  <div className="skill" key={index}>
                    <span><input type="checkbox" className="input-checkbox" /></span>
                    <span><FaChevronCircleRight /></span>
                    <span contentEditable={true}>{skill.skill}</span>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={addSkill}><FaPlusCircle /> Skill</button>
                <button type="button" className="btn btn-danger" onClick={() => remSkill(skills.length - 1)}><FaMinusCircle /> Skill</button>
              </div>

              <br /><br /><span className="title">LANGUAGES</span><br /><br />
              <div id="languages">
                {languages.map((language, index) => (
                  <div className="language" key={index}>
                    <span><input type="checkbox" className="input-checkbox" /></span>
                    <span contentEditable={true}>{language.lang}</span> - <span contentEditable={true}>{language.level}</span>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={addLang}><FaPlusCircle /> Language</button>
                <button type="button" className="btn btn-danger" onClick={() => remLang(languages.length - 1)}><FaMinusCircle /> Language</button>
              </div>

              <br /><br /><span className="title">ACHIEVEMENTS</span><br /><br />
              <div id="achievement">
                {achievements.map((achieve, index) => (
                  <div className="achieve" key={index}>
                    <span><input type="checkbox" className="input-checkbox" /></span>
                    <span contentEditable={true}>{achieve.achievement}</span>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={addAch}><FaPlusCircle /> Achievement</button>
                <button type="button" className="btn btn-danger" onClick={() => remAch(achievements.length - 1)}><FaMinusCircle /> Achievement</button>
              </div>

              <br /><br /><span className="title">INTERESTS</span><br /><br />
              <div id="interest">
                {interests.map((interest, index) => (
                  <div className="achieve" key={index}>
                    <span><input type="checkbox" className="input-checkbox" /></span>
                    <span contentEditable={true}>{interest.interest}</span>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={addInt}><FaPlusCircle /> Interest</button>
                <button type="button" className="btn btn-danger" onClick={() => remInt(interests.length - 1)}><FaMinusCircle /> Interest</button>
              </div>
            </div>

            <div className="border"></div>
            <div className="rightside">
              <span className="title">PROFILE</span><br /><br />
              <div contentEditable={true}>
                Here you can write the basic information about your career, like your forte, and something about yourself that
                you want your interviewer to know. Try to keep it within 400 characters.
              </div>

              <br /><br /><span className="title">EDUCATION</span><br /><br />
              <div id="education">
                {educations.map((education, index) => (
                  <div className="edublock" key={index}>
                    <span><input type="checkbox" className="input-checkbox" /></span>
                    <span className="education-head" contentEditable={true}>{education.degree}</span>
                    <div><span contentEditable={true}>{education.institute}</span> - <span contentEditable={true}>{education.year}</span></div>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={addEdu}><FaPlusCircle /> Education</button>
                <button type="button" className="btn btn-danger" onClick={() => remEdu(educations.length - 1)}><FaMinusCircle /> Education</button>
              </div>

              <br /><br /><span className="title">NEW SECTIONS</span><br /><br />
              <div id="newsec">
                {sections.map((section, index) => (
                  <div key={index}>
                    <span><input type="checkbox" className="input-checkbox" /></span>
                    <span className="title" contentEditable={true}>{section.title}</span><br /><br />
                    <div contentEditable={true}>{section.description}</div>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={addSec}><FaPlusCircle /> Section</button>
                <button type="button" className="btn btn-danger" onClick={() => remSec(sections.length - 1)}><FaMinusCircle /> Section</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateResume;
