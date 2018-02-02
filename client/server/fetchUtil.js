
require('isomorphic-fetch');

export default function fetchUtil(url) {
    return fetch(url).then(res => res.json())
}