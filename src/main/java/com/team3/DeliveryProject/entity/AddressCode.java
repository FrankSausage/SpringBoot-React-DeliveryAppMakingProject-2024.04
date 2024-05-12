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
@Table(name = "AddressCode")
public class AddressCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressCodeId;
    private Long storeId;
    private Long addressCode;

    public AddressCode(Long storeId, Long addressCode) {
        this.storeId = storeId;
        this.addressCode = addressCode;
    }
}
