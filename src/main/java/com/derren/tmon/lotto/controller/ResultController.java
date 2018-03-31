package com.derren.tmon.lotto.controller;

import com.derren.tmon.lotto.domain.*;
import com.derren.tmon.lotto.util.LottoRecorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RepositoryRestController
@RequestMapping("/result")
public class ResultController {

    @Autowired
    private final LottoRepository repository;

    @Autowired
    private final WinningLottoRepository wRepository;

    @Autowired
    public ResultController(LottoRepository repo, WinningLottoRepository wrepo) {
        repository = repo;
        wRepository = wrepo;
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<?> getProducers() {
        WinningLotto winningLotto = wRepository.findFirstByOrderByIdDesc();

        List<Lotto> lottoList = repository.findTop11ByOrderByIdDesc()
                .stream()
                .filter(lotto -> !lotto.getId().equals(winningLotto.getLottoId()))
                .collect(Collectors.toList());
        if (lottoList.size()==11) {
            lottoList.remove(10);
        }

        Lotteries lottos = new Lotteries(lottoList);
        LottoRecorder lottoRecorder = new LottoRecorder(winningLotto, lottos);
        List<String> producers = new ArrayList<>();

        String result = Stream.of(LottoRank.values())
                .map(lottoRank -> String.format("{\"%s\":%d}",lottoRank.name(),lottoRecorder.getLottoCount(lottoRank)))
                .collect(Collectors.joining(","));
        producers.add(result);
        producers.add(String.valueOf(lottoRecorder.getProfitRatio()));
        Resources<String> resources = new Resources<>(producers);
        resources.add(linkTo(methodOn(ResultController.class).getProducers()).withSelfRel());
        return ResponseEntity.ok(resources);
    }
}
