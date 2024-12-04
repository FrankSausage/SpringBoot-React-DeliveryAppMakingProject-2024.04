<p align="center">
  <img src="https://github.com/user-attachments/assets/f414070e-2f01-4b62-86fc-385c585d285e" />
</p>

📌 목차 
----


1. [📚 프로젝트 개요](https://github.com/FrankSausage/SpringBoot-React-DeliveryAppMakingProject-2024.04/blob/main/README.md#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%9C%EC%9A%94)


2. [📖 주요 기능](https://github.com/FrankSausage/SpringBoot-React-DeliveryAppMakingProject-2024.04/blob/main/README.md#-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

  
3. [🛠️ 기술 스택](https://github.com/FrankSausage/SpringBoot-React-DeliveryAppMakingProject-2024.04/blob/main/README.md#-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

 
4. [🏗️ ERD](https://github.com/FrankSausage/SpringBoot-React-DeliveryAppMakingProject-2024.04/blob/main/README.md#-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

 
5. [🖨️ API 명세](https://github.com/FrankSausage/SpringBoot-React-DeliveryAppMakingProject-2024.04/blob/main/README.md#-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

📚 프로젝트 개요
----
#### 📆 개발기간  
- 2024년 4월 16일 ~ 6월 13일 


#### 🔖 프로젝트 주제
- React를 활용한 반응형 웹 어플리케이션 구현
- 모바일 환경에서 구축되어 있는 어플리케이션 생태를 웹으로 확장


#### 🙋‍♂️ 팀원 구성 
<img alt="Static Badge" src="https://img.shields.io/badge/FE-%EA%B9%80%EB%8F%99%ED%98%B8-green?style=flat-square">|<img alt="Static Badge" src="https://img.shields.io/badge/FE-%EC%9C%A0%ED%9D%AC%EC%9E%AC-green?style=flat-square">|<img alt="Static Badge" src="https://img.shields.io/badge/FE-%EA%B9%80%EA%B8%B0%EC%A3%BC-green?style=flat-square">|<img alt="Static Badge" src="https://img.shields.io/badge/BE-%EC%9C%A0%EA%B8%B0%EC%A4%80-green?style=flat-square">|
---|---|---|---|
페이지 설계 및 <br/> 로직 구현|페이지 디자인 및 <br/> DB 데이터 관리|페이지 설계 및 <br/> 페이지 디자인|로직 구현 및 <br/> DB 테이블 설계|


📖 주요 기능
----
<details>
  <summary>
    
#### 로그인 / 회원가입 화면
  </summary>
  ● 로그인 화면
  <img src="https://github.com/user-attachments/assets/7d7e8ad1-7b9d-44aa-b87c-95e761e95464" />

  ● 유저 회원가입 화면
  <img src="https://github.com/user-attachments/assets/d8ffe782-654c-4659-be78-70ef696873c5" />

  ● 점주 회원가입 화면
  <img src="https://github.com/user-attachments/assets/35585056-c362-41e0-8427-6017771a9333" />
</details>

<details>
  <summary>

#### 1-1. 유저 화면
  </summary>
  <br/>  
  ● 메인 화면
   <img src="https://github.com/user-attachments/assets/008dbdee-7273-4606-af07-2d3745fba121" />
   
  <details>
    <summary> 1-2. 홈 화면  </summary>
  <br/>   
  ● 정보 수정 화면
   <img src="https://github.com/user-attachments/assets/cc9d229d-dba4-438c-96c2-44a83c0bd925" />

  ● 리뷰 관리 화면
   <img src="https://github.com/user-attachments/assets/45967279-3be2-4fec-bbb4-222f7f2e16f1" />

  ● 찜목록 화면
   <img src="https://github.com/user-attachments/assets/34ca6c83-c50b-4f49-b63f-7639bdf3a2f8" />

  ● 장바구니 화면
   <img src="https://github.com/user-attachments/assets/42468ffd-8c1f-46ab-9284-c0de24ac9189" />
  
  ● 주문내역 화면
   <img src="https://github.com/user-attachments/assets/07aa7482-8002-4d42-8b7e-c0ee5f490306" />
  
  </details>

  
  <details>
    <summary> 1-2. 유저 주소 수정 </summary>
  <br/>
  ● 유저 주소 화면
   <img src="https://github.com/user-attachments/assets/6ca9508f-ab3b-45d8-9c90-13a759a78e2c" />
  
  ● 등록된 주소 측면의 아이콘 클릭을 통해 현재 주소 변경
   <img src="https://github.com/user-attachments/assets/04c8f6ab-31a4-45b0-9cfb-aeed67f44c32" />
  
  ● 주소 검색 API를 사용한 검색 기능
   <img src="https://github.com/user-attachments/assets/4e69674a-2e68-4325-93d6-02005573c9b7" />

  ● 주소가 입력 됐을 시 버튼 활성화
   <img src="https://github.com/user-attachments/assets/49b996d1-b4dd-43d8-bcbd-7d867cd64a0a" />

  
  </details>

  <details>
    <summary> 1-3. 유저 가게 및 주문 화면 </summary>
  <br/>   
  ● 가게 화면
   <img src="https://github.com/user-attachments/assets/a28c3f64-12d7-45a1-8ad5-ced4d5375174" />
   
  ● 상단의 카테고리 선택을 통한 가게 정렬 기능
   <img src="https://github.com/user-attachments/assets/e93ff952-2736-4bd8-9c95-01dfeb025e01" />

  ● 검색창을 통한 가게 검색 기능
   <img src="https://github.com/user-attachments/assets/de43a21a-10dd-4f97-9cc2-4d26f61dbda0" />

  ● 가게 메뉴 화면
   <img src="https://github.com/user-attachments/assets/55105515-b7e7-447a-9468-e3fd57e16290" />

  ● 상단의 카테고리 선택을 통한 메뉴 정렬 기능
   <img src="https://github.com/user-attachments/assets/f92ffac6-d922-41dc-a296-a155acbafc6c" />

  ● 메뉴 선택 화면
   <img src="https://github.com/user-attachments/assets/9a3a8424-fd6d-47be-820c-dca248386663" />

   
  ● 주문 화면
   <img src="https://github.com/user-attachments/assets/9526692a-bf5d-44f2-b2a4-c054c1b1bdbb" />
   
  ● Toss API를 활용한 주문 결제창
   <img src="https://github.com/user-attachments/assets/f8fafa04-6d72-4f2f-ae51-9da2f46045a8" />
   
  ● Toss 결제 화면
  
   <img src="https://github.com/user-attachments/assets/e96c76d0-2a64-4bf7-aca5-318a5f0791b5" />
   
  ● Toss 결제 완료 화면
  
   <img src="https://github.com/user-attachments/assets/bf838c00-9e47-42ce-9f58-de5ac023eae5" />

   
  </details>
  

</details>

<details>
  <summary>

#### 2-1. 점주 화면
  </summary>
@@@@@@@@@@@@@@@@@@@@@@@@

  <details>
    <summary> 2-2. 홈 화면  </summary>
  2-2 내용
  </details>
  
  <details>
    <summary> 2-3. 가게 등록/확인/수정/삭제  </summary>
  2-3 내용
  </details>
  
  <details>
    <summary> 2-4. 메뉴 등록/확인/수정/삭제 </summary>
  2-4 내용
  </details>
  
@@@@@@@@@@@@@@@@@@@@@@@@@@
</details>

🛠️ 기술 스택
----

### 🔧 Tool
<div>
  <img src="https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" />
</div>

### 📑 DB
<div>
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" />
</div>

### 📂 Back-end
<div>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Lombok-CC2927?style=for-the-badge&logoColor=white" />
</div>

### 🖥️ Front-end
<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
</div>
<div>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />
</div> 
  
- ### 📞 Communication
<div>
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />  
</div>

🏗️ ERD
----
<img src="https://github.com/user-attachments/assets/6e6e7af8-c236-4cd3-ae7c-b19c8103a71f" />


🖨️ API명세
----
[API 명세 자료](https://docs.google.com/spreadsheets/d/19CAVK8HQnf0X1SrffZ50eb8AjZtd64PRHUc8RU-Vs74/edit?gid=0#gid=0)
