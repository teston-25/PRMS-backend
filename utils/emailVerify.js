const axios = require('axios');

const verifyEmail = async (email) => {
  const API_KEY = process.env.MAILBOXLAYER_API_KEY;
  const url = `https://apilayer.net/api/check?access_key=${API_KEY}&email=${email}&smtp=1&format=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      success: data.format_valid && data.smtp_check,
      raw: data,
      message:
        data.format_valid && data.smtp_check
          ? 'Email exists and is deliverable.'
          : 'Email is invalid or undeliverable.',
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Verification failed.',
    };
  }
};

module.exports = verifyEmail;
