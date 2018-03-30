# 로또 게임

## 실행 방법
* 해당 디렉토리에서 
./mvnw spring-boot:run
을 입력하여 실행합니다.
* 포트는 8080번 입니다.

## 진행 방법
* [로또 구매] 화면에서 ₩1,000 당 1개의 로또 구매한다.
* 로또 구매시 자동(번호 지정)으로 구매가 되며, 수동 구매시 번호를 입력하고 버튼을 누른다.
* 금액을 낮추면 자동 구매가 먼저 사라지며, 수동만 남은 경우에 가장 마지막에 입력한 수동 구매 로또가 사라진다.

* [당첨 번호] 화면에서 담청 번호와 2등 보너스 볼을 입력 후, 당첨 번호를 입력하면 결과 확인이 가능하다. 
* 당첨 번호를 입력하지 않을 경우, 자동으로 등록 된다.

## curl

* 로또 자동 생성
curl -X POST localhost:8080/api/lottoes -d "{}" -H "Content-Type:application/json"&

* 로또 수동 생성
curl -X POST localhost:8080/api/lottoes -d "{\"lotto\" : [1,2,3,4,5,6]}" -H "Content-Type:application/json"

* 담청 번호 생성
curl -X POST localhost:8080/api/winningLottoes -d "{\"lotto\" : [1,2,3,4,5,6], \"luckyNumber\": {\"number\":7}}" -H "Content-Type:application/json"

## todo List
app.js

* 초기화 메소드에서 서버 디비 제거 

result.js

* 당첨 번호 받아오기
* 로또 리스트 출력
* 일치하는 여부 및 금액에 대한 정보 받아오기
* 해당 매칭 결과 받아오기
* 총 수익률 받아오기
* 당첨 번호는 맨 마지막에 등록한 것으로 비교하기.
  
app.js 

* state & history 관리
* 자동 페이지 이동.