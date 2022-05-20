package com.api.stock.services;

import com.api.stock.models.ProductFeedstockModel;
import com.api.stock.repositories.ProductFeedstockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ProductFeedstockService {

    @Autowired
    private ProductFeedstockRepository productFeedstockRepository;

    @Transactional
    public ProductFeedstockModel save(ProductFeedstockModel productFeedstockModel) {
        return productFeedstockRepository.save(productFeedstockModel);
    }

    public Page<ProductFeedstockModel> findAll(Pageable pageable) {
        return productFeedstockRepository.findAll(pageable);
    }

    public Optional<ProductFeedstockModel> findById(Long id) {
        return productFeedstockRepository.findById(id);
    }

    public void delete(ProductFeedstockModel productFeedstockModel) {
        productFeedstockRepository.delete(productFeedstockModel);
    }
}
