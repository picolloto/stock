package com.api.stock.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "product_feedstock")
public class ProductFeedstockModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private ProductModel product_id ;

    @ManyToOne
    @JoinColumn(name = "feedstock_id", referencedColumnName = "id", nullable = false)
    private FeedstockModel feedstock_id;

    @Column(nullable = false)
    private Integer min_quantity;

    private LocalDateTime created_at;
}
