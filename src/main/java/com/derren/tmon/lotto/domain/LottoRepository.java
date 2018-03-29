package com.derren.tmon.lotto.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.annotation.Resource;

@Resource
public interface LottoRepository extends JpaRepository<Lotto, Long> {
}
