package ee_app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "consumption")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Consumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consumption_id;

    @ManyToOne
    @JoinColumn(name = "metering_point_id", nullable = false)
    private MeteringPoint meteringPoint;

    private BigDecimal amount;
    private String amount_unit;

    @Column(nullable = false)
    private ZonedDateTime consumption_time;
}
