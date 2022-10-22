from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('tests/', views.create_test_view),
	path('/tests/<int:pk>/submissions', views.submission_view),
]

