import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [fontColor, setFontColor] = useState('white');
  const [fontSize, setFontSize] = useState('large');
  const [backgroundImage, setBackgroundImage] = useState('assets/gintoki.jpg');
  const [useCustomBg, setUseCustomBg] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function formatTime() {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let meridiem = '';

    if (!is24Hour) {
      meridiem = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}${!is24Hour ? ' ' + meridiem : ''}`;
  }

  function padZero(number) {
    return number < 10 ? '0' + number : number;
  }

  const clockStyle = {
    color: fontColor,
    fontSize: fontSize === 'small' ? '3rem' : fontSize === 'medium' ? '5rem' : '6rem',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textShadow: '3px 3px 5px black',
    textAlign: 'center',
  };

  // Background div style — fills entire viewport, behind content
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    zIndex: -1,
  };

  // Content container style — sits on top of background
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    margin: 0,
    flexDirection: 'column',
  };

  return (
    <>
      {/* Background image div */}
      <div style={backgroundStyle} />

      {/* Content container */}
      <div style={contentStyle}>
        <div className="config-wrapper">
          <button className="configure-btn" onClick={() => setShowConfig(!showConfig)}>
            ⚙️
          </button>

          {showConfig && (
            <div className="config-menu">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={is24Hour}
                  onChange={(e) => setIs24Hour(e.target.checked)}
                />
                <span>Use 24h Format</span>
              </label>

              <label>
                Font Color:
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </label>

              <label>
                Font Size:
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </label>

              <label>
                Background:
                <select
                  value={useCustomBg ? 'custom' : 'gintoki'}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'gintoki') {
                      setBackgroundImage('assets/gintoki.jpg');
                      setUseCustomBg(false);
                    } else {
                      setBackgroundImage('');
                      setUseCustomBg(true);
                    }
                  }}
                >
                  <option value="gintoki">Default (Gintoki)</option>
                  <option value="custom">Enter Image URL</option>
                </select>
              </label>

              {useCustomBg && (
                <label>
                  Image URL:
                  <input
                    type="text"
                    value={backgroundImage}
                    onChange={(e) => setBackgroundImage(e.target.value)}
                    placeholder="Enter image URL"
                  />
                </label>
              )}
            </div>
          )}
        </div>

        <div className="clock-container">
          <div className="clock" style={clockStyle}>
            <span>{formatTime()}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DigitalClock;
