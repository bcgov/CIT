from django.conf.urls import url
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from pipeline.views.email import EmailView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    url(r"^admin/$", EmailView.as_view()),
]