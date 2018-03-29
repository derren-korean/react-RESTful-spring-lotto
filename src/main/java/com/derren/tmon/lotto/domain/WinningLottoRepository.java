package com.derren.tmon.lotto.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource
public interface WinningLottoRepository extends JpaRepository<WinningLotto, Long> {
}
