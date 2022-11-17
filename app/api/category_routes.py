from flask import Blueprint, request
from app.models import db, Categories
from app.forms import CategoryForm
from flask_login import current_user

category_routes = Blueprint('category_routes', __name__)

@category_routes.route('/')
def all_categories():
    if current_user:
        all_categories = Categories.query.all()
        # print('*********************ALL CATEGORIES***********************',all_categories)
        categories = [category.to_dict() for category in all_categories]
        response = {'categories':categories}
        return response
    else:
        return '403: Unauthorized User'

@category_routes.route('/', methods=['POST'])
def add_category():
    new_category = CategoryForm()
    new_category['csrf_token'].data = request.cookies['csrf_token']

    # new_category.data = request.json
    # print('!!!!!!!!!!!!!!!REQUEST!!!!!!!!!!!!!!!!!!!!', new_category.data)

    user_id = new_category.data['user_id']
    type = new_category.data['type']


    if new_category.validate_on_submit():
        category=Categories(
            user_id = user_id,
            type = type
        )

        db.session.add(category)
        db.session.commit()
        return category.to_dict()
    else:
        return {'errors':['403: Unauthorized User']}

@category_routes.route('/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Categories.query.get(category_id)

    if not category:
        return "Error 404: The venue you're looking for couldn't be found"

    db.session.delete(category)
    db.session.commit()

    return 'sucessfully deleted category'
