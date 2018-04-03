package com.derren.tmon.lotto.service;

import com.derren.tmon.lotto.domain.*;
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
        List<Long> wLottoIds = getWLottoIds(count);
        if (wLottoIds != null && !wLottoIds.isEmpty()) {
            return getNotInWLottoId(wLottoIds, count);
        }
        return lottoRepository.findLottosByOrderByIdDesc(new PageRequest(0, count))
                .stream()
                .sorted(Comparator.comparing(Lotto::getId))
                .collect(Collectors.toList());
    }

    private List<Lotto> getNotInWLottoId(List<Long> wLottoIds, Integer count) {
        return lottoRepository.findLottosByIdIsNotInOrderByIdDesc(wLottoIds, new PageRequest(0, count))
                .stream()
                .sorted(Comparator.comparing(Lotto::getId))
                .collect(Collectors.toList());
    }


    private List<Long> getWLottoIds(Integer count) {
        return wLottoRepository.findWinningLottosByOrderByIdDesc(new PageRequest(0, count))
                .stream()
                .map(WinningLotto::getLottoId)
                .collect(Collectors.toList());
    }

    public WinningLotto getLastWinningLotto() {
        return wLottoRepository.findFirstByOrderByIdDesc();
    }
}
