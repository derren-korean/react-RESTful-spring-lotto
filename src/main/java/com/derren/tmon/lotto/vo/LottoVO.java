package com.derren.tmon.lotto.vo;

import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.util.Objects;

@NoArgsConstructor
public class LottoVO {

    private long id;

    @Size(min = 11, max = 22)
    private String numbers;

    public LottoVO(String numbers) {
        this(0, numbers);
    }

    public LottoVO(long id, String numbers) {
        this.id = id;
        this.numbers = numbers;
    }
    public long getId() {
        return id;
    }

    public LottoVO setId(long id) {
        this.id = id;
        return this;
    }

    public String getNumbers() {
        return numbers;
    }

    public LottoVO setNumbers(String numbers) {
        this.numbers = numbers;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LottoVO that = (LottoVO) o;
        return Objects.equals(numbers, that.numbers);
    }

}
