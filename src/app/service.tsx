

const user = localStorage.getItem('userDetail');

export const existingUser = (user === null ? "" : (JSON.parse(localStorage.getItem('userDetail') || '')));

export const variables = {
    urlbase: 'https://backlog2.up.railway.app/'
}