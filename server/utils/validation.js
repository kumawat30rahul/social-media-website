const emailValidation = (email) => {
    if(!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const usernameValidation = (username) => {
    if(!username) return false;
    const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;
    return usernameRegex.test(username);
}

const phoneNumberValidation = (number) => {
    if(!number) return false;
    const numberRegex = /^[0-9]*$/;
    return numberRegex.test(number);
}

const passwordValidation = (password) => {
    if(!password) return false;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // return passwordRegex.test(password);
    return password.length >= 8;
}

module.exports = {
    emailValidation,
    usernameValidation,
    phoneNumberValidation,
    passwordValidation
}