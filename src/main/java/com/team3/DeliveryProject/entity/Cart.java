package com.team3.DeliveryProject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;
    private Long userId;
    private Long menuId;
    private Long menuOptionId;
    private Long storeId;
    private int sequence;
    private int quantity;

    public Cart(Long userId, Long menuId, Long menuOptionId, Long storeId, int sequence, int quantity) {
        this.userId = userId;
        this.menuId = menuId;
        this.menuOptionId = menuOptionId;
        this.storeId = storeId;
        this.sequence = sequence;
        this.quantity = quantity;
    }
}
