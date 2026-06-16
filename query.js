const query = {
  query: `
    query {
      viewer {
        accounts(filter: {accountTag: "2996d6450c632747bb18d9b1c3bf70ea"}) {
          workersInvocationsAdaptive(limit: 10, filter: {
            datetime_geq: "2026-06-13T00:00:00Z",
            datetime_leq: "2026-06-15T00:00:00Z"
          }) {
            dimensions {
              scriptName
              status
            }
            sum {
              requests
              errors
            }
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
