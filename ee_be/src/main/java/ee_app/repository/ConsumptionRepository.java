package ee_app.repository;

import ee_app.entity.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsumptionRepository extends JpaRepository<Consumption, Long> {
    List<Consumption> findByMeteringPointMeteringPointId(Long meteringPointId);

    List<Consumption> findByMeteringPointCustomerCustomerId(Long CustomerId);

}
