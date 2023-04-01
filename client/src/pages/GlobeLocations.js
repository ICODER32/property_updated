import React from 'react'
import { Navbar } from '../components'
import Globe from 'react-globe.gl';
import { GET_PROPERTIES_LOC } from '../utils/mutations';
import { useQuery, } from '@apollo/client';



const GlobeLocations = () => {

    const { data } = useQuery(GET_PROPERTIES_LOC);


    function convertCoordinates(array) {
        return array?.map(obj => ({
            lat: obj.location.coordinates[0],
            lng: obj.location.coordinates[1],
            size: 0.2,
            color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
            text: "Property"
        }));
    }

    const myPoints = convertCoordinates(data?.properties)


    return (
        <>
            <Navbar />
            <div className='globe_container'>
                <Globe width={800} height={800}
                    pointsData={myPoints}
                    animateIn={true}
                    showGlobe={true}
                    backgroundColor='rgba(255,255,255,0.0001)'
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    pointAltitude="size"
                    pointColor="color"
                    labelText="text"
                    labelLabel="text"


                />
            </div>
        </>
    )
}

export default GlobeLocations