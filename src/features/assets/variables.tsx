export const variables = {
    customer: ['name', 'phone', 'email', 'address', 'city', 'province', 'postal', 'country'],
    user: ['username', 'password', 'password2'],
    // urlbase: 'https://backlog2.up.railway.app/',
    urlbase: 'http://127.0.0.1:8000/'
}

export const customerObject = {
    id: '',
    user: {
        username: ''
    },
    customerName: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    province: '',
    postal: '',
    country: ''
}

export const taskObject = {
    id:'',
    isCompleted:false,
    customer: customerObject,
    title: '',
    date_time_start: '',
    date_time_end: '',
    task_rate:'',
    hours: ''
}