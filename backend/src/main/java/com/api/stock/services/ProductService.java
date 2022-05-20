package com.api.stock.services;

import com.api.stock.models.FeedstockModel;
import com.api.stock.models.ProductModel;
import com.api.stock.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductModel save(ProductModel productModel) {
        return productRepository.save(productModel);
    }

    public Page<ProductModel> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Optional<ProductModel> findById(Long id) {
        return productRepository.findById(id);
    }

    public void delete(ProductModel feedstockModel) {
        productRepository.delete(feedstockModel);
    }
}
