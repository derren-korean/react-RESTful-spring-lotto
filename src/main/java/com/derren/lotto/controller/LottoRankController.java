package com.derren.lotto.controller;

import com.derren.lotto.domain.LottoRank;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RepositoryRestController
@RequestMapping("/lottoRank")
public class LottoRankController {

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllRanks() {
        List<Resource<String>> content = new ArrayList<>();
        Arrays.asList(LottoRank.values()).stream()
                .forEach(lottoRank->{
                    if (LottoRank.REST.equals(lottoRank)) return;
                    Resource<String> resource = new Resource<>(lottoRank.toString());
                    resource.add(linkTo(LottoRankController.class).slash(lottoRank.name()).withRel("lottoRank"));
                    content.add(resource);
                });
        Resources<Resource<String>> resources = new Resources<>(content);
        resources.add(linkTo(methodOn(LottoRankController.class).getAllRanks()).withRel("lottoRank"));
        return ResponseEntity.ok(resources.getContent());
    }

    @RequestMapping(method = RequestMethod.GET, value = {"/{name}"})
    public ResponseEntity<?> getRankValues(@PathVariable final String name) {
        LottoRank lottoRank = Stream.of(LottoRank.values())
                .filter(_lottoRank -> _lottoRank.name().equals(name))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
        Resource<String> resource = new Resource<>(lottoRank.toString());
        resource.add(linkTo(LottoRankController.class).slash(lottoRank.name()).withRel("lottoRank"));
        return ResponseEntity.ok(resource);
    }
}