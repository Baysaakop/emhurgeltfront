const baseUrl = "http://localhost:8000/"
//const baseUrl = "https://emhurgeltback.herokuapp.com/"

const api = {
    items: baseUrl + 'api/items/items',    
    companies: baseUrl + 'api/items/companies',
    types: baseUrl + 'api/items/types',
    categories: baseUrl + 'api/items/categories',
    subcategories: baseUrl + 'api/items/subcategories',
    tags: baseUrl + 'api/items/tags',    
    users: baseUrl + 'api/users/users',    
    orders: baseUrl + 'api/users/orders',    
    profile: baseUrl + 'rest-auth/user/',    
    signin: baseUrl + 'rest-auth/login/',
    signup: baseUrl + 'rest-auth/registration/',       
}

export default api;