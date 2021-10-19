import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteCar, getCars } from '../../../../actions/index'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../../NavBar/NavBar";

export default function DeleteProduct() {
    const dispatch = useDispatch();
    const [id, setID] = useState("")
    const cars = useSelector(state => state.allCars)
    useEffect(() => {
        dispatch(getCars());
    }, [dispatch])

    function handleSelect(e) {
        setID({
            id: e.target.value
        })
    }

    function handleSubmit(e) {
        console.log(id)
        e.preventDefault(e);
        dispatch(DeleteCar(id))
        alert("Publicacion eliminada")
        setID({
            id: ""
        })
    }

    console.log(id)

    return (
        <div>
            <NavBar />
            <h1>Selecciona el auto a eliminar</h1>
            <hr />
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    {/* <legend>Select car to delete</legend> */}
                    <select required onChange={(e) => handleSelect(e)}>
                        <option disabled selected>Autos</option>
                        {cars?.map((el) => (
                            <option value={el._id}>{el.name}</option>
                        ))}
                    </select>
                    {id.id && (
                        <h3><id><b>ID: </b></id>{id.id}</h3>

                    )}
                    <div>
                        <button type='submit'>Submit</button>
                        <Link to="/ProductCRUD">
                            <button >Back</button>
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>

    )
}