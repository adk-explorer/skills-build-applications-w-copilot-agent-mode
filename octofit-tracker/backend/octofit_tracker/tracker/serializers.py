from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Activity, Team, Membership


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='pk', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'activity_type', 'duration_minutes', 'distance_km', 'timestamp']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id', None)
        if user_id:
            validated_data['user'] = User.objects.get(pk=user_id)
        return super().create(validated_data)


class MembershipSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Membership
        fields = ['id', 'user', 'user_id', 'team', 'role', 'joined_at']


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    members = MembershipSerializer(source='members.all', many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at', 'members']
