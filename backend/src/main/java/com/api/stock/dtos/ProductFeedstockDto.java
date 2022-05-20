package com.api.stock.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProductFeedstockDto {

    private Long id;

    private Long product_id;

    private Long feedstock_id;

    @NotNull
    private Integer min_quantity;

    private LocalDateTime created_at;

}
