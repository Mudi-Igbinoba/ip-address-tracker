import React, { useState, useEffect } from 'react';
import './tracker.css';
import arrow from '../assets/images/icon-arrow.svg';
import location from '../assets/images/icon-location.svg';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Tracker = () => {
    // Api Key
    const apiKey = 'apiKey=at_5ae7x6PnXYNqbAWuHipchylyk0x5R';

    // API Url
    const url = `https://geo.ipify.org/api/v2/country,city?${apiKey}&ipAddress=`;

    // IP address input
    const [ipAddress, setIpAddress] = useState('');

    // triggers fetch function on form submit
    const [getDetails, setGetDetails] = useState(false);

    // data gotten from location api os saved here
    const [locationData, setLocationData] = useState({});

    // coordinates array for displaying map
    const coords = [
        locationData.location ? locationData.location.lat : 51.505,
        locationData.location ? locationData.location.lng : -0.09,
    ];

    // function for validating ip address
    function validateIPaddress(ipaddress) {
        if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                ipaddress
            )
        ) {
            return true;
        }
        return false;
    }

    // use effect for fetching location data based on the ip address
    useEffect(() => {
        if (ipAddress === '' && !getDetails) {
            fetch(url)
                .then((res) => res.json())
                .then((data) => setLocationData(data));
        } else if (getDetails) {
            setGetDetails(false);
            if (validateIPaddress(ipAddress)) {
                fetch(url + ipAddress)
                    .then((res) => res.json())
                    .then((data) => setLocationData(data));
            } else {
                alert('You have entered an invalid IP address!');
            }
        }
    }, [ipAddress, getDetails]);

    // creating custom marker for map
    const locationIcon = L.icon({
        iconUrl: location,
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    });

    // main app
    return (
        <main>
            <section id='hero'>
                <div className='container'>
                    <h2>IP Address Tracker</h2>
                    {/* form for collection ip address */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setGetDetails(true);
                        }}
                        className='tracker-form'>
                        <input
                            type='text'
                            placeholder='Search for any IP address or domain'
                            name='ipAddress'
                            value={ipAddress}
                            onChange={(e) => {
                                setIpAddress(e.target.value);
                            }}
                        />
                        <button>
                            <img src={arrow} alt='Arrow Icon' />
                        </button>
                    </form>

                    {/* Location Details Section */}
                    <div className='details'>
                        <div className='address'>
                            <p>IP Address</p>
                            <h3>{locationData.ip || '---'}</h3>
                        </div>

                        <div className='line'></div>

                        <div className='location'>
                            <p>Location</p>
                            <h3>
                                {locationData.location
                                    ? `${locationData.location.city}, ${locationData.location.region},  ${locationData.location.country} ${locationData.location.postalCode}`
                                    : '---'}
                            </h3>
                        </div>

                        <div className='line'></div>

                        <div className='timezone'>
                            <p>Timezone</p>
                            <h3>
                                UTC{' '}
                                {locationData.location
                                    ? locationData.location.timezone
                                    : '---'}
                            </h3>
                        </div>

                        <div className='line'></div>

                        <div className='isp'>
                            <p> ISP</p>
                            <h3>{locationData.isp || '---'}</h3>
                        </div>
                    </div>
                </div>
            </section>
            {/* Map Section */}
            <section>
                <MapContainer
                    id='map'
                    key={JSON.stringify(coords)} // allows the map to be updated
                    center={coords}
                    zoom={15}
                    scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker
                        position={coords}
                        icon={locationIcon} // displays the custom marker icon
                    ></Marker>
                </MapContainer>
            </section>
        </main>
    );
};

export default Tracker;
