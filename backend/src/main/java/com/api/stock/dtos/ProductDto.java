package com.api.stock.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProductDto {

    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotNull
    private BigDecimal value;

    private LocalDateTime created_at;

}
