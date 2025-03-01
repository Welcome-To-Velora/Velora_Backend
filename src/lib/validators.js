
// Reusable function for email validation
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);

// Reusable function for phone number validation
const validatePhoneNumber = (phone) => /^[0-9]{10,15}$/.test(phone);
