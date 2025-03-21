from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        address = request.form['address']
        concern = request.form['concern']
        return f"Received: {name}, {phone}, {email}, {address}, {concern}"
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
