import React, { useEffect, useRef, useState } from 'react';
import { Input } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { isNotValidNumber } from "../../utils/utilsFunctions";

const extractDataFromPlace = (place) => {
    if (!place.geometry || !place.geometry.location) {
        return undefined;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    if (isNotValidNumber(lat) || isNotValidNumber(lng)) {
        return undefined;
    }
    return {
        addressName: place.name || '',
        location: [lat, lng]
    };
}

/**
 * A react wrapper component to use Google places autocomplete api.
 * https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/places-autocomplete
 * @param {Object} props Props for the route.
 * @returns {React.Component}
 */
const AutoComplete = (props) => {
    const { t } = useTranslation('add-edit-farm');
    const placesInput = useRef();
    const { placeChangeHandler, fields } = props;
    const [values, setValues] = useState({
        address: props.address || ''
    });
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
    };
    /**
     * Method to configure and setup autocomplete input element after component load.
     * @returns {void}
     */
    const configureAutoComplete = () => {
        if (!window.google) {
            throw new Error('Places API is not loaded.');
        }
        const autocomplete = new window.google.maps.places.Autocomplete(placesInput.current.inputRef.current);
        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(fields);
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            const data = extractDataFromPlace(place);
            if (data) {
                handleChange('address', data.addressName);
            }
            placeChangeHandler(data);
        });
    };
    useEffect(() => {
        configureAutoComplete(placeChangeHandler);
        if (props.address !== values.address) {
            handleChange('address', props.address);
        }
    }, [props.address]);
    return (<Input fluid ref={placesInput}
        placeholder={t('address-placeholder')}
        value={values.address || ''}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        name="address"></Input>);
}
// Specifies the default values for props
AutoComplete.defaultProps = {
    fields: ['geometry', 'name']
};

export default AutoComplete;
