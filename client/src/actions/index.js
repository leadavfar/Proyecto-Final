import axios from 'axios';
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, GOOGLE_SIGNIN} from './userConstants';


//Traemos al payload todos los autos
export function getCars() {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/products");
        return dispatch({
            type: 'GET_CARS',
            payload: json.data
        })
    }
}

export function getAllUsers(payload){
    return async function (dispatch){
        var json = await axios.get("https://car-shop-project.up.railway.app/user")
        return dispatch({
            type:"GET_USERS",
            payload:json.data
        })
    }
}

export function putAdmin (payload){
    return async function (dispatch){
        try{
            var json = await axios.put("https://car-shop-project.up.railway.app/promote/" +payload.id , payload)
            return dispatch({
                type:"PUT_ADMIN",
                payload:json
            })
        }catch(err){
            console.log(err);
        }
    }
}

export function getOrder() {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/orders");
        return dispatch({
            type: 'GET_ORDERS',
            payload: json.data
        })
    }
}


export function putCart(payload) {
    return async function (dispatch) {
        const json = await axios.put("https://car-shop-project.up.railway.app/orders/" + payload.idOrder, payload)
        return dispatch({
            type: 'PUT_CART',
            payload:json
        })
    }
}



export function getOrderByID(id) {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/orders/" + id);
        return dispatch({
            type: 'GET_ORDERS_BY_ID',
            payload: json.data
        })
    }
}


export function getEngine() {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/products");
        return dispatch({
            type: 'GET_ENGINE',
            payload: json.data.map(el => el.features.engine)
        })
    }
}

export function getCarDetail(id) {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/products/" + id);
        return dispatch({
            type: "GET_CAR_DETAIL",
            payload: json.data
        })
    }
}

export  function getReview(id) {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/product/"+id+"/review");
        return dispatch({
            type: "GET_REVIEW",
            payload: json.data
        })
    }
}
export function postProduct(payload) { 
    return async function (dispatch) {
        const json = await axios.post("https://car-shop-project.up.railway.app/products", payload);
        return dispatch({
            type: 'POST_PRODUCT',
            payload: json
        })
    }
}

export function putProduct(id, payload) {
    
    return async function (dispatch) {
        const json = await axios.put("https://car-shop-project.up.railway.app/productsPut/" + id, payload);
        return dispatch({
            type: 'PUT_PRODUCT',
            payload: json
        })
    }
}

export function putProductStock(payload) {
    
    return async function (dispatch) {
        const json = await axios.put("https://car-shop-project.up.railway.app/productsPut/" + payload.id, payload);
        return dispatch({
            type: 'PUT_PRODUCT',
            payload: json
        })
    }
}


export function postMg (payload){
    return async function (dispatch){
        const json = await axios.post("https://car-shop-project.up.railway.app/checkout", payload);
        return dispatch({
            type: 'POST_MG',
            payload:json.data
        })
    }
}

export function postCart(payload) {
    return async function (dispatch) {
        const json = await axios.post("https://car-shop-project.up.railway.app/users/"+payload.user+"/cart", payload);
        return dispatch({
            type: 'POST_CART',
            payload: json
        })
    }
}



export function postReview(payload ){
    return async function (dispatch){
        const json = await axios.post("https://car-shop-project.up.railway.app/product/"+payload.id+"/review", payload)
        return dispatch({
            type: 'POST_REVIEW',
            payload:json
        })
    }
}

export function userRegister(payload) {
    return async function (dispatch) {
        const json = await axios.post('https://car-shop-project.up.railway.app/register', payload);
        return dispatch({
            type: 'USER_REGISTER',
            payload: json
        })
    }
}

export function forgotPassword(mail) {
    return async function (dispatch) {
        const json = await axios.put('https://car-shop-project.up.railway.app/forgotPassword', {mail});
        return dispatch({
            type: 'FORGOT_PASSWORD',
            payload: json
        })
    }
}

export function resetPassword(payload) {
    return async function (dispatch) {
        const json = await axios.put('https://car-shop-project.up.railway.app/resetPassword', payload);
        return dispatch({
            type: 'RESET_PASSWORD',
            payload: json
        })
    }
}

export const signin =(mail, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: {mail, password}})
    try {
        const { data } = await axios.post('https://car-shop-project.up.railway.app/login', {mail, password})
        if(data.error){
            dispatch({
            type: USER_SIGNIN_FAIL,
            payload: data.error
        })
        }else {
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data.token))
            localStorage.setItem('userInformacion', JSON.stringify(data))
            localStorage.setItem('userID', data._id)
        }
    } catch (error){
        console.log(error)
}
}

export function googleSignin(tokenId){
    return async function(dispatch){
        try {
            const {data} = await axios.post('https://car-shop-project.up.railway.app/googleLogin', {tokenId})
            if(data.error){
                dispatch({
                    type: USER_SIGNIN_FAIL,
                    payload: data.error
                })
            }else{
                dispatch({type:GOOGLE_SIGNIN, payload: data})
                localStorage.setItem('userInfo', JSON.stringify(data.token))
                localStorage.setItem('userInformacion', JSON.stringify(data.user))
                localStorage.setItem('userAdmin', JSON.stringify(data.state))
            }
        }catch(err){
            console.log(err)
        }
    }
}



export function deleteUser(id) {
    return async function (dispatch) {
        try {
            let json = await axios.put("https://car-shop-project.up.railway.app/delete_user/" + id)

            return dispatch({
                type: "DELETE_USER",
                payload: json
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}


export const userAdmin =(mail, password) => async (dispatch) => {
    dispatch({ type: 'USER_ADMIN_REQUEST', payload: {mail, password}})
    try {
        const { data } = await axios.post('https://car-shop-project.up.railway.app/login', {mail, password})
        dispatch({ type: 'USER_ISADMIN', payload: data})
        localStorage.setItem('userAdmin', JSON.stringify(data.state))
        
        
    } catch (error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
}
}

export const getUserData = (userId) => async (dispatch, getState) => {
    dispatch({type: 'USER_DETAILS_REQUEST', payload: userId});
    const {
        userInfo 
    } = getState();
    try {
        const { data } = await axios.get(`https://car-shop-project.up.railway.app/user/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
        ? error.response.data.message : error.message;
        dispatch({type: 'USER_DETAILS_FAIL', payload: message})
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST', payload: user });
    const {
        userInfo  ,
    } = getState();
    try {
        const { data } = await axios.put(`https://car-shop-project.up.railway.app/user/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userDetails', JSON.stringify(data));
    } catch (error) {
        const message =
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({ type: 'USER_UPDATE_PROFILE_FAIL', payload: message });
    }
};


export function DeleteCar(id) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("https://car-shop-project.up.railway.app/productsDelete/" + id);
            return dispatch({
                type: "DELETE_CAR",
                payload: json
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export function DeleteCartId(id) {
    return async function (dispatch) {
        var json = await axios.delete("https://car-shop-project.up.railway.app/cart/delete/" + id);
        return dispatch({
            type: "DELETE_CART_BY_ID",
            payload: json
        })
    }
}

export function filterEngine(payload) {
    return {
        type: 'FILTER_BY_ENGINE',
        payload
    }
}

export function filterKm(payload) {
    return {
        type: 'FILTER_BY_KM',
        payload
    }
}
export function listCart(payload) {
    return {
        type: 'LIST_CARD',
        payload
    }
}
export function filterPrice(payload) {
    return {
        type: 'FILTER_BY_PRICE',
        payload
    }
}

export function filterTraction(payload) {
    return {
        type: 'FILTER_BY_TRACTION',
        payload
    }
}

export function filterTransmission(payload) {
    return {
        type: 'FILTER_BY_TRANSMISSION',
        payload
    }
}

export function filterAge(payload) {
    return {
        type: 'FILTER_BY_AGE',
        payload
    }
}
export function searchId(payload) {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/home/edit/" +payload.input)
        return dispatch({
            type: 'SEARCH_ID_ORDER',
            payload :json
    })
}}

//filtrado orderDetail

export function filterStatus(payload) {
    return{
        type: 'FILTER_STATUS',
        payload
    }
}

export function getNameCars(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://car-shop-project.up.railway.app/searchCars?name=" + name);
            return dispatch({
                type: "GET_NAME_CARS",
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    };
    
}



export function getAllOrderStatus(payload) {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/orders/?status="+ payload.status);
        return dispatch({
            type: 'GET_ALL_ORDERS_STATUS',
            payload: json.data
        })
    }
}
export function getUserOrderStatus(payload) {
    return async function (dispatch) {
        var json = await axios.get("https://car-shop-project.up.railway.app/users/"+payload.id+"/orders/?status="+ payload.status);
        return dispatch({
            type: 'GET_ORDERS_USER_STATUS',
            payload: json.data
        })
    }
}
    export function getOrderByUsuario(payload) {
        return async function (dispatch) {
            var json = await axios.get("https://car-shop-project.up.railway.app/users/"+payload+"/orders");
            return dispatch({
                type: 'GET_ORDERS_BY_USUARIO',
                payload: json.data
            })
        }
    }
export function getBrandCars(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://car-shop-project.up.railway.app/searchbrand?brand=" + name, {

            });
            return dispatch({
                type: "GET_BRAND_CARS",
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    };

}

export function getCategories() {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://car-shop-project.up.railway.app/categories");
            return dispatch({
                type: "GET_CATEGORIES",
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    };

}

export function postCategory(payload) {
    return async function (dispatch) {
        const json = await axios.post("https://car-shop-project.up.railway.app/categories", payload);
        return dispatch({
            type: 'POST_CATEGORY',
            payload: json
        })
    }
}

export function deleteCategory(id) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("https://car-shop-project.up.railway.app/categories/" + id);
            return dispatch({
                type: "DELETE_CATEGORY",
                payload: json
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function updateCategory(id, payload) {

    return async function (dispatch) {
        const json = await axios.put("https://car-shop-project.up.railway.app/categories/" + id, payload);
        return dispatch({
            type: 'UPDATE_CATEGORY',
            payload: json
        })
    }
}