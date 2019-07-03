export default (query) => fetch(
    'http://localhost:3000/graphql',
    {
        method: 'post',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
        })
    })
    .then(json => json.json())
    .then(({ data }) => data)
    .catch(console.log);
