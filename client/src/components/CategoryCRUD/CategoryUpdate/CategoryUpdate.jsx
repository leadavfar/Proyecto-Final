import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateCategory, getCategories } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";

function CategoryUpdate() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const [id, setID] = useState("");

    const categories = useSelector(state => state.allCategories);

    const [input, setInput] = useState({
        name: "",
        description: ""
    });

    function HandleSubmit(e) {
        e.preventDefault(e);
        dispatch(updateCategory(input))
        alert("CATEGORIA ACTUALIZADA")
        setInput({
            name: "",
            description: ""
        })
    };

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    function handleSelectID(e) {
        setID({
            id: e.target.value
        })
        setInput({
            name: "",
            description: ""
        })
    }

    const selectedCategory= categories?.find((el)=> el._id === id);

    console.log(categories, id, selectedCategory)

    return (
        <div>
            <NavBar />
            <div>
                <h1>Edita una categoria</h1>
                <hr />
                <select required onChange={(e) => handleSelectID(e)}>
                    <option disabled selected>Categorias</option>
                    {categories?.map((el) => (
                        <option value={el._id}>{el.name}</option>
                    ))}
                </select>
            </div>
            <form onSubmit={(e) => HandleSubmit(e)}>
                <fieldset>
                    {/* <legend>Categoria</legend> */}
                    <hr />
                    <div>
                        <label>Nombre:</label>
                        <input name="name"
                            value={input.name}
                            type='text'
                            placeholder="Nombre"
                            onChange={(e) => handleChange(e)}
                            required />
                    </div>
                    <div>
                        <p>Descripcion</p>
                        <textarea name="description"
                            value={input.description}
                            type='text'
                            cols="80" rows="6"
                            placeholder="Descripcion..."
                            onChange={(e) => handleChange(e)}
                            required />
                    </div>
                </fieldset>
                <Link to="/CategoryCRUD">
                    <button>Volver</button>
                </Link>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default CategoryUpdate;