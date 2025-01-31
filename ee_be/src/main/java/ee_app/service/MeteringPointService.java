package ee_app.service;

import ee_app.entity.MeteringPoint;
import ee_app.repository.MeteringPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeteringPointService {

    @Autowired
    private MeteringPointRepository meteringPointRepository;

    // Get all metering points
    public List<MeteringPoint> getAllMeteringPoints() {
        return meteringPointRepository.findAll();
    }

    // Get a single metering point by ID
    public Optional<MeteringPoint> getMeteringPointById(Long id) {
        return meteringPointRepository.findById(id);
    }

    public MeteringPoint createMeteringPoint(MeteringPoint meteringPoint) {
        return meteringPointRepository.save(meteringPoint);
    }

    public List<MeteringPoint> getMeteringPointsByCustomerId(Long customerId) {
        return meteringPointRepository.findByCustomerCustomerId(customerId);
    }
}