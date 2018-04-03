package com.derren.lotto.domain;

import com.derren.lotto.util.LottoRecorder;
import lombok.Data;

import javax.persistence.Entity;
import java.util.Objects;

@Data
@Entity
public class WinningLotto extends Lotto {
    private LottoNumber luckyNumber;

    public WinningLotto(Lotto jackpot, LottoNumber luckyNumber) {
        super(jackpot);
        this.luckyNumber = luckyNumber;
    }

    // used-by-client
    public WinningLotto() {
        super(new Lotto());

        LottoNumber luckyNumber = new LottoNumber();
        while (super.contains(luckyNumber)) {
            luckyNumber = new LottoNumber();
        }
        this.luckyNumber = luckyNumber;
    }

    public Long getLottoId() {
        return super.getId();
    }

    public LottoNumber getLuckyNumber() {
        return luckyNumber;
    }

    public int containCount(Lotto lotto) {
        return super.containCount(lotto);
    }

    public LottoRecorder match(Lotteries lottoList, LottoNumber luckyNumber) {
        Objects.requireNonNull(lottoList);
        return new LottoRecorder(this, lottoList);
    }
}