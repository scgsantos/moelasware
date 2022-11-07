from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('/quizzes/{quiz_id}',views.createquiz),
	path('login/', views.login),
	path('register/', views.register),
]

