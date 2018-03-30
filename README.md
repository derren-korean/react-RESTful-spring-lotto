# 로또 게임

## 실행 방법
* 해당 디렉토리에서 
./mvnw spring-boot:run
을 입력하여 실행합니다.
* 포트는 8080번 입니다.

## 진행 방법
* [로또 구매] 화면에서 ₩1,000 당 1개의 로또 구매 한다.
  * 로또 구매시 자동(번호 지정)으로 구매가 되며, 수동 구매시 번호를 입력하고 버튼을 누른다.
  * 금액을 낮추면 자동 구매가 먼저 사라지며, 수동만 남은 경우에 가장 마지막에 입력한 수동 구매 로또가 사라진다.

* [당첨 번호] 화면에서 담청 번호와 2등 보너스 볼을 입력 후, 당첨 번호를 입력하면 결과 확인이 가능하다. 

* [결과 확인] 결과를 확인하고 처음부터 게임을 다시 시작할 수 있다.
  * 마지막으로 등록된 당첨 번호를 기준으로 진행한다.
  
## curl

* 로또 자동 생성
curl -X POST localhost:8080/api/lottoes -d "{}" -H "Content-Type:application/json"&

* 로또 수동 생성
curl -X POST localhost:8080/api/lottoes -d "{\"lotto\" : [1,2,3,4,5,6]}" -H "Content-Type:application/json"

* 담청 번호 생성
curl -X POST localhost:8080/api/winningLottoes -d "{\"lotto\" : [1,2,3,4,5,6], \"luckyNumber\": {\"number\":7}}" -H "Content-Type:application/json"