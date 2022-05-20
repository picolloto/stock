package com.api.stock.controllers;

import com.api.stock.dtos.FeedstockDto;
import com.api.stock.models.FeedstockModel;
import com.api.stock.services.FeedstockService;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/feedstock")
public class FeedstockController {

    @Autowired
    private FeedstockService feedstockService;

    @GetMapping
    public ResponseEntity<Page<FeedstockModel>> listAll(@PageableDefault(sort = "id", direction = Sort.Direction.ASC)Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(feedstockService.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<Object> insert(@RequestBody @Valid FeedstockDto feedstockDto) {
        var feedstockModel = new FeedstockModel();
        BeanUtils.copyProperties(feedstockDto, feedstockModel);
        feedstockModel.setCreated_at(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(feedstockService.save(feedstockModel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") Long id,
                                         @RequestBody @Valid FeedstockDto feedstockDto) {
        Optional<FeedstockModel> feedstockModelOptional = feedstockService.findById(id);
        if (feedstockModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedstock not found");
        }

        var feedstockModel = new FeedstockModel();
        BeanUtils.copyProperties(feedstockDto, feedstockModel);
        feedstockModel.setCreated_at(feedstockModelOptional.get().getCreated_at());
        return ResponseEntity.status(HttpStatus.CREATED).body(feedstockService.save(feedstockModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") Long id) {
        Optional<FeedstockModel> feedstockModelOptional = feedstockService.findById(id);
        if (feedstockModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedstock not found");
        }

        feedstockService.delete(feedstockModelOptional.get());

        return ResponseEntity.status(HttpStatus.OK).body("Feedstock was deleted with successfully.");
    }
}
