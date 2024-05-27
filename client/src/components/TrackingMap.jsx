import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import socketIOClient from 'socket.io-client';
import 'tailwindcss/tailwind.css'; // Ensure TailwindCSS is imported

const deliveryIcon = {
  url: 'https://cdn-icons-png.flaticon.com/512/846/846449.png',
  scaledSize: new window.google.maps.Size(32, 32),
  anchor: new window.google.maps.Point(16, 32),
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const TrackingMap = ({ mockData, googleMapsApiKey }) => {
  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.209 });
  const [route, setRoute] = useState([
    { lat: 28.6139, lng: 77.209 },
    { lat: 28.5355, lng: 77.391 },
  ]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000'); // Replace with your actual backend URL

    socket.on('locationUpdate', (newPosition) => {
      setPosition(newPosition);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="tracking-map-container flex justify-center items-center h-screen bg-gray-100">
      <div className="relative h-full w-full max-w-screen-sm mx-auto md:h-[700px] md:w-[375px] md:rounded-lg overflow-hidden bg-white shadow-lg">
        {/* Map as full screen background */}
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={13}
            options={{ disableDefaultUI: true, zoomControl: true }}
            onLoad={(map) => {
              map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(
                document.querySelector('.gm-zoom-controls')
              );
            }}
          >
            <Marker position={position} icon={deliveryIcon} />
            <Polyline path={route} options={{ strokeColor: 'red' }} />
          </GoogleMap>
        </LoadScript>

        {/* Apply a dark overlay to the map for better visibility */}
        <div className="absolute inset-0 bg-black opacity-30 z-0 pointer-events-none"></div>

        {/* Top section for back icon and order number */}
        <div className="absolute top-0 left-0 right-0 z-10 p-2 flex flex-col items-center bg-white bg-opacity-90 shadow-md rounded-b-lg">
          <div className="w-full flex justify-between items-center mb-2">
            <img src="https://icon-library.com/images/back-arrow-icon-png/back-arrow-icon-png-1.jpg" alt="Back" className="w-6 h-6" />
            <h1 className="text-lg font-bold">{mockData.orderNumber}</h1>
            <div></div> {/* Empty div to balance flex space */}
          </div>

          {/* New small card for pickup and delivery addresses */}
          <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-2 w-full mb-2">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <label className="mr-2 font-bold">From:</label>
                <input type="text" value={mockData.pickupAddress} readOnly className="flex-grow p-1 border rounded-md" />
              </div>
              <hr className="my-2" />
              <div className="flex items-center">
                <label className="mr-2 font-bold">To:</label>
                <input type="text" value={mockData.deliveryAddress} readOnly className="flex-grow p-1 border rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-3">
            {/* Top section of the card */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="https://static.vecteezy.com/system/resources/previews/009/342/688/original/clock-icon-clipart-design-illustration-free-png.png" alt="Clock" className="w-5 h-5 rounded-full mr-2" />
                <div>
                  <p className="text-sm font-bold">{mockData.time}</p>
                  <p className="text-xs text-gray-500">{mockData.estimateTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/128/2102/2102096.png" alt="Location" className="w-5 h-5 rounded-full mr-2" />
                <div>
                  <p className="text-sm font-bold">{mockData.location.city}</p>
                  <p className="text-xs text-gray-500">{mockData.location.address}</p>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            {/* Bottom section of the card */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Service Man" className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <p className="text-sm font-bold">{mockData.serviceMan.name}</p>
                  <p className="text-xs text-gray-500">{mockData.serviceMan.role}</p>
                </div>
              </div>
              <a href={`tel:${mockData.serviceMan.phone}`} className="flex items-center bg-blue-500 text-white px-4 py-1 rounded-lg shadow text-xs">
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
