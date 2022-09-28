import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCategoryThunk } from "../../store/category";
import './index.css';

const CreateCategory = () =>{
    const dispatch = useDispatch();
    const history = useHistory();


    const allCategories = useSelector(state => Object.values(state.category));
    const currentUser = useSelector(state => state.session.user);

    const [type, setType] = useState('')

    // useEffect(() =>{
    //     dispatch(getCategoryThunk())
    //     console.log('ALL CATEGORIES: ', allCategories)
    // },[dispatch]);
    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            user_id:currentUser.id,
            type:type
        }

        const newCategory = await dispatch(addCategoryThunk(payload))
        if(newCategory){
            history.push('/')
        }
    };

    return(
        <div className="category-pg">
            <h3 className="category-header">Available Categories</h3>
            {allCategories.map(category => <span className="category-label">{category.type}</span>)}

            <form onSubmit={handleSubmit}>
                <div className="category-form">
                    <label>Category Type</label>
                    <input
                    type='string'
                    value={type ? type:''}
                    onChange={e => setType(e.target.value)}
                    required
                    placeholder="required"
                    />
                    <span><button type="submit">Submit</button></span>
                    <span><button onClick={() => history.push('/')}>Cancel</button></span>
                </div>
            </form>
        </div>
    )

}

export default CreateCategory;
