package ee_app.service;

import ee_app.entity.Consumption;
import ee_app.repository.ConsumptionRepository; // The repository for Consumption entity
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsumptionService {

    @Autowired
    private ConsumptionRepository consumptionRepository;

    // Fetch all consumptions for a given meteringPointId
    public List<Consumption> getConsumptionsByMeteringPointId(Long meteringPointId) {
        return consumptionRepository.findByMeteringPointMeteringPointId(meteringPointId); // Assuming this query is defined in the repository
    }
}
