package ee_app.Controller;

import ee_app.entity.Consumption;
import ee_app.service.ConsumptionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ee_app.entity.Consumption;
import ee_app.service.ConsumptionService;

import java.util.List;
import ee_app.security.JwtUtil;

@RestController
@RequestMapping("/api/consumption")
public class ConsumptionController {

    @Autowired
    private ConsumptionService consumptionService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Consumption>> getConsumption(HttpServletRequest request) {
        String token = getTokenFromRequest(request);

        if (token == null || jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or missing token");
        }
        Long customerId = jwtUtil.extractCustomerId(token);

        List<Consumption> consumptions = consumptionService.getConsumptionsByCustomerId(customerId);

        return ResponseEntity.ok(consumptions);

    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
