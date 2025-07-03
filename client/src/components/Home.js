import React from 'react';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: "url('https://wallpaperaccess.com/full/958470.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  };

  const blurOverlayStyleLeft = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backdropFilter: 'blur(4px)', // Adjust blur amount as needed
  };

  const contentStyle = {
    // zIndex: 1,
    position: 'absolute',
    top: '50%',
    left: '48%', // Center horizontally
    transform: 'translate(-50%, -50%)',
    color: '#333', // Darker color for better visibility
    fontFamily: 'Roboto, sans-serif',
    maxWidth: '900px', // Limiting width of homepage-content
  };

  const homepageContentStyle = {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.22)', // Slightly transparent background
    borderRadius: '10px',
    backdropFilter: 'blur(20px)',
    color: '#333', // Darker color for better visibility
  };

  return (
    <div style={backgroundStyle}>
      <div style={blurOverlayStyleLeft}></div>
      <div style={contentStyle}>
        <div>
          <div className="homepage-content border rounded-xl bg-transparent p-4 rounded" style={homepageContentStyle}>
            <h1 className='display-4 text-white'>Welcome to Saanjh Elderly Care</h1>
            <p className='lead' style={{color:'white'}}>Providing the best care for the elderly.</p>
            <p className='text-white'>Our application helps in tracking health records and predicting disease risks, ensuring a healthier and happier life for the elderly.</p>
            <div className="features mt-4">
              {/* <h2 className="text-primary">Key Features:</h2>
              <ul className="feature-list">
                <li>
                  <i className="fas fa-notes-medical text-primary"></i>
                  <span>Track health records of the elderly</span>
                </li>
                <li>
                  <i className="fas fa-heartbeat text-primary"></i>
                  <span>Perform clinical decision support</span>
                </li>
                <li>
                  <i className="fas fa-stethoscope text-primary"></i>
                  <span>Predict disease risks</span>
                </li> */}
              {/* </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
