package com.api.stock.controllers;

import com.api.stock.dtos.ProductFeedstockDto;
import com.api.stock.models.FeedstockModel;
import com.api.stock.models.ProductFeedstockModel;
import com.api.stock.models.ProductModel;
import com.api.stock.services.FeedstockService;
import com.api.stock.services.ProductFeedstockService;
import com.api.stock.services.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/productfeedstock")
public class ProductFeedstockController {

    @Autowired
    private ProductFeedstockService productFeedstockService;

    @Autowired
    private ProductService productService;

    @Autowired
    private FeedstockService feedstockService;

    @PostMapping
    public ResponseEntity<Object> insert(@RequestBody @Valid ProductFeedstockDto productFeedstockDto) {
        Optional<ProductModel> productModelOptional = productService.findById(productFeedstockDto.getProduct_id());
        Optional<FeedstockModel> feedstockModelOptional = feedstockService.findById(productFeedstockDto.getFeedstock_id());

        if (productModelOptional.isEmpty() || feedstockModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedstock or product not found");
        }

        var productFeedstockModel = new ProductFeedstockModel();
        BeanUtils.copyProperties(productFeedstockDto, productFeedstockModel);
        productFeedstockModel.setProduct_id(productModelOptional.get());
        productFeedstockModel.setFeedstock_id(feedstockModelOptional.get());
        productFeedstockModel.setCreated_at(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(productFeedstockService.save(productFeedstockModel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") Long id,
                                         @RequestBody @Valid ProductFeedstockDto productFeedstockDto) {
        Optional<ProductFeedstockModel> productFeedstockModelOptional = productFeedstockService.findById(id);
        if (productFeedstockModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductFeedstock not found");
        }

        Optional<ProductModel> productModelOptional = productService.findById(productFeedstockDto.getProduct_id());
        Optional<FeedstockModel> feedstockModelOptional = feedstockService.findById(productFeedstockDto.getFeedstock_id());

        if (productModelOptional.isEmpty() || feedstockModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedstock or product not found");
        }

        var productFeedstockModel = new ProductFeedstockModel();
        BeanUtils.copyProperties(productFeedstockDto, productFeedstockModel);

        productModelOptional.ifPresent(productFeedstockModel::setProduct_id);
        feedstockModelOptional.ifPresent(productFeedstockModel::setFeedstock_id);

        productFeedstockModel.setCreated_at(productFeedstockModelOptional.get().getCreated_at());
        return ResponseEntity.status(HttpStatus.CREATED).body(productFeedstockService.save(productFeedstockModel));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<ProductFeedstockModel>> listAll(@PageableDefault(sort = "id", direction = Sort.Direction.ASC)Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(productFeedstockService.findAll(pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") Long id) {
        Optional<ProductFeedstockModel> productFeedstockModelOptional = productFeedstockService.findById(id);
        if (productFeedstockModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductFeedstock not found");
        }

        productFeedstockService.delete(productFeedstockModelOptional.get());

        return ResponseEntity.status(HttpStatus.OK).body("ProductFeedstock was deleted with successfully.");
    }
}
