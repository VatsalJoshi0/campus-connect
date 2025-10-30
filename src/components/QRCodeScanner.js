import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';

const QRCodeScanner = ({ onClose }) => {
  const { user } = useAuth();
  const { exchangeQRContact } = useNetworking();
  const [showMyQR, setShowMyQR] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const fileInputRef = useRef(null);

  // Generate QR code data for the user
  const generateQRData = () => {
    return JSON.stringify({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      field: user?.field,
      skills: user?.skills,
      interests: user?.interests,
      type: 'campus_connect_contact'
    });
  };

  // Mock QR code generation (in real app, use a QR library like qrcode)
  const generateQRCodeURL = (data) => {
    // This would normally use a QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Mock QR code scanning (in real app, use a QR scanner library)
      const mockScannedData = {
        id: Date.now(),
        name: 'John Doe',
        email: 'john.doe@college.edu',
        phone: '+91 98765 43210',
        field: 'Computer Science',
        skills: ['React', 'Node.js', 'Python'],
        interests: ['Web Development', 'AI/ML'],
        type: 'campus_connect_contact'
      };
      
      setScannedData(mockScannedData);
      exchangeQRContact(mockScannedData);
    }
  };

  const handleConnect = () => {
    if (scannedData) {
      // Add to connections
      console.log('Adding to connections:', scannedData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-custom-text">QR Connect</h2>
          <button
            onClick={onClose}
            className="text-custom-text-secondary hover:text-custom-text"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-1 bg-custom-bg p-1 rounded-lg mb-6">
          <button
            onClick={() => setShowMyQR(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              showMyQR
                ? 'bg-custom-teal text-black'
                : 'text-custom-text-secondary hover:text-custom-text'
            }`}
          >
            My QR Code
          </button>
          <button
            onClick={() => setShowMyQR(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !showMyQR
                ? 'bg-custom-teal text-black'
                : 'text-custom-text-secondary hover:text-custom-text'
            }`}
          >
            Scan QR Code
          </button>
        </div>

        {showMyQR ? (
          /* My QR Code */
          <div className="text-center">
            <div className="bg-custom-bg p-4 rounded-lg mb-4 inline-block">
              <img
                src={generateQRCodeURL(generateQRData())}
                alt="My QR Code"
                className="w-48 h-48"
              />
            </div>
            <h3 className="text-lg font-semibold text-custom-text mb-2">
              {user?.name}
            </h3>
            <p className="text-custom-text-secondary text-sm mb-4">
              {user?.field} • {user?.email}
            </p>
            <p className="text-custom-text-secondary text-xs">
              Show this QR code to others to instantly share your contact information
            </p>
          </div>
        ) : (
          /* Scan QR Code */
          <div>
            {scannedData ? (
              /* Scanned Contact */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {scannedData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-custom-text mb-2">
                  {scannedData.name}
                </h3>
                <p className="text-custom-text-secondary text-sm mb-4">
                  {scannedData.field}
                </p>
                
                <div className="bg-custom-bg p-4 rounded-lg mb-4 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="material-icons text-sm text-custom-text-secondary">email</span>
                      <span className="text-custom-text text-sm">{scannedData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="material-icons text-sm text-custom-text-secondary">phone</span>
                      <span className="text-custom-text text-sm">{scannedData.phone}</span>
                    </div>
                  </div>
                  
                  {scannedData.skills && scannedData.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-custom-text-secondary text-xs mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {scannedData.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleConnect}
                    className="flex-1 bg-custom-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Add to Connections
                  </button>
                  <button
                    onClick={() => setScannedData(null)}
                    className="bg-custom-bg border border-custom-border text-custom-text py-2 px-4 rounded-lg hover:bg-custom-bg-2 transition duration-300"
                  >
                    Scan Again
                  </button>
                </div>
              </div>
            ) : (
              /* Scanner Interface */
              <div className="text-center">
                <div className="bg-custom-bg border-2 border-dashed border-custom-border rounded-lg p-8 mb-4">
                  <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
                    qr_code_scanner
                  </span>
                  <h3 className="text-lg font-semibold text-custom-text mb-2">
                    Scan QR Code
                  </h3>
                  <p className="text-custom-text-secondary text-sm mb-4">
                    Point your camera at a QR code or upload an image
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-custom-blue text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Upload QR Image
                    </button>
                    
                    <div className="text-custom-text-secondary text-xs">
                      Camera scanning coming soon
                    </div>
                  </div>
                </div>
                
                <div className="bg-custom-teal bg-opacity-20 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <span className="material-icons text-custom-teal text-sm mt-0.5">info</span>
                    <div className="text-left">
                      <h4 className="font-medium text-custom-text text-sm">Quick Connect</h4>
                      <p className="text-custom-text-secondary text-xs">
                        Scan someone's Campus Connect QR code to instantly exchange contact information and connect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner;
