package com.team3.DeliveryProject.dto.koodohyeon;


import com.team3.DeliveryProject.entity.Dibs;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DibsDto {

    private Long userId;
    private Long storeId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static DibsDto toDTO(Dibs entity) {
        return DibsDto.builder()
            .userId(entity.getUserId())
            .storeId(entity.getStoreId())
            .createdDate(entity.getCreatedDate())
            .modifiedDate(entity.getModifiedDate())
            .status(entity.getStatus())
            .build();
    }
}
