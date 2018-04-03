package com.derren.lotto.controller;

import com.derren.lotto.domain.Lotteries;
import com.derren.lotto.domain.Lotto;
import com.derren.lotto.domain.LottoRank;
import com.derren.lotto.domain.WinningLotto;
import com.derren.lotto.service.LottoService;
import com.derren.lotto.util.LottoRecorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("/result")
public class ResultController {

    final static int MAX_LOTTO_COUNT = 10;

    @Autowired
    LottoService lottoService;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<?> getProducers() {

        List<Lotto> lottoList = lottoService.getLastNLottoList(MAX_LOTTO_COUNT);
        if (lottoList == null || lottoList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        WinningLotto winningLotto = lottoService.getLastWinningLotto();
        LottoRecorder lottoRecorder = new LottoRecorder(winningLotto, new Lotteries(lottoList));
        List<String> producers = new ArrayList<>();

        producers.add(toResult(lottoRecorder));
        producers.add(String.valueOf(lottoRecorder.getProfitRatio()));

        Resources<String> resources = new Resources<>(producers);
        resources.add(linkTo(methodOn(ResultController.class).getProducers()).withSelfRel());
        return ResponseEntity.ok(resources);
    }

    private String toResult(LottoRecorder lottoRecorder) {
        return Stream.of(LottoRank.values())
                .map(lottoRank -> String.format("{\"%s\":%d}", lottoRank.name(),lottoRecorder.getLottoCount(lottoRank)))
                .collect(Collectors.joining(","));
    }


}
