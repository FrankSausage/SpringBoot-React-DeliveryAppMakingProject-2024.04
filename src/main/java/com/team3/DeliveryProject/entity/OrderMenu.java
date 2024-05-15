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
@Table(name = "OrderMenu")
public class OrderMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderMenuId;
    private Long orderId;
    private Long menuOptionId;
    private Long menuId;
    private int sequence;
    private int quantity;

    public OrderMenu(Long orderId, Long menuOptionId, Long menuId, int sequence,
        int quantity) {
        this.orderId = orderId;
        this.menuOptionId = menuOptionId;
        this.menuId = menuId;
        this.sequence = sequence;
        this.quantity = quantity;
    }
}
