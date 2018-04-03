package com.derren.lotto.util;

import com.derren.lotto.domain.Lotteries;
import com.derren.lotto.domain.Lotto;
import com.derren.lotto.domain.LottoNumber;
import com.derren.lotto.io.InputView;
import com.derren.lotto.io.OutputView;

public class LottoVendor {

    private static LottoVendor instance;

    private LottoVendor() {
    }

    public static LottoVendor getInstance() {
        if ( instance == null ) {
            instance = new LottoVendor();
        }
        return instance;
    }

    public Lotteries buy(int count, boolean manual) {
        return order(count, manual);
    }

    private Lotteries order(Integer count, boolean manual) {
        if (manual) return InputView.inputManualLotteries(count);
        return createAutoLotteries(count);
    }

    private Lotteries createAutoLotteries(Integer count) {
        Lotteries lottery = new Lotteries();
        for (Integer i = 0; i < count; i++) {
            lottery.add(new Lotto());
        }
        return lottery;
    }

    public void result(Lotteries lotteries) {
        Lotto jackpot = InputView.inputManualLotto("당첨 번호를 입력해 주세요.");
        LottoNumber luckyNumber = InputView.inputLuckyNumber(jackpot);

        OutputView.printResult(jackpot.match(lotteries, luckyNumber));
    }
}