from rest_framework import serializers
from moelasware.models import AuthUser
from api.serializers import *

class GetAuthUserAll(serializers.ModelSerializer):
	class Meta:
		model = AuthUser
		fields = ['username','email', "date_joined"]

class GetAuthUsername(serializers.ModelSerializer):
	class Meta:
		model = AuthUser
		fields = ['username']
