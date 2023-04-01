import React, { useEffect, useState } from 'react'
import { GET_PROPERTIES } from '../utils/mutations';
import { useQuery } from '@apollo/client'
import { PropertyCard } from '../components';



const Properties = () => {
    const [properties, setProperties] = useState([])



    const { data } = useQuery(GET_PROPERTIES);
    const isInRange = data?.properties.startDate && data?.properties.endDate && data?.properties.startDate <= new Date() && data?.properties.endDate >= new Date();

    useEffect(() => {
        setProperties(data?.properties)
    }, [data])
    return (
        <div className='card_container'>
            {
                properties?.map(item => {
                    return (
                        <>
                            <PropertyCard key={item._id} startDate={item.startDate} endDate={item.endDate} available={item.isAvailable} id={item._id} description={item.description} name={item.name} price={item.night_cost} images={item.images} />
                        </>
                    )
                })
            }
        </div>
    )
}

export default Properties