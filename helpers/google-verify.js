const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = '') => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the process.env.GOOGLE_CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[process.env.GOOGLE_CLIENT_ID_1, process.env.GOOGLE_CLIENT_ID_2, process.env.GOOGLE_CLIENT_ID_3]
  });

  const { 
      name, 
      picture: image, 
      email
    } = ticket.getPayload();

  return { name, image, email };
}

module.exports = {
    googleVerify
}