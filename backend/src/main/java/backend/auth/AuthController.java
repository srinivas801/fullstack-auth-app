package backend.auth;

import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class AuthController {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public AuthController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
		String name = normalize(request.name());
		String email = normalizeEmail(request.email());
		String password = normalize(request.password());

		if (name.isBlank() || email.isBlank() || password.isBlank()) {
			return ResponseEntity.badRequest().body(AuthResponse.error("Name, email, and password are required."));
		}

		if (password.length() < 6) {
			return ResponseEntity.badRequest().body(AuthResponse.error("Password must be at least 6 characters."));
		}

		if (userRepository.existsByEmail(email)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(AuthResponse.error("Email is already registered."));
		}

		User user = userRepository.save(new User(name, email, passwordEncoder.encode(password)));

		return ResponseEntity.status(HttpStatus.CREATED)
			.body(AuthResponse.success("Registration successful.", UserResponse.from(user)));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
		String email = normalizeEmail(request.email());
		String password = normalize(request.password());

		if (email.isBlank() || password.isBlank()) {
			return ResponseEntity.badRequest().body(AuthResponse.error("Email and password are required."));
		}

		return userRepository.findByEmail(email)
			.filter(user -> passwordEncoder.matches(password, user.getPassword()))
			.map(user -> ResponseEntity.ok(AuthResponse.success("Login successful.", UserResponse.from(user))))
			.orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(AuthResponse.error("Invalid email or password.")));
	}

	private String normalize(String value) {
		return value == null ? "" : value.trim();
	}

	private String normalizeEmail(String value) {
		return normalize(value).toLowerCase(Locale.ROOT);
	}
}
