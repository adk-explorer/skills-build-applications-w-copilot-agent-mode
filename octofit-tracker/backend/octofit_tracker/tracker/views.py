from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Sum, Count, F
from django.db import models
from .models import Activity, Team, Membership
from .serializers import ActivitySerializer, TeamSerializer, MembershipSerializer, UserSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['user__username']
    ordering_fields = ['timestamp', 'distance_km', 'duration_minutes']
    ordering = ['-timestamp']

    def get_queryset(self):
        queryset = Activity.objects.all()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def perform_create(self, serializer):
        # Optionally auto-set user to logged-in user
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['team__name', 'user__username']


class LeaderboardViewSet(viewsets.ViewSet):
    """
    Aggregated leaderboard by user and team.
    Endpoints: /api/leaderboard/users/ and /api/leaderboard/teams/
    """
    @action(detail=False, methods=['get'])
    def users(self, request):
        """Leaderboard aggregated by user (total distance and duration)."""
        stats = Activity.objects.values(
            user_id=F('user__id'),
            username=F('user__username')
        ).annotate(
            total_distance=Sum('distance_km', output_field=models.FloatField()),
            total_duration=Sum('duration_minutes'),
            activity_count=Count('id')
        ).order_by('-total_distance')
        return Response(list(stats))

    @action(detail=False, methods=['get'])
    def teams(self, request):
        """Leaderboard aggregated by team (total distance and duration)."""
        stats = Activity.objects.filter(
            user__team_memberships__isnull=False
        ).values(
            team_id=F('user__team_memberships__team__id'),
            team_name=F('user__team_memberships__team__name')
        ).annotate(
            total_distance=Sum('distance_km', output_field=models.FloatField()),
            total_duration=Sum('duration_minutes'),
            activity_count=Count('id')
        ).order_by('-total_distance')
        return Response(list(stats))
