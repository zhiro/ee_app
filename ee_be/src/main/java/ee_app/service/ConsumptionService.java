package ee_app.service;

import ee_app.entity.Consumption;
import ee_app.repository.ConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsumptionService {

    @Autowired
    private ConsumptionRepository consumptionRepository;

    public List<Consumption> getConsumptionsByMeteringPointId(Long meteringPointId) {
        return consumptionRepository.findByMeteringPointMeteringPointId(meteringPointId);
    }
}
