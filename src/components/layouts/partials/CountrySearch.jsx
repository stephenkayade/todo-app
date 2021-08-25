import React, { useEffect, useState } from 'react';
import DropSelect from './DropSelect';


const CountrySearch = ({ options, defaultValue, selected }) => {
    

    const getOptions = () => {
        return options;
    }
    
    const getDefault = () => {
        if(defaultValue && typeof(defaultValue)  === 'object') {
            // const index = options ? options().findIndex((x) => x.value === defaultValue.id)
            return defaultValue
        }else if (defaultValue && typeof(defaultValue) === 'number') {
            return options ? options()[defaultValue] : null
        }
    }

    const onSelectChange = (val) => {
        selected(val)

    }
    return(
        <>
            <DropSelect 
                options={options}
                onChange={(item) => onSelectChange(item)}
                defaultValue={getDefault()}
                optionDisplayImage={true}
                optionDisplayLabel={true}
                optionDisplayLeft={true}
                controlDisplayImage={true}
                controlDisplayLabel={false}
                controlDisplayLeft={true}
            />
        </>
    )
}

export default CountrySearch;