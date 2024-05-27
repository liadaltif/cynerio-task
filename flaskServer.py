from datetime import date
from flask import Flask, jsonify, request
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

users = []


@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)


@app.route('/api/users/search', methods=['GET'])
def search_users():
    search_query = request.args.get('query', '').lower()
    filtered_users = [user for user in users if
                      search_query in user['Name'].lower() or
                      search_query in user['Address'].lower()]
    return jsonify(filtered_users)


def validate_name(name):
    return re.match(r'^[a-zA-Z]{3,32}( [a-zA-Z]{3,32})?$', name)


def validate_address(address):
    return re.match(r'^[a-zA-Z0-9\s]{3,100}$', address)


@app.route('/api/users', methods=['POST'])
def create_user():
    new_user = request.json

    name = new_user.get('Name', '')
    address = new_user.get('Address', '')

    if not validate_name(name):
        return jsonify({"message": "Name should contain only letters and be between 3 and 32 characters"}), 400

    if not validate_address(address):
        return jsonify({
            "message": "Address should contain only letters, numbers, and spaces, and be between 3 and "
                       "100 characters"}), 400

    # In a case where there's no users, set the first user with the id of 1
    # I know this is not the best practice, and there's libraries where I can attach a unique ID
    # for a new user, but since its all a demo replica of a database, it does not really matter
    if not users:
        new_user['id'] = 1
    else:
        new_user['id'] = max(user['id'] for user in users) + 1

    new_user['Date'] = str(date.today())

    new_user['Actions'] = "DELETE"

    users.append(new_user)
    return jsonify({"message": "User created successfully", "id": new_user['id']}), 201


@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    users = [user for user in users if user['id'] != user_id]
    return jsonify({"message": "User deleted successfully"})


if __name__ == '__main__':
    app.run(debug=True)
