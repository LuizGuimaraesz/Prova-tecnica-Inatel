from flask import Flask, jsonify, request
from database import db
from models.user import User
from models.task import Task
from flask_cors import CORS


#Configurações iniciais do Flask e do banco de dados ------------------------------------------------------
app = Flask(__name__)

app.config["SECRET_KEY"] = "secret_key_inatel"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

db.init_app(app)
CORS(app)



#Rota de criação de usuário ------------------------------------------------------------------------------
@app.route("/user", methods=["POST"])
def create_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    new_user = User(username=username, email=email)

    if username and email:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usúario criado com sucesso!"}), 201
    
    return jsonify({"message": "Dados inválidos"}), 400



#Rota para listar dados de todos os usuários -------------------------------------------------------------
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users_list = [ user.to_dict() for user in users]
    return jsonify(users_list), 200



#Rota para listar dados de um usuário específico ----------------------------------------------------------
@app.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)

    if user:
        user_data = user.to_dict()
        return jsonify(user_data), 200
    
    return jsonify({"message": "Usuário não encontrado"}), 404
    


#Rota de criação de tarefa -------------------------------------------------------------------------------
@app.route("/task", methods=["POST"])
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    completed = data.get("completed", False)
    user_id = data.get("user_id")
    new_task = Task(title=title, description=description, completed = completed, user_id=user_id)

    if title and description and user_id:
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"message": "Tarefa criada com sucesso!"}), 201
    
    return jsonify({"message": "Dados inválidos"}), 400



#Rota para listar tarefas de um usuário específico---------------------------------------------------------
@app.route("/tasks/<int:user_id>", methods=["GET"])
def get_tasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()
    tasks_list = [task.to_dict() for task in tasks]
    return jsonify(tasks_list), 200
    


#Rota para listar dados de uma tarefa específica ----------------------------------------------------------
@app.route("/task/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.get(task_id)

    if task:
        task_data = task.to_dict()
        return jsonify(task_data), 200
    
    return jsonify({"message": "Tarefa não encontrada"}), 404



#Rota para atualizar dados do usuário -----------------------------------------------------------------------
@app.route("/user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")

        if username:
            user.username = username
        if email:
            user.email = email

        db.session.commit()
        return jsonify({"message": "Usuário atualizado com sucesso!"}), 200

    return jsonify({"message": "Usuário não encontrado"}), 404



#Rota para atualizar dados de uma tarefa -------------------------------------------------------------------
@app.route("/task/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    task = Task.query.get(task_id)

    if task:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        completed = data.get("completed")

        if title:
            task.title = title
        if description:
            task.description = description
        if completed is not None:
            task.completed = completed

        db.session.commit()
        return jsonify({"message": "Tarefa atualizada com sucesso!"}), 200

    return jsonify({"message": "Tarefa não encontrada"}), 404



#Rota para deletar um usuário ----------------------------------------------------------------------------------
@app.route("/user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuário deletado com sucesso!"}), 200

    return jsonify({"message": "Usuário não encontrado"}), 404



#Rota para deletar uma tarefa ------------------------------------------------------------------------------------
@app.route("/task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)

    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Tarefa deletada com sucesso!"}), 200

    return jsonify({"message": "Tarefa não encontrada"}), 404




if __name__ == "__main__":
    app.run()