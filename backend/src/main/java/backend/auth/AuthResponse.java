package backend.auth;

public record AuthResponse(boolean success, String message, UserResponse user) {

	public static AuthResponse success(String message, UserResponse user) {
		return new AuthResponse(true, message, user);
	}

	public static AuthResponse error(String message) {
		return new AuthResponse(false, message, null);
	}
}
