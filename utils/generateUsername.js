const generateUsername = (email) => {
    if (!email) return null;
    const username = email.split('@')[0];
    return username;
}

module.exports = { generateUsername };