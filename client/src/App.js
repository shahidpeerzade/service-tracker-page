import React from 'react';
import TrackingMap from './components/TrackingMap'; // Adjust the path as needed

const mockData = {
  orderNumber: '12345',
  time: '12:30 PM',
  estimateTime: '30 mins',
  location: {
    city: 'New Delhi',
    address: 'Connaught Place, New Delhi',
  },
  pickupAddress: '123, Main Street, New Delhi',
  deliveryAddress: '456, Park Avenue, New Delhi',
  serviceMan: {
    name: 'John Doe',
    role: 'Delivery Boy',
    phone: '1234567890',
  },
};

const App = () => {
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual Google Maps API key

  return (
    <div className="App">
      <TrackingMap mockData={mockData} googleMapsApiKey={googleMapsApiKey} />
    </div>
  );
};

export default App;
