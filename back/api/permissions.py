from rest_framework.permissions import BasePermission
from api.models import tokenModel


class isValidToken(BasePermission):
    def has_permission(self, request, view):
        token = request.data.get('token', '')
        if not token:
            return False

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return False
        
        return True
