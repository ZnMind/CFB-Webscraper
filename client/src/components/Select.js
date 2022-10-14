import React, { useState } from 'react';
import Select from 'react-select';
import Scraper from './Scraper';

const options = [
    { value: "Week 1", label: "Week 1" },
    { value: "Week 2", label: "Week 2" },
    { value: "Week 3", label: "Week 3" },
    { value: "Week 4", label: "Week 4" },
    { value: "Week 5", label: "Week 5" },
    { value: "Week 6", label: "Week 6" },
    /* { value: "Week 7", label: "Week 7" },
    { value: "Week 8", label: "Week 8" },
    { value: "Week 9", label: "Week 9" },
    { value: "Week 10", label: "Week 10" },
    { value: "Week 11", label: "Week 11" },
    { value: "Week 12", label: "Week 12" } */
]

const MyComponent = () => {
    const [split, setSplit] = useState(options[0].value);
    const [url, setUrl] = useState(`https://www.espn.com/college-football/schedule/_/week/1/year/2022/seasontype/2`)

    const handleSplit = event => {
        setSplit(event.value);
        setUrl(`https://www.espn.com/college-football/schedule/_/week/${event.value.split(' ')[1]}/year/2022/seasontype/2`)
    }

    return (
        <div>
            <Select
                defaultValue={options[0]}
                onChange={handleSplit}
                name='split'
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                />
            <a href={url} target="_blank" rel='noreferrer'>{`Schedule`}</a>
            
            <Scraper 
                split={split}
                url={url}
            />
        </div>
    )
}

export default MyComponent;