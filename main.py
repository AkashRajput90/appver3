

from flask import Flask, render_template, redirect, request, url_for
app = Flask(__name__, static_url_path='/static')


tasks = [
    {'id': 1, 'title': 'Task 1', 'description': 'Description for Task 1'},
    {'id': 2, 'title': 'Task 2', 'description': 'Description for Task 2'},
    # Add more tasks here
]

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['GET', 'POST'])
def add_task():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        # Add your logic to add a new task to the tasks list
        new_task = {'id': len(tasks) + 1, 'title': title, 'description': description}
        tasks.append(new_task)
        return redirect(url_for('index'))
    return render_template('add_task.html')

@app.route('/delete_task/<int:task_id>')
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return redirect(url_for('index'))

@app.route('/edit_task/<int:task_id>', methods=['GET', 'POST'])
def edit_task(task_id):
    task_to_edit = [task for task in tasks if task['id'] == task_id][0]
    if request.method == 'POST':
        task_to_edit['title'] = request.form['title']
        task_to_edit['description'] = request.form['description']
        # Add your logic to update the task in the tasks list
        return redirect(url_for('index'))
    return render_template('edit_task.html', task=task_to_edit)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
