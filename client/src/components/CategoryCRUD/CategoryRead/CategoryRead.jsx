import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";

function CategoryRead() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categories = useSelector(state => state.allcategories);

    console.log(categories)

    return (
        <div>
            <NavBar />
            <div>
                <h1>Categorias</h1>
                {/* <p>&nbsp;</p> */}
                <hr/>
                {categories?.map((el)=>
                    <div>
                    <h3>{el.name}</h3>
                    <h5>{el._id}</h5>
                    <p>{el.description}</p>
                    <hr/>
                    </div>
                )}
            </div>
            <Link to="/CategoryCRUD">
                <button>Volver</button>
            </Link>
        </div>
    )
}
export default CategoryRead;