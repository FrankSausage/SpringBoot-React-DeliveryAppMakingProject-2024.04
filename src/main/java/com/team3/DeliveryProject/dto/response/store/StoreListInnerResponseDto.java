package com.team3.DeliveryProject.dto.response.store;

import java.util.Objects;
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
public class StoreListInnerResponseDto {

    private Long storeId;
    private String name;
    private String storePictureName;
    private Double rating;
    private int dibsCount;
    private int reviewCount;
    private String isDibed;
    private int isOpened;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StoreListInnerResponseDto that = (StoreListInnerResponseDto) o;
        return storeId.equals(that.storeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(storeId);
    }

}
