package ee_app.Controller;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api") // Proxy endpoint prefix
public class ProxyController {

    //https://estfeed.elering.ee/api/public/v1/energy-price/electricity?startDateTime=2024-12-31T22%3A00%3A00.000Z&endDateTime=2025-12-31T21%3A59%3A59.999Z&resolution=one_month

    // Base URL for the external API
    private static final String EXTERNAL_API_URL = "https://estfeed.elering.ee/api/public/v1/energy-price/electricity";

    @GetMapping("/electricity")
    public ResponseEntity<String> getElectricityData(
            @RequestParam String startDateTime,
            @RequestParam String endDateTime,
            @RequestParam String resolution
    ) {
        // Build the complete URL for the external API
        String url = EXTERNAL_API_URL
                + "?startDateTime=" + startDateTime
                + "&endDateTime=" + endDateTime
                + "&resolution=" + resolution;

        // Set up a RestTemplate to make the external API call
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Make the GET request to the external API
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    String.class
            );

            // Return the external API response to the frontend
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            // Handle any errors when calling the external API
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching data from external API: " + e.getMessage());
        }
    }
}

