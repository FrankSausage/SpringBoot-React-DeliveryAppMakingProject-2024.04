package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.STORE_DELETE_FAIL;
import static com.team3.DeliveryProject.responseCode.ErrorCode.STORE_UPDATE_FAIL;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.store.StoreAddInnerAddressCodesRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDetailRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateInnerDeliveryAddressesRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.store.StoreDetailOwnerResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreDetailUserResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreListInnerResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreListResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreOwnerListInnerResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreOwnerListResponseDto;
import com.team3.DeliveryProject.entity.AddressCode;
import com.team3.DeliveryProject.entity.Dibs;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.AddressCodeRepository;
import com.team3.DeliveryProject.repository.DibsRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class StoreServiceImpl implements StoreService {

    private final StoresRepository storesRepository;
    private final MenuRepository menuRepository;
    private final UsersRepository usersRepository;
    private final DibsRepository dibsRepository;
    private final AddressCodeRepository addressCodeRepository;

    @Override
    public ResponseEntity<Response> addStore(StoreAddRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));

        Stores stores = new Stores(users.getUserId(), requestDto.getName(), requestDto.getType(),
            requestDto.getCategory(), requestDto.getAddress(), requestDto.getStorePictureName(),
            requestDto.getPhone(), requestDto.getContent(), requestDto.getMinDeliveryPrice(),
            requestDto.getDeliveryTip(), requestDto.getMinDeliveryTime(),
            requestDto.getMaxDeliveryTime(), 0, 0, 0, requestDto.getOperationHours(),
            requestDto.getClosedDays(),
            LocalDateTime.now(), LocalDateTime.now(), "일반");

        Long storeId = storesRepository.save(stores).getStoreId();

        List<StoreAddInnerAddressCodesRequestDto> addressCodes = requestDto.getAddressCodes();

        for(StoreAddInnerAddressCodesRequestDto storeAddInnerAddressCodesRequestDto : addressCodes){
            AddressCode addressCode = new AddressCode(storeId, storeAddInnerAddressCodesRequestDto.getAddressCode(), storeAddInnerAddressCodesRequestDto.getDeliveryAddress());
            addressCodeRepository.save(addressCode);
        }

        System.out.println("저장된거 제대로 됫는지 출력해보기 (아래)");
        System.out.println(storesRepository.findById(storeId));
        return Response.toResponseEntity(STORE_ADD_SUCCESS);
    }
    @Transactional
    @Override
    public ResponseEntity<Response> updateStore(StoreUpdateRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));

        Stores stores = storesRepository.findById(requestDto.getStoreId())
            .orElseThrow(() -> new RuntimeException("Store not found"));

        List<StoreUpdateInnerDeliveryAddressesRequestDto> addressCodes = requestDto.getAddressCodes();

        if (users.getUserId() == stores.getUserId()) {

            stores.setName(requestDto.getName());
            stores.setType(requestDto.getType());
            stores.setCategory(requestDto.getCategory());
            stores.setAddress(requestDto.getAddress());
            stores.setStorePictureName(requestDto.getStorePictureName());
            stores.setPhone(requestDto.getPhone());
            stores.setContent(requestDto.getContent());
            stores.setMinDeliveryPrice(requestDto.getMinDeliveryPrice());
            stores.setDeliveryTip(requestDto.getDeliveryTip());
            stores.setMinDeliveryTime(requestDto.getMinDeliveryTime());
            stores.setMaxDeliveryTime(requestDto.getMaxDeliveryTime());
            stores.setOperationHours(requestDto.getOperationHours());
            stores.setClosedDays(requestDto.getClosedDays());
            stores.setModifiedDate(LocalDateTime.now());
            storesRepository.save(stores);

            //기존 옵션 삭제후 작업 시작하기
            addressCodeRepository.deleteAllByStoreId(requestDto.getStoreId());

            for(StoreUpdateInnerDeliveryAddressesRequestDto innerDto : addressCodes){
                AddressCode addressCode = new AddressCode(requestDto.getStoreId(), innerDto.getAddressCode(),
                    innerDto.getDeliveryAddress());
                addressCodeRepository.save(addressCode);
            }
            return Response.toResponseEntity(STORE_UPDATE_SUCCESS);
        } else {
            return Response.toResponseEntity(STORE_UPDATE_FAIL);
        }
    }

    @Override
    public Optional<Stores> getUpdateStore(Long storeId) {
        return storesRepository.findById(storeId);
    }

    @Override
    public ResponseEntity<Response> deleteStore(StoreDeleteRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));
        Stores stores = storesRepository.findById(requestDto.getStoreId())
            .orElseThrow(() -> new RuntimeException("Store not found"));
        if (users.getUserId() == stores.getUserId()) {
            stores.setStatus("삭제");
            storesRepository.save(stores);
            return Response.toResponseEntity(STORE_DELETE_SUCCESS);
        } else {
            return Response.toResponseEntity(STORE_DELETE_FAIL);
        }
    }

    @Override
    public StoreListResponseDto getStoreList(StoreListRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));
        Long addrCode = users.getAddressCode();
        List<Stores> storesListByCategory = new ArrayList<>();
        if(requestDto.getQuery().equals("전체")){
            storesListByCategory = storesRepository.findAll();
        }else{
            storesListByCategory = storesRepository.findByCategoryContaining(
                requestDto.getQuery());
        }
        List<Stores> storesListByName = storesRepository.findByNameContaining(
            requestDto.getQuery());
        List<Long> storeIdListByMenu = menuRepository.findDistinctStoreIdsByContainingName(requestDto.getQuery());
        List<Stores> storesListByMenu = new ArrayList<>();
        for(Long storeId : storeIdListByMenu){
            Stores stores = storesRepository.findById(storeId).orElseThrow(()->new RuntimeException("store not found"));
            storesListByMenu.add(stores);
        }

        List<StoreListInnerResponseDto> filteredStores = new ArrayList<>();

        for (Stores store : storesListByCategory) {
            if(store.getStatus().equals("삭제")){
                continue;
            }
            Long storeId = store.getStoreId();
            List<AddressCode> addressCodes = addressCodeRepository.findAllByStoreId(storeId)
                .orElseThrow(
                    () -> new RuntimeException("storeId에 해당하는 데이터가 addressCode 테이블에 존재하지 않습니다."));
            // AddressCode 리스트에서 유저의 addrCode와 일치하는지 확인 ㅇㅇ
            for (AddressCode addressCode : addressCodes) {
                if (addressCode.getAddressCode().equals(addrCode)) {
                    Boolean b = dibsRepository.existsByUserIdAndStoreId(users.getUserId(), storeId);
                    String isDibs = "";
                    if(b == true){
                        isDibs = "찜";
                    }else{
                        isDibs = "일반";
                    }
                    // 조건에 맞는 Store 정보를 DTO로 변환하고 리스트에 추가
                    filteredStores.add(convertToDto(store, isDibs,isOpened(store)));
                    break;  // 일치하는 주소 코드를 찾으면 더 이상 반복하지 않음
                }
            }
        }
        for (Stores store : storesListByName) {
            if(store.getStatus().equals("삭제")){
                continue;
            }
            Long storeId = store.getStoreId();
            List<AddressCode> addressCodes = addressCodeRepository.findAllByStoreId(storeId)
                .orElseThrow(
                    () -> new RuntimeException("storeId에 해당하는 데이터가 addressCode 테이블에 존재하지 않습니다."));
            // AddressCode 리스트에서 유저의 addrCode와 일치하는지 확인 ㅇㅇ
            for (AddressCode addressCode : addressCodes) {
                if (addressCode.getAddressCode().equals(addrCode)) {
                    Boolean b = dibsRepository.existsByUserIdAndStoreId(users.getUserId(), storeId);
                    String isDibs = "";
                    if(b == true){
                        isDibs = "찜";
                    }else{
                        isDibs = "일반";
                    }

                    // 조건에 맞는 Store 정보를 DTO로 변환하고 리스트에 추가
                    if (!filteredStores.contains(convertToDto(store, isDibs, isOpened(store)))) {
                        filteredStores.add(convertToDto(store, isDibs,isOpened(store)));
                    }
                    break;  // 일치하는 주소 코드를 찾으면 더 이상 반복하지 않음
                }
            }
        }
        for (Stores store : storesListByMenu) {
            if(store.getStatus().equals("삭제")){
                continue;
            }
            Long storeId = store.getStoreId();
            List<AddressCode> addressCodes = addressCodeRepository.findAllByStoreId(storeId)
                .orElseThrow(
                    () -> new RuntimeException("storeId에 해당하는 데이터가 addressCode 테이블에 존재하지 않습니다."));
            // AddressCode 리스트에서 유저의 addrCode와 일치하는지 확인 ㅇㅇ
            for (AddressCode addressCode : addressCodes) {
                if (addressCode.getAddressCode().equals(addrCode)) {
                    Boolean b = dibsRepository.existsByUserIdAndStoreId(users.getUserId(), storeId);
                    String isDibs = "";
                    if(b == true){
                        isDibs = "찜";
                    }else{
                        isDibs = "일반";
                    }

                    // 조건에 맞는 Store 정보를 DTO로 변환하고 리스트에 추가
                    if (!filteredStores.contains(convertToDto(store, isDibs, isOpened(store)))) {
                        filteredStores.add(convertToDto(store, isDibs,isOpened(store)));
                    }
                    break;  // 일치하는 주소 코드를 찾으면 더 이상 반복하지 않음
                }
            }
        }
        // 정렬 로직
        String sortCriteria = requestDto.getSort();
        switch (sortCriteria) {
            case "dibs":
                filteredStores.sort(
                    Comparator.comparing(StoreListInnerResponseDto::getDibsCount).reversed());
                break;
            case "rating":
                filteredStores.sort(
                    Comparator.comparing(StoreListInnerResponseDto::getRating).reversed());
                break;
            case "reviewCount":
                filteredStores.sort(
                    Comparator.comparing(StoreListInnerResponseDto::getReviewCount).reversed());
                break;
        }

        // 결과 DTO 생성
        StoreListResponseDto responseDto = StoreListResponseDto.builder()
            .storeList(filteredStores)
            .build();
        return responseDto;
    }

    @Override
    public StoreDetailUserResponseDto getStoreDetailUser(StoreDetailRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));
        Stores stores = storesRepository.findById(requestDto.getStoreId())
            .orElseThrow(() -> new RuntimeException("store not found"));
        Optional<Dibs> dibs = dibsRepository.findByUserIdAndStoreId(users.getUserId(), stores.getStoreId());
        String isDibed = "";
        if(dibs.isPresent()){
            isDibed = dibs.get().getStatus();
        }else{
            isDibed = null;
        }
        StoreDetailUserResponseDto responseDto = StoreDetailUserResponseDto.builder()
            .role(users.getRole())
            .name(stores.getName())
            .type(stores.getType())
            .category(stores.getCategory())
            .address(stores.getAddress())
            .storePictureName(stores.getStorePictureName())
            .phone(stores.getPhone())
            .content(stores.getContent())
            .minDeliveryPrice(stores.getMinDeliveryPrice())
            .deliveryTip(stores.getDeliveryTip())
            .minDeliveryTime(stores.getMinDeliveryTime())
            .maxDeliveryTime(stores.getMaxDeliveryTime())
            .rating(stores.getRating())
            .dibsCount(stores.getDibsCount())
            .reviewCount(stores.getReviewCount())
            .operationHours(stores.getOperationHours())
            .closedDays(stores.getClosedDays())
            .createdDate(stores.getCreatedDate())
            .modifiedDate(stores.getModifiedDate())
            .isDibed(isDibed)
            .isOpened(isOpened(stores))
            .build();
        return responseDto;
    }

    @Override
    public StoreDetailOwnerResponseDto getStoreDetailOwner(StoreDetailRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));
        Stores stores = storesRepository.findById(requestDto.getStoreId())
            .orElseThrow(() -> new RuntimeException("store not found"));


        StoreDetailOwnerResponseDto responseDto = StoreDetailOwnerResponseDto.builder()
            .role(users.getRole())
            .name(stores.getName())
            .type(stores.getType())
            .category(stores.getCategory())
            .address(stores.getAddress())
            .storePictureName(stores.getStorePictureName())
            .phone(stores.getPhone())
            .content(stores.getContent())
            .minDeliveryPrice(stores.getMinDeliveryPrice())
            .deliveryTip(stores.getDeliveryTip())
            .minDeliveryTime(stores.getMinDeliveryTime())
            .maxDeliveryTime(stores.getMaxDeliveryTime())
            .rating(stores.getRating())
            .dibsCount(stores.getDibsCount())
            .reviewCount(stores.getReviewCount())
            .operationHours(stores.getOperationHours())
            .closedDays(stores.getClosedDays())
            .createdDate(stores.getCreatedDate())
            .modifiedDate(stores.getModifiedDate())
            .build();
        return responseDto;    }

    public int isOpened(Stores stores){
        // 현재 날짜와 시간 가져오기
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        // 현재 요일 가져오기
        DayOfWeek currentDayOfWeek = currentDate.getDayOfWeek();

        // closedDays 파싱하기
        String closedDays = stores.getClosedDays();
        List<String> closedDaysList = Arrays.asList(closedDays.split(","));

        // 현재 요일이 closedDays에 있는지 확인
        String currentDayOfWeekString = currentDayOfWeek.getDisplayName(TextStyle.FULL, Locale.KOREAN);
        if (closedDaysList.contains(currentDayOfWeekString)) {
            return 0;
        }

        // operationHours 파싱하기
        String operationHours = stores.getOperationHours();
        String[] hours = operationHours.split("~");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime openTime = LocalTime.parse(hours[0].trim(), timeFormatter);
        LocalTime closeTime = LocalTime.parse(hours[1].trim(), timeFormatter);

        // 현재 시간이 영업 시간 내에 있는지 확인
        if (currentTime.isAfter(openTime) && currentTime.isBefore(closeTime)) {
            return 1;
        } else {
            return 0;
        }

    }
    @Override
    public StoreOwnerListResponseDto getStoreListForOwner(StoreOwnerListRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("user not found"));
        List<Stores> storesList = storesRepository.findAllByUserId(users.getUserId());
        List<StoreOwnerListInnerResponseDto> responseDtos = new ArrayList<>();
        for (Stores store : storesList) {
            StoreOwnerListInnerResponseDto responseDto = StoreOwnerListInnerResponseDto.builder()
                .storeId(store.getStoreId())
                .name(store.getName())
                .storePictureName(store.getStorePictureName())
                .rating(store.getRating())
                .dibsCount(store.getDibsCount())
                .reviewCount(store.getReviewCount())
                .build();

            responseDtos.add(responseDto);
        }

        StoreOwnerListResponseDto resultDto = StoreOwnerListResponseDto.builder()
            .storeList(responseDtos)
            .build();
        return resultDto;
    }

    private StoreListInnerResponseDto convertToDto(Stores store, String isDibed, int isOpened) {
        if (store == null) {
            return null;
        }
        return new StoreListInnerResponseDto(store.getStoreId(), store.getName(),
            store.getStorePictureName(),
            store.getRating(), store.getDibsCount(), store.getReviewCount(), isDibed, isOpened);
    }


}