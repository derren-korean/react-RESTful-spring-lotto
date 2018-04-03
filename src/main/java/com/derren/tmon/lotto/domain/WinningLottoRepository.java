package com.derren.tmon.lotto.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;
import java.util.List;

@RestResource
public interface WinningLottoRepository extends JpaRepository<WinningLotto, Long> {

    WinningLotto findFirstByOrderByIdDesc();

    List<WinningLotto> findWinningLottosByOrderByIdDesc(Pageable pageable);

}
