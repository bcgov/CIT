from django.urls import path, re_path, include

from rest_framework.routers import DefaultRouter

from pipeline.views.email import EmailView, EdoEmailView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    re_path(r"^admin/$", EmailView.as_view()),
    re_path(r"^edo/", EdoEmailView.as_view()),
]