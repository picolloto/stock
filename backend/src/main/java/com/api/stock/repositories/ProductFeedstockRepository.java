package com.api.stock.repositories;

import com.api.stock.models.ProductFeedstockModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductFeedstockRepository extends JpaRepository<ProductFeedstockModel, Long> {
}
