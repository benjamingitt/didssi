import {DID_URL_PREFIX} from '../static';

export const didToFront = (did) => {
    return `${DID_URL_PREFIX}${did}`;
};

export const didToBack = (did) => `${did}`;

export const getServiceProsList = (pros) => pros ? pros.split(' \n') : [];

export const formatDate = (date) => {
    const addZero = (val) => {
        return `0${val}`.slice(-2);
    };

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const downloadVcTemplate = (title: string, data) => {
    const a = document.createElement('a');
    const blob = new Blob([data], {type: 'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = title;
    a.click();
};

export const stringMiddleCompress = (string: string, length: number, prefixLength = 0) => {
    if (string.length < length + prefixLength) {
        return string;
    }

    const numberOfParts = 2;
    const partLength = Math.floor(length / numberOfParts);

    const prefix = string.substr(0, prefixLength);
    const mainString = string.slice(prefixLength);

    const firstPart = mainString.substr(0, partLength);
    const secondPart = mainString.substr(-partLength, partLength);

    return `${prefix}${firstPart}...${secondPart}`;
};
