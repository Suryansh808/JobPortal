import React, { useEffect, useState } from 'react';
import axios from 'axios';



const AdminControlMain = () => {

  const [adminControls, setAdminControls] = useState([]);
  useEffect(() => {
    const fetchAdminControls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alldata');
        setAdminControls(response.data);  
      } catch (err) {
        console.error(err); // Log the error for debugging
      } 
    };
    fetchAdminControls();
  }, []);
  const firstAdminControl = adminControls[0];

  const [openSections, setOpenSections] = useState({
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

//logo code start
const [file, setFile] = useState(null);
const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};
const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
};
const handleDeleteLogo = async (id) => { // Accept ID as a parameter
  try {
    const response = await fetch(`http://localhost:5000/api/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    alert('Logo deleted successfully');
    // Call the function to refresh the logo list
  } catch (error) {
    console.error('Error deleting logo:', error);
  }
};
//logo code end

// industries code start
const [formData, setFormData] = useState({
  title: '',
  text: '',
  image: null,
});
const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'image') {
    setFormData({ ...formData, image: e.target.files[0] });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
const handleIndustries = async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('title', formData.title);
  form.append('text', formData.text);
  form.append('image', formData.image);

  try {
    const response = await axios.post('http://localhost:5000/api/insert', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Success:', response.data);
    setFormData({
      title: '',
      text: '',
      image: null,
    })
  } catch (error) {
    console.error('Error:', error);
  }
};
const handleDeleteIndustries = async (industryId) => { // Accept image ID as a parameter
  
  try {
    const response = await fetch(`http://localhost:5000/api/${industryId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    alert('industries deleted successfully');
    // Optionally refresh the slider list or re-fetch the images here
  } catch (error) {
    console.error('Error deleting industries :', error);
  }
};
// industries code ends

//services code start
const [serviceData, setServiceData] = useState({ serviceTitle: '', serviceText: '', serviceImage: null });
const handleServiceChange = (e) => {
  const { name, value , files } = e.target;
  if (name === 'serviceImage') {
    setServiceData({ ...serviceData, serviceImage: files[0] });
  } else {
    setServiceData({ ...serviceData, [name]: value });
  }
};
const handleServiceSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('serviceTitle', serviceData.serviceTitle);
  formData.append('serviceText', serviceData.serviceText);
  formData.append('serviceImage', serviceData.serviceImage);

  try {
    const response = await axios.post('http://localhost:5000/api/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Service added:', response.data);
    setServiceData({ serviceTitle: '', serviceText: '', serviceImage: null }); // Reset form
  } catch (error) {
    console.error('Error adding service:', error.response ? error.response.data : error.message);
  }
};
//services code ends

//product code starts
const [productData, setProductData] = useState({ productTitle: '', productText: '', productImage: null });
const handleProductChange = (e) => {
  const { name, value } = e.target;
  if (name === 'productImage') {
    setProductData({ ...productData, productImage: e.target.files[0] });
  }else{
    setProductData({
      ...productData,
      [name]: value

    })
  }
}
const handleProductSubmit = async (e)=>{
    e.preventDefault();
    const product = new FormData();
    console.log(product);
    product.append('productTitle', productData.productTitle);
    product.append('productText', productData.productText);
    product.append('productImage', productData.productImage);
  
    try {
      const response = await axios.post('http://localhost:5000/api/product', product, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      // Optionally reset the form
      setProductData({ productTitle: '', productText: '', productImage: null });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
}
//product code ends

//mission code start
const [missionText, setMissionText] = useState('');
  const handleMission = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('missionText', missionText);

    try {
      const response = await axios.post('http://localhost:5000/api/mission', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      // Optionally reset the form
      setMissionText('');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
//mission code ends

//vission code starts
const [vissionText, setVissionText] = useState('');
  const handleVission = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('vissionText', vissionText);

    try {
      const response = await axios.post('http://localhost:5000/api/vission', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      // Optionally reset the form
      setVissionText('');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
//vission code ends

//project code starts
const [projectData, setprojectData] = useState({ projectTitle: '', projectText: '', projectImage: null });
const handleProjectChange = (e) => {
  const { name, value } = e.target;
  if (name === 'projectImage') {
    setprojectData({ ...projectData, projectImage: e.target.files[0] });
  }else{
    setprojectData({
      ...projectData,
      [name]: value

    })
  }
}
const handleProjectSubmit = async (e)=>{
  e.preventDefault();
  const project = new FormData();
  console.log(project);
  project.append('projectTitle', projectData.projectTitle);
  project.append('projectText', projectData.projectText);
  project.append('projectImage', projectData.projectImage);

  try {
    const response = await axios.post('http://localhost:5000/api/project', project, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Success:', response.data);
    // Optionally reset the form
    setprojectData({ projectTitle: '', projectText: '', projectImage: null });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
// project code ends

//recent update code starts
const [recentUpdate, setRecentUpdate] = useState({ recentText: '', recentImage: null});
const handleRecentChange =(e)=>{
  const { name, value } = e.target;
  if (name === 'recentImage') {
    setRecentUpdate({ ...recentUpdate, recentImage: e.target.files[0] });
  }else{
    setRecentUpdate({
      ...recentUpdate,
      [name]: value

    })
  }
}
const handleRecentSubmit = async (e)=>{
  e.preventDefault();
  const recent = new FormData();
  recent.append('recentText', recentUpdate.recentText);
  recent.append('recentImage', recentUpdate.recentImage);
  try {
    const response = await axios.post('http://localhost:5000/api/recentupdate', recent, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Success:', response.data);
    // Optionally reset the form
    setRecentUpdate({ recentText: '', recentImage: null});
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }

}
//recent Update code ends

//pressRelease code starts
const [pressRelease, setPressRelease] = useState({ pressText: '', pressImage: null,});
const handlePressChange =(e)=>{
  const { name, value } = e.target;
  if (name === 'pressImage') {
    setPressRelease({ ...pressRelease, pressImage: e.target.files[0] });
    }else{
      setPressRelease({
        ...pressRelease,
        [name]: value
      })
}}
const handlePressSubmit = async (e)=>{
  e.preventDefault();
  const press = new FormData();
  press.append('pressText', pressRelease.pressText);
  press.append('pressImage', pressRelease.pressImage);

  try {
    const response = await axios.post('http://localhost:5000/api/pressRelease', press, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Success:', response.data);
    // Optionally reset the form
    setPressRelease({ pressText: '', pressImage: null,});
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }



}
//pressRelease code ends

//Silder Images code starts
const [sliderImage, setSliderImage] = useState(null);
const handleSliderChange = (e) => {
  setSliderImage(e.target.files[0]);
};
const handleSliderSubmit = async (e) => {
  e.preventDefault();
  const slider = new FormData();
  slider.append('file', sliderImage); // Change 'silderImage' to 'file' to match the server

  try {
    const response = await axios.post('http://localhost:5000/api/uploadSlider', slider, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Success:', response.data);
    setSliderImage("");
    setSliderImage(null); // Reset the state
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};
const handleDeleteSlider = async (index) => { // Accept image ID as a parameter
  
  try {
    const response = await fetch(`http://localhost:5000/api/${index}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    alert('Slider image deleted successfully');
    // Optionally refresh the slider list or re-fetch the images here
  } catch (error) {
    console.error('Error deleting slider image:', error);
  }
};
//slider Imagas code ends








  return (
    <div id="ContMain">
      <h1>Admin Control Main Page</h1>
      <div className="ContForm">
        <div className='update-div' style={{ width: '50%' }} >
          <div className='update1'>
            <h2 onClick={() => toggleSection('logo')}>LOGO MAIN WEBSITE</h2>
            {openSections.logo && (
              <div className='update2'>
                <form onSubmit={handleSubmit}>
                  <input type="file" name="file" onChange={handleFileChange} required />
                  <button  type="submit">Update logo</button>

                </form>
                <table>
  <thead>
    <tr>
      <th>LOGO</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     { firstAdminControl ? (
        <td>
        <img src={`http://localhost:5000/${firstAdminControl.logo}`}  style={{ width: '100px', height: 'auto' }}  alt={firstAdminControl.logo} />
     </td>
      ):(
        <td>NO LOGO</td>
      )
     }
      <td>
        <button onClick={() => handleDeleteLogo(firstAdminControl._id)}>DELETE</button>
      </td>
    </tr>
  </tbody>
</table>

              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('firstSlider')}>First SLIDER IMAGE</h2>
            {openSections.firstSlider && (
              <div className='update2'>
               <form onSubmit={handleSliderSubmit}>
    <input type="file" name="file" onChange={handleSliderChange} required />
    <button type='submit'>INSERT</button>
  </form>
  <table>
  <thead>
    <tr>
      <th>IMAGE</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.slider.map((image, index) => (
      <tr key={index}>
        <td>
          <img 
            src={`http://localhost:5000/${image}`} 
            alt={`Slider Image ${index + 1}`} 
            style={{ width: '100px', height: 'auto' }} // Adjust styles as needed
          />
        </td>
        <td>
          <button onClick={() => handleDeleteSlider(index)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            )}
          </div>

  
          <div className='update1'>
            <h2 onClick={() => toggleSection('industry')}>INDUSTRIES </h2>

            {openSections.industry && (
              <div className='update2'>
                <form onSubmit={handleIndustries}>
                  <input type="file"  name="image"
        onChange={handleChange} required />
                  <input type="text"  name="title" placeholder='Enter Services TITLE' value={formData.title}
        onChange={handleChange} required/>
                  <textarea placeholder='Description' name="text" rows="6"  value={formData.text}
        onChange={handleChange} required></textarea>
                  <button>INSERT</button>
                </form>
                <table>
                <table>
  <thead>
    <tr>
      <th>TITLE</th>
      <th>IMAGE</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.industries.map((industry) => (
      <tr key={industry._id}>
        <td>{industry.title}</td>
        <td>
          <img src={`http://localhost:5000/${industry.image}`} alt={industry.title} style={{ width: '100px' }} />
        </td>
        <td>
          <button onClick={() => handleDeleteIndustries(industry._id)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
                </table>
              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('service')}>SERVICES </h2>
            {openSections.service && (
              <div className='update2'>
                <form onSubmit={handleServiceSubmit}>
                  <input type="file" name='serviceImage' onChange={handleServiceChange} required />
                  <input type="text" name='serviceTitle'  onChange={handleServiceChange}  value={serviceData.serviceTitle} placeholder='Enter Services TITLE' required />
                  <textarea placeholder='Description' name='serviceText'  onChange={handleServiceChange} value={serviceData.serviceText} rows="6" required></textarea>
                  <button type='submit'>INSERT</button>
                </form>
                <table>
  <thead>
    <tr>
      <th>TITLE</th>
      <th>IMAGE</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.services.map((service) => (
      <tr key={service._id}>
        <td>{service.title}</td>
        <td>
          <img src={`http://localhost:5000/${service.image}`} alt={service.title} style={{ width: '100px' }} />
        </td>
        <td>
          <button onClick={() => handleDelete(service._id)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('product')}>PRODUCT </h2>

            {openSections.product && (
              <div className='update2'>
                <form onSubmit={handleProductSubmit}>
                  <input type="file" name='productImage' onChange={handleProductChange} required />
                  <input type="text" name='productTitle' value={productData.productTitle} onChange={handleProductChange}  placeholder='Enter Services TITLE' required />
                  <textarea placeholder='Description' name='productText' value={productData.productText} onChange={handleProductChange} rows="6" required></textarea>
                  <button type='submit'>INSERT</button>
                </form>
                <table>
  <thead>
    <tr>
      <th>TITLE</th>
      <th>IMAGE</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.products.map((product) => (
      <tr key={product._id}>
        <td>{product.title}</td>
        <td>
          <img src={`http://localhost:5000/${product.image}`} alt={product.title} style={{ width: '100px' }} />
        </td>
        <td>
          <button onClick={() => handleDelete(product._id)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
              </div>
            )}
          </div>


          <div className='update1'>
            <h2 onClick={() => toggleSection('mission')}>OUR MISSION </h2>

            {openSections.mission && (
              <div className='update2'>
                <form onSubmit={handleMission}>
            
                  <textarea placeholder='Description' name='missionText' value={missionText} onChange={(e)=> setMissionText(e.target.value)} rows="6" required></textarea>
                  <button type='submit'>UPDATE</button>
                </form>
                   <div>
                    <h3>Our Mission</h3>
                    <p>{firstAdminControl?.missionVision?.mission}</p>
                   </div>
              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('vission')}>OUR VISSION </h2>

            {openSections.vission && (
              <div className='update2'>
                <form onSubmit={handleVission}>
                  <textarea placeholder='Description' value={vissionText} onChange={(e)=> setVissionText(e.target.value)} rows="6" required></textarea>
                  <button>UPDATE</button>
                </form>
                <div>
                  <h3>Our Vission</h3>
                  <p>{firstAdminControl?.missionVision?.vision}</p>
                </div>
              </div>
            )}
          </div>



          <div className='update1'>
            <h2 onClick={() => toggleSection('project')}>PROJECT </h2>

            {openSections.project && (
              <div className='update2'>
                <form onSubmit={handleProjectSubmit}>
                  <input type="file" name='projectImage' onChange={handleProjectChange} required />
                  <input type="text" name='projectTitle' value={projectData.projectTitle}  onChange={handleProjectChange} placeholder='Enter Services TITLE' required />
                  <textarea placeholder='Description' name='projectText' value={projectData.projectText}  onChange={handleProjectChange} rows="6" required></textarea>
                  <button type='submit'>INSERT</button>
                </form>
                <table>
  <thead>
    <tr>
      <th>TITLE</th>
      <th>IMAGE</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.projects.map((project) => (
      <tr key={project._id}>
        <td>{project.title}</td>
        <td>
          <img src={`http://localhost:5000/${project.image}`} alt={project.title} style={{ width: '100px' }} />
        </td>
        <td>
          <button onClick={() => handleDelete(project._id)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            )}
            
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('recent_update')}>RECENT UPDATE </h2>

            {openSections.recent_update && (
              <div className='update2'>
                <form onSubmit={handleRecentSubmit}>
                  <input type="file" name='recentImage' onChange={handleRecentChange} required />
                  <textarea placeholder='Description' name='recentText' value={recentUpdate.recentText} onChange={handleRecentChange} rows="6" required></textarea>
                  <button type='submit'>INSERT</button>
                </form>
                <table>
  <thead>
    <tr>
      <th>IMAGE</th>
      <th>TEXT</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.recentUpdate.map((update) => (
      <tr key={update._id}>
        <td>
          <img src={`http://localhost:5000/${update.image}`} alt="Update" style={{ width: '100px' }} />
        </td>
        <td>{update.text}</td>
        <td>
          <button onClick={() => handleDelete(update._id)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('press')}>PRESS RELEASE </h2>

            {openSections.press && (
              <div className='update2'>
                <form onSubmit={handlePressSubmit}>
                 
                  <input type="file"  name='pressImage' onChange={handlePressChange} required />

                  <textarea placeholder='Description' name='pressText' onChange={handlePressChange} value={pressRelease.pressText}  rows="6" required></textarea>
                  <button>INSERT</button>
                </form>
                <table>
  <thead>
    <tr>
      <th>IMAGE</th>
      <th>TEXT</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {firstAdminControl?.pressReleases.map((release) => (
      <tr key={release._id}>
        <td>
          <img src={`http://localhost:5000/${release.image}`} alt="Press Release" style={{ width: '100px' }} />
        </td>
        <td>{release.text}</td>
        <td>
          <button onClick={() => handleDelete(release._id)}>DELETE</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            )}
          </div>



        </div>
        <div style={{ width: '50%' }}>
          <iframe src="http://localhost:5173" frameBorder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>
  );
};

export default AdminControlMain;