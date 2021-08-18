// const baseUrl = "http://localhost:8000/"
const baseUrl = "https://emhurgeltback.herokuapp.com/"

const api = {
    items: baseUrl + 'api/items/items',
    posts: baseUrl + 'api/items/posts',
    companies: baseUrl + 'api/items/companies',
    categories: baseUrl + 'api/items/categories',
    tags: baseUrl + 'api/items/tags',
    shops: baseUrl + 'api/items/shops',
    users: baseUrl + 'api/users/users/',
    profiles: baseUrl + 'api/users/profiles',
    orders: baseUrl + 'api/users/orders',
    cities: baseUrl + 'api/users/cities',
    districts: baseUrl + 'api/users/districts',
    sections: baseUrl + 'api/users/sections',
    buildings: baseUrl + 'api/users/buildings',
    authFacebook: baseUrl + 'rest-auth/facebook/',
    authGoogle: baseUrl + 'rest-auth/google/',
    profile: baseUrl + 'rest-auth/user/',    
    ckeditor: baseUrl + 'ckeditor/',
}

export default api;