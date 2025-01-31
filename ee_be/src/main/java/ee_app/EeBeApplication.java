package ee_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "ee_app.entity")
public class EeBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(EeBeApplication.class, args);
	}

}
