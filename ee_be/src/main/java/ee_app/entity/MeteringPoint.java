package ee_app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "metering_points")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeteringPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metering_point_id")
    private Long meteringPointId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
//    @JsonIgnoreProperties({"password"})
    private Customer customer;

    @Column(name = "address", nullable = false)
    private String address;
}
