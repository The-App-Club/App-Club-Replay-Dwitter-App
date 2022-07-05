const request = require('request');

function getDwitterInfoList(endpointURL) {
  return new Promise((resolve,reject)=>{
    request(endpointURL, (error, response, body) => {
      if (error) {
        console.log(error);
        reject(error)
      }

      if (response.statusCode === 200) {
        resolve(JSON.parse(body).results)
      }
    });
  })
}
(async()=>{
  const dwitterInfoList = await getDwitterInfoList(`https://www.dwitter.net/api/dweets/?limit=3`)
  console.log(dwitterInfoList)
})()