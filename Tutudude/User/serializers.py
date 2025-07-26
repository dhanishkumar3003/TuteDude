from rest_framework.serializers import ModelSerializer
from .models import UserModel


class UserSerializers(ModelSerializer):
    class Meta:
        model=UserModel
        fields=['id',"first_name","last_name","username","email","password","shop_name","role",'address',"google_map_link","category"]
        extra_kwargs = {"password": {"write_only": True}}

    # def create(self, validated_data):
    #     user = UserModel(
    #         username=validated_data['username'],
    #         email=validated_data['email']
    #     )
    #     user.set_password(validated_data['password'])
    #     user.save()
    #     return user
