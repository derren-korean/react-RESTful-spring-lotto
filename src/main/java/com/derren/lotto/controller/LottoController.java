package com.derren.lotto.controller;

import com.derren.lotto.domain.Lotto;
import com.derren.lotto.domain.WinningLotto;
import com.derren.lotto.service.LottoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("/lotto")
public class LottoController {

    final static String ROOT = "/api";

    @Autowired
    private LottoService lottoService;

    @RequestMapping(method = RequestMethod.GET, value = "/last/{count}")
    ResponseEntity<?> getLastNLottoList(@PathVariable final Integer count) {
        List<Resource<Lotto>> content = new ArrayList<>();
        lottoService.getLastNLottoList(count).stream()
                .forEachOrdered(lotto->{
                    Resource<Lotto> resource = new Resource<>(lotto);
                    resource.add(linkTo(HomeController.class)
                            .slash(ROOT)
                            .slash("lottoes")
                            .slash(lotto.getId())
                            .withRel("lottoes"));
                    content.add(resource);
                });
        Resources<Resource<Lotto>> resources = new Resources<>(content);
        resources.add(linkTo(methodOn(LottoController.class).getLastNLottoList(count)).withRel("lottoes"));
        return ResponseEntity.ok(resources.getContent());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/last/winning")
    ResponseEntity<?> getLastWinningLotto() {
        WinningLotto winningLotto = lottoService.getLastWinningLotto();
        if (winningLotto == null) {
            return ResponseEntity.noContent().build();
        }
        Resource<WinningLotto> resource = new Resource<>(winningLotto);
        resource.add(linkTo(HomeController.class)
                .slash(ROOT)
                .slash("winninglottoes")
                .slash(winningLotto.getId())
                .withRel("lottoes"));
        return ResponseEntity.ok(resource);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/active")
    ResponseEntity<?> getActiveLotto() {
        List<Resource<Lotto>> lottoList = new ArrayList<>();
        lottoService.findActiveLotto()
                .forEach(lotto->{
                    Resource<Lotto> resource = new Resource<>(lotto);
                    resource.add(linkTo(HomeController.class)
                            .slash(ROOT)
                            .slash("lottoes")
                            .slash(lotto.getId())
                            .withRel("lottoes"));
                    lottoList.add(resource);
                });
        Resources<Resource<Lotto>> resources = new Resources<>(lottoList);
        resources.add(linkTo(methodOn(LottoController.class).getActiveLotto()).withRel("lottoes"));
        return ResponseEntity.ok(resources.getContent());
    }
}
