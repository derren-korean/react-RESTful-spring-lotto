package com.derren.tmon.lotto.domain;

import com.derren.tmon.lotto.support.AbstractEntity;
import com.derren.tmon.lotto.util.LottoParsingUtil;
import com.derren.tmon.lotto.util.LottoRecorder;
import com.derren.tmon.lotto.util.LottoUtil;
import lombok.Data;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Entity
public class Lotto extends AbstractEntity implements Serializable {

    @ElementCollection
    private List<LottoNumber> lotto;

    public Lotto() {
        lotto = new ArrayList<>();
        while (!isFull()) {
            lotto.add(noneExistsNumber());
        }
        Collections.sort(lotto,LottoNumber::compareTo);
    }

    public Lotto(String numbers) {
        if(!LottoUtil.canLotto(numbers)) throw new IllegalArgumentException();
        makeLotto(LottoParsingUtil.toLottoNumberList(numbers));
    }

    public Lotto(List<LottoNumber> numbers) {
        Objects.requireNonNull(numbers);
        makeLotto(numbers);
    }

    public Lotto(Lotto lotto) {
        Objects.requireNonNull(lotto);
        makeLotto(lotto.lotto);
    }

    private void makeLotto(List<LottoNumber> numbers) {
        lotto = numberingJob(numbers);
        if (!isFull()) throw new IllegalArgumentException();
    }

    private List<LottoNumber> numberingJob(List<LottoNumber> numbers) {
        return removeSameNumber(numbers).stream()
                .sorted(LottoNumber::compareTo)
                .collect(Collectors.toList());
    }

    private Set<LottoNumber> removeSameNumber(List<LottoNumber> numbers) {
        return numbers.stream().collect(Collectors.toSet());
    }

    private LottoNumber noneExistsNumber() {
        LottoNumber lottoNumber = new LottoNumber();
        return contains(lottoNumber) ? noneExistsNumber() : lottoNumber;
    }

    public boolean contains(LottoNumber number) {
        return lotto.stream().anyMatch(no -> number.equals(no));
    }

    private boolean isFull() {
        return LottoUtil.isLottoMaxCount(lotto.size());
    }

    public int containCount(Lotto lotto) {
        Objects.requireNonNull(lotto);
        return (int) lotto.lotto.stream().filter(number -> contains(number)).count();
    }

    public LottoRecorder match(Lotteries lottoList, LottoNumber luckyNumber) {
        Objects.requireNonNull(lottoList);
        return new LottoRecorder(new WinningLotto(this, luckyNumber), lottoList);
    }

    @Override
    public String toString() {
        return  "" + lotto;
    }
}