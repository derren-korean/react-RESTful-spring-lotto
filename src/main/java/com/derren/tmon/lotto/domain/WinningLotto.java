package com.derren.tmon.lotto.domain;

import com.derren.tmon.lotto.util.LottoRecorder;
import lombok.Data;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

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