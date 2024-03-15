import CryptoJS from 'crypto-js';

let useCadenaUnica = () => {

    let crearHash512 = (crudo) => btoa(CryptoJS.SHA256(crudo).toString());

    let crearHash256 = (crudo) => btoa(CryptoJS.SHA512(crudo).toString());

    return [
        crearHash512,
        crearHash256
    ];
};

export default useCadenaUnica;