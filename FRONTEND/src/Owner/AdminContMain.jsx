// const AdminControlMain = () => {
  
//     return (
//       <div id="ContMain">
//         <h1>Admin Control Main page</h1>
//         <div className="ContForm">
//         <label for="myfile">Logo M :</label>
//         <input type="file" id="myfile" name="myfile" accept="image/*"/> <br />
//         <label for="myfile">Image 1 :</label>
//         <input type="file" id="myfile" name="myfile"/> <br />
//         <label for="myfile">Image 2 :</label>
//         <input type="file" id="myfile" name="myfile"/> <br />
//         <label for="myfile">Image 3 :</label>
//         <input type="file" id="myfile" name="myfile"/> <br />
//         <label for="myfile">Image 3 :</label>
//         <textarea name="" id=""></textarea>
//         </div>
//         <iframe src="http://localhost:5173" frameborder="0" width="700px" height="400px"></iframe>

//       </div>
//     );
//   };
//   export default AdminControlMain;
  

import React, { useState } from 'react';

const AdminControlMain = () => {
  const [images, setImages] = useState({
    logo: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages({
        ...images,
        [key]: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div id="ContMain">
      <h1>Admin Control Main Page</h1>
      <div className="ContForm">
        <label htmlFor="logo">Logo M:</label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'logo')}
        />
        {images.logo && <img src={images.logo} alt="Logo" width="100" />}

        <br />

        <label htmlFor="image1">Image 1:</label>
        <input
          type="file"
          id="image1"
          onChange={(e) => handleFileChange(e, 'image1')}
        />
        {images.image1 && <img src={images.image1} alt="Image 1" width="100" />}

        <br />

        <label htmlFor="image2">Image 2:</label>
        <input
          type="file"
          id="image2"
          onChange={(e) => handleFileChange(e, 'image2')}
        />
        {images.image2 && <img src={images.image2} alt="Image 2" width="100" />}

        <br />

        <label htmlFor="image3">Image 3:</label>
        <input
          type="file"
          id="image3"
          onChange={(e) => handleFileChange(e, 'image3')}
        />
        {images.image3 && <img src={images.image3} alt="Image 3" width="100" />}

        <br />

        <label htmlFor="description">Description:</label>
        <textarea id="description"></textarea>
      </div>

      <iframe src="http://localhost:5173" frameBorder="0" width="700px" height="400px"></iframe>
    </div>
  );
};

export default AdminControlMain;