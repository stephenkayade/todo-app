// for API calls
let storage = {};

storage.checkToken = () => {
    return localStorage.getItem('token') ? true : false;
}

storage.getToken = () => {
    return localStorage.getItem('token')
}

storage.checkUserID = () => {
    return localStorage.getItem('userId') ? true : false
}

storage.getUserID = () => {
    return localStorage.getItem('userId');
}
storage.getConfig = () => {
    const config = {
        headers: {
            contentType: 'application/json'
        }
    }
    return config;
}
storage.getConfigWithBearer = () => {
    const config = {
        headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${storage.getToken()}`
        }
    }
    return config;
}

// COMPULSORY
// it is compulsory
storage.saveCredentials = (token, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
}

storage.clearAuth = () => {
    if(storage.checkToken() && storage.checkUserID() ) {
        localStorage.clear()
    }
}

export default storage;