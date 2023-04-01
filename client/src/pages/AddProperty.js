
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../utils/mutations'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const AddProperty = () => {
    const [addProperty, { loading, error }] = useMutation(ADD_PROPERTY);
    const [listening, setListening] = useState(false)

    const [zip, setZip] = useState(null)
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [nightCost, setNightCost] = useState(0);
    const [available, setAvaiable] = useState(true);
    const [isRoom, setIsRoom] = useState(false);
    const [isHouse, setIsHouse] = useState(false);
    const [maxGuests, setMaxGuests] = useState(0);
    const [bedNumber, setBedNumber] = useState(0);
    const [bathNumber, setBathNumber] = useState(0);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        let startDateStr = start?.toLocaleDateString()
        let endDateStr = end?.toLocaleDateString()
        setStartDate(start);
        setEndDate(end);
        setDateStart(startDateStr)
        setDateEnd(endDateStr)
    };


    let user_id = localStorage.getItem('user_id');

    const {
        transcript,
        resetTranscript
    } = useSpeechRecognition();

    const handleImageChange = async (e) => {
        const files = e.target.files;

        try {
            const imageUrls = [];

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);
                formData.append('upload_preset', 'q1s4yqgc'); // replace with your upload preset

                const res = await fetch(
                    'https://api.cloudinary.com/v1_1/dlwwbb8tv/image/upload', // replace with your Cloudinary cloud name
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const data = await res.json();
                imageUrls.push(data.secure_url);
            }

            setImages(imageUrls);
        } catch (err) {
            alert(err)
        }
    };



    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        if (name === 'room') {
            setIsRoom(checked);
            setIsHouse(!checked);
        } else if (name === 'house') {
            setIsHouse(checked);
            setIsRoom(!checked);
        }
    };

    const handleSubmit = async (e) => {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${zip}&key=ff064908668743cb9cc86617dd445847`
        );
        const { lat, lng } = response.data.results[0].geometry;
        setLat(lat)
        setLng(lng)

        addProperty({
            variables: {
                user_id,
                name,
                images,
                night_cost: parseInt(nightCost),
                isAvailable: available,
                room: isRoom,
                house: isHouse,
                max_guests: parseInt(maxGuests),
                bed_number: parseInt(bedNumber),
                bath_number: parseInt(bathNumber),
                location: { coordinates: [parseFloat(lat), parseFloat(lng)] },
                address,
                description,
                startDate: dateStart,
                endDate: dateEnd
            }
        })
            .then((result) => {
                alert("Property Added Successfully")
            })
            .catch((err) => {
                alert(err)
            });
    };

    return (
        <div className='add_property'>
            <h1>Add Property</h1>
            <form className='add_property' onSubmit={(e) => { e.preventDefault() }}>
                <div>

                    <label htmlFor="image">Select Images</label>
                    <input id='image' type='file' multiple onChange={handleImageChange} />

                </div>
                <div>

                    <label htmlFor="name">Name Of Property</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name of Property' />
                </div>
                <div>

                    <label htmlFor="night_Cost">Night Cost</label>
                    <input id='night_Cost' type='number' value={nightCost} onChange={(e) => setNightCost(e.target.value)} placeholder='Enter Night Cost' />
                </div>
                <div>

                    <label htmlFor="date_avail">Available date</label>
                    <select value={available} onChange={(e) => setAvaiable(!available)}>
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>
                <div>

                    <label htmlFor="guests">Max Guests</label>
                    <input id='guests' type='number' value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} placeholder='Enter Maximum Number of Guests' />
                </div>
                <div>

                    <label htmlFor="beds">Number of Bed Rooms</label>
                    <input id='beds' type='number' value={bedNumber} onChange={(e) => setBedNumber(e.target.value)} placeholder='Enter Number of Beds' />
                </div>
                <div>

                    <label htmlFor="baths">Number of Bath Rooms</label>
                    <input id='baths' type='number' value={bathNumber} onChange={(e) => setBathNumber(e.target.value)} placeholder='Enter Number of Bathrooms' />
                </div>
                <div>
                    <label >Select Range of Availability:</label>
                    <div style={{ position: 'relative', zIndex: '11' }}>

                        <DatePicker
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
                <div>

                    <label htmlFor="lat">Enter Zip Code</label>
                    <input type='number' value={zip} onChange={(e) => {
                        setZip(e.target.value)


                    }} placeholder='Enter Zip Code' />

                </div>


                <div>
                    <span>Choose One:</span>
                    <label>
                        <input type='checkbox' name='room' checked={isRoom} onChange={handleCheckboxChange} />
                        Room
                    </label>
                    <label>
                        <input type='checkbox' name='house' checked={isHouse} onChange={handleCheckboxChange} />
                        House
                    </label>
                </div>
                <div>

                    <label htmlFor="address">Enter Address</label>
                    <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' />
                </div>
                <div className='voice_desc'>
                    <textarea placeholder={listening ? "Listening..." : "Click Start to Enter"} onChange={(e) => e.target.value} value={transcript}></textarea>
                    <div>
                        <button onClick={() => {
                            SpeechRecognition.startListening()
                            setListening(true)
                        }}>Start</button>
                        <button onClick={(e) => {
                            SpeechRecognition.stopListening()
                            setDescription(transcript)
                            setListening(false)
                        }}>Stop</button>
                        <button onClick={resetTranscript}>Reset</button>
                    </div>
                </div>
                <button onClick={handleSubmit} type='submit'>Submit</button>
            </form>
        </div>
    );
};
export default AddProperty;