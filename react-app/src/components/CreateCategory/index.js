import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCategoryThunk, addCategoryThunk, deleteCategoryThunk } from "../../store/category";
import './index.css';

const CreateCategory = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useParams();

    const allCategories = useSelector(state => Object.values(state.category));
    const currentUser = useSelector(state => state.session.user);
    const customCategories = allCategories.filter(category => category.user_id === +userId.id)

    const [type, setType] = useState('')

    useEffect(() =>{
        dispatch(getCategoryThunk())
        console.log('ALL CATEGORIES: ', allCategories)
    },[dispatch]);

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            user_id:currentUser.id,
            type:type
        }

        const newCategory = await dispatch(addCategoryThunk(payload))
        if(newCategory){
            history.push(`/create-category/${currentUser.id}`)
        }
    };

    const handleDelete = async (categoryId) =>{
        await dispatch(deleteCategoryThunk(categoryId))
    }

    return(
        <div className="category-pg">
            <h3 className="category-header">Custom Categories</h3>
            {customCategories.map(category =>
                <span className="category-bubble">
                    <span className="category-label">{category.type}</span>
                    <span className="handle-delete-btn">
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </span>
                </span>
            )}

            <form onSubmit={handleSubmit}>
                <div className="category-form">
                    <h3 className="category-form-header">Create a new category</h3>
                    <label className="category-form-label">Category Type</label>
                    <input
                    type='string'
                    value={type ? type:''}
                    onChange={e => setType(e.target.value)}
                    required
                    placeholder="required"
                    />
                    <span className="create-category-sumbit-btn"><button type="submit">Submit</button></span>
                    <span><button onClick={() => history.push('/')}>Cancel</button></span>
                </div>
            </form>
        </div>
    )

}

export default CreateCategory;
