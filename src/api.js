// const baseUrl = "http://localhost:8000/"
const baseUrl = "https://emhurgeltback.herokuapp.com/"

const api = {
    items: baseUrl + 'api/items/items',
    posts: baseUrl + 'api/items/posts',
    companies: baseUrl + 'api/items/companies',
    categories: baseUrl + 'api/items/categories',
    tags: baseUrl + 'api/items/tags',
    shops: baseUrl + 'api/items/shops',    
    users: baseUrl + 'api/users',
    authFacebook: baseUrl + 'rest-auth/facebook/',
    authGoogle: baseUrl + 'rest-auth/google/',
    cities: baseUrl + 'api/address/cities',
    districts: baseUrl + 'api/address/districts',    
    addresses: baseUrl + 'api/address/addresses',
    profile: baseUrl + 'rest-auth/user/',
    profiles: baseUrl + 'api/users/profiles',
    ckeditor: baseUrl + 'ckeditor/',
}

export default api;