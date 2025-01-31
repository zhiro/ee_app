package ee_app.Controller;

import ee_app.entity.Customer;
import ee_app.repository.CustomerRepository;
import ee_app.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final CustomerRepository customerRepository;
    private final JwtUtil jwtUtil;

    public AuthController(CustomerRepository customerRepository, JwtUtil jwtUtil) {
        this.customerRepository = customerRepository;
        this.jwtUtil = jwtUtil;
    }

    // **User Registration Endpoint**
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Customer customer) {
        if (customerRepository.findByUsername(customer.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        customer.setPassword(new BCryptPasswordEncoder().encode(customer.getPassword())); // Encrypt password
        customerRepository.save(customer);
        return ResponseEntity.ok("User registered successfully!");
    }

    // **User Login Endpoint**
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Optional<Customer> customer = customerRepository.findByUsername(request.getUsername());
        if (customer.isEmpty() || !new BCryptPasswordEncoder().matches(request.getPassword(), customer.get().getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password.");
        }
        String token = jwtUtil.generateToken(customer.get().getUsername(), customer.get().getCustomerId());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    // **Get Logged-in User Data**
    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", ""); // Remove Bearer prefix

        if (jwtUtil.validateToken(token)) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        String username = jwtUtil.extractUsername(token);
        Optional<Customer> customer = customerRepository.findByUsername(username);

        return customer.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("User not found"));
    }
}

// DTOs for login request & response
class LoginRequest {
    private String username;
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() { return token; }
}
