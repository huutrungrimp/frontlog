export interface User {
    username:string
}

export interface Customer {
    id:number|string;
    user: User,
    customerName: string,
    email:string,
    phone:string,
    address:string,
    city:string,
    province:string,
    postal:string,
    country:string,
    
}

export interface Task {
    id: number|string;
    isCompleted:boolean;
    customer: Customer;
    title: string;
    date_time_start:string;
    date_time_end:string;
    hours: number|string;
}

