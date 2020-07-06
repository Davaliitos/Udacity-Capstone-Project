const apiId = '1x47agmotc'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

var callback = '';

if(process.env.NODE_ENV !== 'production'){
  callback = 'http://localhost:3000/callback';
} else{
  callback = 'https://master.d1zend7ixov8dm.amplifyapp.com/callback'
}

export const authConfig = {
  domain: 'bassethound.us.auth0.com',            // Auth0 domain
  clientId: 'qdQKHJbumjydgDtABMZLNMOGZPQDf9MQ',          // Auth0 client id
  callbackUrl: callback
}
