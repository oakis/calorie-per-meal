export default (query, variables) => fetch(
    'http://localhost:3000/graphql',
    {
        method: 'post',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        })
    })
    .then(json => json.json())
    .then(({ data }) => data)
    .catch(console.log);
