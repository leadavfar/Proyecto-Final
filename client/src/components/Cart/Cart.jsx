import { useDispatch, useSelector  } from "react-redux";
import { useEffect, useState } from "react";
import { postCart,postMg, getUserOrder ,getUserOrderStatus} from "../../actions";
import {useLocalStorage,borrarItem} from '../../useStorage/useLocalStorage';
import {Link, useHistory} from "react-router-dom";
import NavBar from '../NavBar/NavBar'
import stylecart from '../Cart/Cart.module.css';

export default function Cart(props){
    // const idCar = useSelector((state)=> state.idCar)
    //const carrito = u seSelector ((state)=> state.cart)
    // console.log("ACA",idCar);

    
    const dispatch = useDispatch()
    const [idAuto, setIdAuto] = useLocalStorage('auto')
    const userInformacion = localStorage.getItem("userInformacion")
    const user = JSON.parse(userInformacion)
    const history = useHistory();
    const [cart,setCart] = useState({})
    const [amount, setAmount] = useState([])
    const [price,setPrice] = useState(0)
    const [input , setInput] = useState ({});

    const orderPayload = {
        id : user._id,
        status : "Carrito"
    }

    
    useEffect(() => {
        dispatch(getUserOrderStatus(orderPayload))
     }, [])
    
    const cartBD = useSelector ((state) => state.orders)
    console.log('cartDb',cartBD)


    function sumatotal() {
        let suma = [];
        let numero = 0
        for (let i = 0; i < amount.length; i++) {
            suma.push( amount[i].price * amount[i].cantidad)
        }
        suma.forEach(element =>{
            numero = numero + element
            setPrice(numero)
        })
    }

    
    
    
    function sumarCar(idCar){
        console.log('idCar')
        const found = amount.find(element => element.id === idCar.id)
        if(found?.id !== idCar.id){
            setAmount([...amount,{
                id: idCar.id,
                brand: idCar.brand,
                carname :idCar.name,
                price : idCar.price,
                cantidad : 1
            }])
        }
        else{
            amount.forEach(element =>{
                if(element.id === idCar.id){
                    element.cantidad =  parseInt(element.cantidad + 1)
                }
            })
        }
        sumatotal()

    }
    
    //boton post filtrar todos los que tengan
    
    function handleClickSumar(car){
        console.log('car',car)
        sumarCar(car)
        sumatotal()
    }
    function handleClickRestark(e){
        let numeroresta = 0
        const found = amount.find(element => element.id === e.id)
        if(found?.id === e.id && e.cantidad >=1){
            amount.forEach(element =>{
                if(element.id === e.id){
                    element.cantidad =  parseInt(element.cantidad - 1)
                }
            })
            numeroresta = price - e.price
            setPrice(numeroresta)
            
        }
        else if (e.cantidad === 0){ 
            const filter = amount.filter(car => car !== e)
            setAmount(filter)
            setPrice(0)
        }
    }

    function handleDeleteCar(car){
        let Delete = idAuto.filter(element => element !== car)
        setIdAuto(Delete)
        if (idAuto?.length === 1) {
        borrarItem('auto')
        borrarItem('button')
        setAmount([])
        }
        window.location.reload()
    }

    function handlePost(ev){
        ev.preventDefault()
        setCart({
            user:user?._id,
            publication: amount.map(el => el.id),
            cantidad : amount.map(el => el.carname + ' X ' +el.cantidad),
            price: price,
            state:"En proceso"
        })
        setInput({
            user:user?._id,
            publication: amount.map(el => el.id ),
            cantidad : amount.map(el => el.cantidad),
            price: price,
            state:"En proceso"
        })
        if(input.user && input.publication && input.cantidad && input.price){
             //dispatch(postMg(input))
             dispatch(postCart(cart))
            alert('Compra exitosa')
            // history.push('/checkout')
            // handleDelete()
        }
        else{
            alert('Vuelva a tocar el boton para confirmar')
        }
        
    }
    function handleDelete() {
        borrarItem('auto')
        borrarItem('button')
        setAmount([])
    }
    function handleError(){
        alert('Selecciona el auto que quieres comprar')
    }

    function handleCartDB(item){
   //  setIdAuto(cartBD) 
   //     window.location.reload()
   //sumarCar(item)
   console.log(cartBD)
   
}

console.log('idAuto',idAuto)


    function handleSelect(e) {

      history.push(`/home/Catalogo/${e.target.value}`);

    }
    return(
        <div>
            <NavBar/>
            <hr />
            <div className={stylecart.divbtn}>
                <h3>PRODUCTOS EN CARRITO {idAuto?.length}</h3>
                <button className={stylecart.btndeleall} onClick={()=> handleDelete()}>VACIAR CARRITO</button>
            </div>
            
                <div className={stylecart.divall}>
                    <div className={stylecart.divcart}>
                    {idAuto === undefined  ? 
                    <div className={stylecart.vaciocart}>
                        <img src="https://pedidos.mostazagreenburger.com/static/images/cart/empty_cart.png"/>
                    </div>
                    :  idAuto.map(el => {
                    return(
                            <div key={el.id} className={stylecart.containerproduct}>
                            
                                <div className={stylecart.imgcont}>
                                    <img src={el.img?.[0]} alt='Erorr' width="150x" height="150px"></img>
                                </div>
                                <div className={stylecart.divname}>
                                    <div>
                                        <h2>{el?.brand}<br/> { el?.name}</h2>
                                    </div>
                                    <div>
                                        <h2>{el?.price} </h2>
                                    </div>
                                </div>
                                <div className={stylecart.cantidad}>
                                    <p>Cantidad:</p><button className={stylecart.btn1} onClick={()=>handleClickSumar(el)}>+1</button>
                                </div>
                                <div className={stylecart.btnde}>
                                    <button onClick={()=>handleDeleteCar(el)} className={stylecart.btndelee}>X</button>
                                </div>
                        
                            </div>
                        ) 
                }   )
            }   
                <div >
                    <h3>Historial de carrito del usuario:</h3>
                    <select onChange={(e) =>handleSelect(e)}>
                 { cartBD?.map((el) =>{
                   //  console.log('elementCArbd',el)
                     return(
                        <option value={el._id} >
                            {el.brand} {el.name} {el.price} stock : {el.stock}
                        </option>
                  )   
                }
                )}
                </select>
                     
            </div>
            </div>
                <div className={stylecart.divticket}>
                    <h3>TICKET</h3>
                                        
                    <div className={stylecart.divdata}>
                        {
                            amount && amount.map(item=>{
                                if(item.cantidad >0)
                                return(
                                    <tr className={stylecart.trdiv}>
                                        <li className={stylecart.listy}>{item.brand} {item.carname} {item.price} <br/>Cantidad:{item.cantidad}</li>
                                        <button  className={stylecart.btndelee} onClick={()=>handleClickRestark(item)}>X</button>

                                    </tr>
                              
                            )
                            else{
                                <p>Elija cantidad</p>                            
                            }
                        })
                    }
                    <hr />
                        <div>
                        <h4>Total:{price}</h4>
                        </div>
                        <div>
                    <div>
                    <tr className={stylecart.trdiv}>
                    <ul className={stylecart.listy}>User:{user?.fullname}</ul>
                    <ul className={stylecart.listy}>Mail:{user?.mail} </ul>

                    </tr>
                    </div>
                        {
                            idAuto?
                        <Link to = '/checkout'>
                            <button className={stylecart.btncomprartodo} onClick={(ev)=> handlePost(ev)}>CONFIRMAR COMPRA</button>
                        </Link>:
                        <button className={stylecart.btncomprartodo} onClick={(ev)=> handleError(ev)}>CONFIRMAR COMPRA</button>
                        }
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
            )
        
}
