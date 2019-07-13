package com.writecleancode.demo.repository;

import com.writecleancode.demo.domain.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductrepository extends JpaRepository<OrderProduct, Long> {
}
