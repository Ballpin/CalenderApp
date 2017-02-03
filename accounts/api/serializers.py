from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from django.db.models import Q

User = get_user_model()


class UserCreateSeriliazer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
        ]

    def create(self, validated_data):
        print(validated_data)
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
            'token',
        ]

    def validate(self, data):
        user_obj = None
        email = data.get('email', None)
        username = data.get('username', None)
        password = data['password']

        if not email and not username:
            raise ValidationError('A username or email is required to login')

        user = User.objects.filter(
            Q(email=email),
            Q(username=username)
        ).distinct()
        user = user.exclude(email__isnull=True).exclude(email__iexact='')
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError('This username/email is not valid')


        data['token'] = 'Some random token'

        return data
