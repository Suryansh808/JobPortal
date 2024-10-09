const AdminProfile = () => {
  
  return (
    <div id="AdminProfile">
      <div className="first">
        <div className="first-div">
        <h2>TOTAL</h2>
          <div className="detail">
            <span>005</span> <h2>POSTED JOB</h2>
          </div>
          <div className="detail">
            <span style={{ backgroundColor: 'white',color:'black' }}>005</span><h2>APPLICANT</h2>
          </div>
         
        </div>
        <div className="first-div">
          <h2>JOB</h2>
          <div className="detail">
            <span>005</span> <h2>EXPIRED JOB</h2>
          </div>
          <div className="detail">
            <span style={{ backgroundColor: 'white',color:'black' }}>005</span><h2>ACTIVE JOB</h2>
          </div>

        </div>

        <div className="first-div">
          <h2>APPLICANT</h2>
          <div className="detail">
            <span>005</span> <h2>UNDER REVIEW</h2>
          </div>
          <div className="detail" >
            <span style={{ backgroundColor: 'white',color:'black' }}>005</span><h2>HIRED</h2>
          </div>
        </div>
      </div>
      <div className="second">

        <div class="card">
  <div class="card-inner">
    <div class="card-front">
      
      <p>HIRING PARTNER <br /> 005</p>

    </div>
    <div class="card-back">
      <p>Back Side</p>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-inner">
    <div class="card-front">
      <p>TOTAL USER <br /> 004</p>
    </div>
    <div class="card-back">
      <p>Back Side</p>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-inner">
    <div class="card-front">
      <p>HR MANAGER  <br /> 003</p>

    </div>
    <div class="card-back">
      <p>Back Side</p>
    </div>
  </div>
</div>
        
      </div>
      
      
    </div>
  );
};
export default AdminProfile;
