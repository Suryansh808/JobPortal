import React, { useState } from 'react';

const AdminControlMain = () => {
  const [openSections, setOpenSections] = useState({
    logo: false,
    firstSlider: false,
    secondSlider: false,
    thirdSlider: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };



  return (
    <div id="ContMain">
      <h1>Admin Control Main Page</h1>
      <div className="ContForm">
        <div className='update-div' style={{ width: '50%' }} >
          <div className='update1'>
            <h2 onClick={() => toggleSection('logo')}>LOGO MAIN WEBSITE</h2>
            {openSections.logo && (
              <div className='update2'>
                <form>
                  <input type="file" name="file" required />
                  <button >Update</button>

                </form>
                <table>
                  <tr>
                    <td><img src="" alt="Your logo" /></td>
                    <td><button>Delete</button></td>
                  </tr>
                </table>
              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('firstSlider')}>First SLIDER IMAGE</h2>
            {openSections.firstSlider && (
              <div className='update2'>
                <form action="">
                  <input type="file" name="file" required />
                  <button>INSERT</button>
                </form>
                <table>
                  <tr>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                  </tr>
                  <tr>
                    <td><img src='' alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                  <tr>
                    <td><img src='' alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                  <tr>
                    <td><img src='' alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                </table>
              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('secondSlider')}>SECOND SLIDER SERVICES </h2>

            {openSections.secondSlider && (
              <div className='update2'>
                <form action="">
                  <input type="text" placeholder='Enter Services TITLE' required />
                  <input type="file" required />
                  <button>INSERT</button>
                  <textarea placeholder='Description' rows="6" required></textarea>
                </form>
                <table>
                  <tr>
                    <th>TITLE</th>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                  </tr>
                  <tr>
                    <td>One</td>
                    <td><img src="" alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                  <tr>
                    <td>two</td>
                    <td><img src="" alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                  <tr>
                    <td>three</td>
                    <td><img src="" alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>

                  
                </table>
              </div>
            )}
          </div>

          <div className='update1'>
            <h2 onClick={() => toggleSection('thirdSlider')}>THIRD SLIDER PROJECT </h2>

            {openSections.thirdSlider && (
              <div className='update2'>
                <form action="">
                  <input type="text" placeholder='Enter Services TITLE' required />
                  <input type="file" required />
                  <button>INSERT</button>
                  <textarea placeholder='Description' rows="6" required></textarea>
                </form>
                <table>
                  <tr>
                    <th>TITLE</th>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                  </tr>
                  <tr>
                    <td>One</td>
                    <td><img src="" alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                  <tr>
                    <td>two</td>
                    <td><img src="" alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
                  <tr>
                    <td>three</td>
                    <td><img src="" alt="img" /></td>
                    <td><button>DELETE</button></td>
                  </tr>
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