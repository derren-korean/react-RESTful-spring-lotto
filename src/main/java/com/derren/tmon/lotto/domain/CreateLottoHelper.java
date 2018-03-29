package com.derren.tmon.lotto.domain;

import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RestResource(path="/api/buyLotto")
public class CreateLottoHelper {

    private Integer money;
    private List<Lotto> numbers;

    public Integer getMoney() {
        return money;
    }

    public void setMoney(Integer money) {
        this.money = money;
    }

    public List<Lotto> getNumbers() {
        return numbers;
    }

    public void setNumbers(List<Lotto> numbers) {
        this.numbers = numbers;
    }
}