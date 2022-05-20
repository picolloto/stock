package com.api.stock.services;

import com.api.stock.models.FeedstockModel;
import com.api.stock.repositories.FeedstockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class FeedstockService {

    @Autowired
    private FeedstockRepository feedstockRepository;

    @Transactional
    public FeedstockModel save(FeedstockModel feedstockModel) {
        return feedstockRepository.save(feedstockModel);
    }

    public Page<FeedstockModel> findAll(Pageable pageable) {
        return feedstockRepository.findAll(pageable);
    }

    public Optional<FeedstockModel> findById(Long id) {
        return feedstockRepository.findById(id);
    }

    public void delete(FeedstockModel feedstockModel) {
        feedstockRepository.delete(feedstockModel);
    }
}
