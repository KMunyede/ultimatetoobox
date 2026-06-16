const query = {
  query: `
    query {
      viewer {
        zones(filter: {zoneTag: "d9519a3ae97b81f51b603f793609feb8"}) {
          httpRequestsAdaptiveGroups(limit: 10, filter: {
            datetime_geq: "2026-06-14T00:00:00Z",
            datetime_leq: "2026-06-14T23:59:59Z",
            edgeResponseStatus_gt: 399
          }, orderBy: [count_DESC]) {
            dimensions {
              edgeResponseStatus
              clientRequestPath
              clientRequestHTTPHost
            }
            count
          }
        }
      }
    }
  `
};

fetch('https://api.cloudflare.com/client/v4/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer CLOUDFLARE_TOKEN_PLACEHOLDER',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(query)
})
.then(r => r.json())
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(console.error);
