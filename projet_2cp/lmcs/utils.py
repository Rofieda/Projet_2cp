# utils.py
from rest_framework_simplejwt.tokens import AccessToken

def getUserIdFromToken(token):
    try:
        # Decode the access token
        access_token = AccessToken(token)
        # Get the user ID from the token payload
        user_id = access_token.payload["user_id"]
        return user_id
    except Exception as e:
        # Handle token decoding errors
        print(f"Error decoding token: {e}")
        return None
