from flask import Flask
import smtplib
from flask import Flask, render_template, request


USERNAME = "info@say.company"
PASSWORD = "}Iww[+-U7ew~"
receivers = ['info@say.company']

app = Flask(__name__)


@app.route("/index" , methods=["POST"])
def index():
    # name = request.form.get("name")
    smtpObj = smtplib.SMTP('mail.say.company', 25)
    smtpObj.login(USERNAME, PASSWORD)
    smtpObj.set_debuglevel(False)
    email = request.form.get("email")
    msg = request.form.get("msg")
    print(msg)
    smtpObj.sendmail(email, receivers, msg)
    return 'asdasdasdas'





if __name__ == "__main__":
        app.run(debug=True, host='0.0.0.0', port=4000)