package com.api.stock.controllers;

import com.api.stock.Config;
import com.api.stock.dtos.ProductDto;
import com.api.stock.models.ProductModel;
import com.api.stock.services.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/product")
public class ProductController extends Config {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Object> insert(@RequestBody @Valid ProductDto productDto) {
        var productModel = new ProductModel();
        BeanUtils.copyProperties(productDto, productModel);
        productModel.setCreated_at(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(productModel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") Long id,
                                         @RequestBody @Valid ProductDto productDto) {
        Optional<ProductModel> productModelOptional = productService.findById(id);
        if (productModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedstock not found");
        }
        var productModel = new ProductModel();
        BeanUtils.copyProperties(productDto, productModel);
        productModel.setCreated_at(productModelOptional.get().getCreated_at());
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(productModel));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<ProductModel>> listAll(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.findAll(pageable));
    }

    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> delete(@PathVariable(value = "id") Long id) {
        Optional<ProductModel> productModelOptional = productService.findById(id);
        if (productModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
        try {
            productService.delete(productModelOptional.get());
        } catch (DataIntegrityViolationException e) {
            Throwable cause = e.getRootCause();
            if (cause instanceof ConstraintViolationException ||
                    cause instanceof SQLIntegrityConstraintViolationException ||
                    Objects.requireNonNull(cause).getMessage().contains("violates foreign key constraint"))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Este produto não pode ser removido pois possui um vínculo. Remova o vínculo e tente novamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body("Produto deletado com sucesso.");
    }

}
