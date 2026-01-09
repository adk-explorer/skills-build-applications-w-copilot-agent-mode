from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActivityViewSet, TeamViewSet, MembershipViewSet, LeaderboardViewSet

router = DefaultRouter()
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'memberships', MembershipViewSet, basename='membership')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('', include(router.urls)),
]
