# core/views_api.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user_management.models import Movies
from core.serializers import MoviesSerializer

@api_view(['GET'])
def movies_list(request):
    # Retrieve all plants that are not marked as deleted
    plants = Movies.objects.filter(is_deleted=False)
    serializer = MoviesSerializer(plants, many=True)
    return Response(serializer.data)
