package com.api.stock.repositories;

import com.api.stock.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ProductRepository extends JpaRepository<ProductModel, Long> {
}
