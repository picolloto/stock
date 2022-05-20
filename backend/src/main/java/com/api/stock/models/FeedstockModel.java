package com.api.stock.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "feedstock")
public class FeedstockModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private Integer quantity;

    @OneToMany(mappedBy = "feedstock_id")
    Set<ProductFeedstockModel> productFeedstock = new HashSet<>();

    private LocalDateTime created_at;
}
