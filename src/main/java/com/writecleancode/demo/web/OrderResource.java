package com.writecleancode.demo.web;

import com.writecleancode.demo.domain.Order;
import com.writecleancode.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderResource {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getByOrderId(@PathVariable Long id) {
        return ResponseEntity.ok(orderRepository.findById(id).orElse(null));
    }

    @PostMapping
    public void save(@RequestBody Order order) {
        orderRepository.save(order);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}
