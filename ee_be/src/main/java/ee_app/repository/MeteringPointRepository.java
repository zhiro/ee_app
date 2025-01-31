package ee_app.repository;

import ee_app.entity.MeteringPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeteringPointRepository extends JpaRepository<MeteringPoint, Long> {

    List<MeteringPoint> findByCustomerCustomerId(Long customerId);
}