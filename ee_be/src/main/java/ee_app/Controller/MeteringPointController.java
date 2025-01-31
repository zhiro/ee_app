package ee_app.Controller;

import ee_app.entity.MeteringPoint;
import ee_app.entity.Consumption;
import ee_app.security.JwtUtil;
import ee_app.service.MeteringPointService;
import ee_app.service.ConsumptionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/metering-points")
public class MeteringPointController {

    @Autowired
    private MeteringPointService meteringPointService;
    @Autowired
    private ConsumptionService consumptionService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<MeteringPoint> getMeteringPointsByCustomerId(HttpServletRequest request){
        String token = getTokenFromRequest(request);

        if (token == null || jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or missing token");
        }
        Long customerId = jwtUtil.extractCustomerId(token);

        return meteringPointService.getMeteringPointsByCustomerId(customerId);
    }


    @GetMapping("/{meteringPointId}/consumptions")
    public ResponseEntity<List<Consumption>> getConsumptionsByMeteringPointId(@PathVariable Long meteringPointId) {
        List<Consumption> consumptions = consumptionService.getConsumptionsByMeteringPointId(meteringPointId);

        if (consumptions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
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