const https = require('https');

const data = JSON.stringify({ url: 'https://hilmost.net' });

const options = {
  hostname: 'isitagentready.com',
  port: 443,
  path: '/api/scan',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => console.log(chunks));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
