package com.derren.tmon.lotto.service;

import com.derren.tmon.lotto.domain.LottoRepository;
import com.derren.tmon.lotto.domain.WinningLottoRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("lottoService")
public class LottoService {

    @Resource(name = "lottoRepository")
    private LottoRepository lottoRepository;

    @Resource(name = "winningLottoRepository")
    private WinningLottoRepository winningLottoRepository;

}
