package com.api.stock.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
public class FeedstockDto {

    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotNull
    private Integer quantity;

    private LocalDateTime created_at;
}
