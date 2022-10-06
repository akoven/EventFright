import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
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
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() =>{
        dispatch(getCategoryThunk())
        console.log('ALL CATEGORIES: ', allCategories)
    },[dispatch]);

    const errors = [];

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            user_id:currentUser.id,
            type:type
        }

        setType('')

        if(type.length > 100){
            errors.push('category type needs to be 100 characters long or less')
        }

        setValidationErrors(errors);
        console.log('ERRORS: ',errors);
        if(errors.length === 0){
            const newCategory = await dispatch(addCategoryThunk(payload))
            if(newCategory){
                alert('successfully created a new category')
                history.push(`/create-category/${currentUser.id}`)
            }

        }
    };

    const handleDelete = async (categoryId) =>{
        const response = await dispatch(deleteCategoryThunk(categoryId))
        alert(response)

    }

    return(
        <div className="category-pg">
            <header>
                <span className="home-pg-link-div">
                    <NavLink to={'/'} className='home-pg-link-create-category'>Event Fright</NavLink>
                </span>
                <span className="new-event-span"><NavLink className='new-event-nav-link' to={'/create-event'}>{'<< Back to create new event page'}</NavLink></span>
            </header>
            <h3 className="category-header">Custom Categories</h3>
            {customCategories.map(category =>
                <span className="category-bubble">
                    <span className="category-label">{category.type}</span>
                    <span className="handle-delete-btn">
                        <button onClick={() => handleDelete(category.id)} className='create-category-delete-btn'>Delete</button>
                    </span>
                </span>
            )}

            <form onSubmit={handleSubmit}>
                <div className="category-form">
                    <h3 className="category-form-header">Create a new category</h3>
                    <ul>
                        {validationErrors.map(error => <li className="category-error">{error}</li>)}
                    </ul>
                    <label className="category-form-label">Category Type</label>
                    <input
                    type='string'
                    value={type ? type:''}
                    onChange={e => setType(e.target.value)}
                    required
                    placeholder="required"
                    />
                    <span className="create-category-sumbit-btn"><button type="submit" className="category-submit-btn">Submit</button></span>
                    <span><button className='category-cancel-btn' onClick={() => history.push('/')}>Cancel</button></span>
                </div>
            </form>
        </div>
    )

}

export default CreateCategory;
