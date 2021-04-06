from flask_login import UserMixin
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer


class User(UserMixin):
    def __init__(self, username: str, pwd=''):
        self.username = username
        if pwd:
            self.pwd = generate_password_hash(pwd)

    # @staticmethod
    # def generate_pwd_hash(pwd: str):
    #     return generate_password_hash(pwd)
    #
    # @staticmethod
    # def verify_pwd(pwd_hash, pwd: str):
    #     return check_password_hash(pwd_hash, pwd)

    @staticmethod
    def generate_token(username, expiration=3600):
        s = TimedJSONWebSignatureSerializer(current_app.config['SECRET_KEY'],
                                            expires_in=expiration)
        return s.dumps({'username': username}).decode('ascii')

    @staticmethod
    def verify_token(token):
        s = TimedJSONWebSignatureSerializer(current_app.config['SECRET_KEY'])
        data = s.loads(token)
        return data['username']

# use Code from https://www.jianshu.com/p/2660e371c55a
# class UserRegisterForm(FlaskForm):
#     # username and pwd are required
#     username = StringField('username', validators=[DataRequired()])
#     pwd = PasswordField('pwd', validators=[DataRequired()])
#     confirm_pwd = PasswordField('confirm_pwd',
#                                 validators=[DataRequired(),
#                                             EqualTo('pwd', 'The password you entered is different.')])
#     submit = SubmitField('submit')
#
#     def validate_username(self, field):
#
#         user = collection.find({'username': field.data})
#         if user:
#             raise ValidationError('This username has already been taken.')
#         if len(field.data) < 3:
#             raise ValidationError('Valid username must contain more than 2 characters')
#         if len(field.data) > 20:
#             raise ValidationError('Valid username cannot contain more than 20 characters')
#
#     def validate_pwd(self, field):
#         if len(field.data) < 6:
#             raise ValidationError('Password must contain more than 6 characters')
#         if len(field.data) > 15:
#             raise ValidationError('Password cannot contain more than 15 characters')
