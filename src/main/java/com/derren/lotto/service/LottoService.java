package com.derren.lotto.service;

import com.derren.lotto.domain.Lotto;
import com.derren.lotto.domain.LottoRepository;
import com.derren.lotto.domain.WinningLotto;
import com.derren.lotto.domain.WinningLottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class LottoService {

    @Autowired
    private LottoRepository lottoRepository;

    @Autowired
    private WinningLottoRepository wLottoRepository;

    public List<Lotto> getLastNLottoList(Integer count) {
        return getLastNLottoList(getWLottoIds(count), count)
                .stream()
                .sorted(Comparator.comparing(Lotto::getId))
                .collect(Collectors.toList());
    }

    private List<Long> getWLottoIds(Integer count) {
        return wLottoRepository.findWinningLottosByActiveIsTrueOrderByIdDesc(new PageRequest(0, count))
                .stream()
                .map(WinningLotto::getLottoId)
                .collect(Collectors.toList());
    }

    private List<Lotto> getLastNLottoList(List<Long> wLottoIds, Integer count) {
        if (wLottoIds != null && !wLottoIds.isEmpty()) {
            return getNotInWLottoId(wLottoIds, count);
        }
        return lottoRepository.findLottosByActiveIsTrueOrderByIdDesc(new PageRequest(0, count));
    }

    private List<Lotto> getNotInWLottoId(List<Long> wLottoIds, Integer count) {
        return lottoRepository.findLottosByActiveIsTrueAndIdIsNotInOrderByIdDesc(wLottoIds, new PageRequest(0, count));
    }

    public WinningLotto getLastWinningLotto() {
        return wLottoRepository.findFirstByActiveIsTrueOrderByIdDesc();
    }

    public List<Lotto> findActiveLotto() {
        return lottoRepository.findAllByActiveIsTrue();
    }
}
