import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for error messages
import ApiServices from "../Services/ApiServices";

const ReactSelect = () => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [alldestination, setAllDestination] = useState([]);
    const [destinationId, setDestinationId] = useState("");

    useEffect(() => {
        window.scroll(0, 0);
        ApiServices.alldestination()
            .then((res) => {
                if (res.data.success) {
                    setAllDestination(res.data.data);
                    console.log('Fetched destinations:', res.data.data);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [destinationId]);

    const destinationOptions = alldestination.map(destination => ({
        value: destination.id,
        label: destination.name
    }));

    console.log('Destination options:', destinationOptions);

    return (
        <Fragment>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={destinationOptions[0] || null}
               
                isClearable={isClearable}
               
                isSearchable={isSearchable}
                name="destination"
                options={destinationOptions}
                onChange={selectedOption => setDestinationId(selectedOption ? selectedOption.value : "")}
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 12,
                    fontStyle: 'italic',
                    marginTop: '1em',
                }}
            >
                
            </div>
        </Fragment>
    );
};

export default ReactSelect;
