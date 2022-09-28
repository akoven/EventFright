const GET_ALL_CATEGORIES = 'categories/get_all_categories'
const ADD_CATEGORY = 'categories/add_category'
// const UPDATE_CATEGORY = 'categories/update_category'
const DELETE_CATEGORY = 'categories/delete_category'

const getAllCategories = (category) =>{
    return{
        type: GET_ALL_CATEGORIES,
        category
    }
};

const addCategory = (category) =>{
    return{
        type: ADD_CATEGORY,
        category
    }
};

// const editCategory = (category) =>{
//     return{
//         type: UPDATE_CATEGORY,
//         category
//     }
// };

const deleteCategory = (category) =>{
    return{
        type: DELETE_CATEGORY,
        category
    }
};

export const getCategoryThunk = () => async dispatch =>{
    const response = await fetch('/api/categories/')

    if (response.ok){
        const category = await response.json();
        dispatch(getAllCategories(category));
        const allCategories = {};
        category.categories.forEach(category => (allCategories[category.id ] = category));
        return {...allCategories};
    }
};

export const addCategoryThunk = (category) => async dispatch =>{
    const response = await fetch('/api/categories/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(category)
    });

    console.log('!!!!!!!!!!!!PAYLOAD FROM ADD CATEGORY!!!!!!!!!!!!!!!!!!! ',category)

    if (response.ok){
        const newCategory = await response.json();
        dispatch(addCategory(newCategory));
        return newCategory;
    }
    return null;
};

// export const editCategoryThunk = (category) => async dispatch =>{
//     const response = await fetch(`/api/categories/${cateogry.id}`, {
//         method: 'PUT',
//         headers: {'Content-Type/':'application/json'},
//         body: JSON.stringify(category)
//     });

//     if (response.ok){
//         const newCategory = await response.json();
//         dispatch(editCategory(newCategory));
//         return newCategory;
//     }
//     return null;
// }

export const deleteCategoryThunk = (category) => async dispatch =>{
    const response = await fetch(`/api/categories/${category.id}`, {
        method: 'DELETE'
    });
    dispatch(deleteCategory(category));
    return response;
};

const categoryReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_ALL_CATEGORIES:
            const categories={};
            action.category.categories.forEach(category => categories[category.id] = category);
            return categories;
        case ADD_CATEGORY:
            newState = {...state};
            newState[action.category.id] = action.category;
            return newState;
        // case UPDATE_CATEGORY:
        //     newState = {...state};
        //     newState[action.category.id] = action.category;
        //     return newState;
        case DELETE_CATEGORY:
            delete newState[action.category.id];
            return newState;
        default:
            return state;
    }
}

export default categoryReducer;
