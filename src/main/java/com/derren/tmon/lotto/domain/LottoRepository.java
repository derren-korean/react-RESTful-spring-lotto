package com.derren.tmon.lotto.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.annotation.Resource;
import java.util.List;

@Resource
public interface LottoRepository extends JpaRepository<Lotto, Long> {
    List<Lotto> findTop11ByOrderByIdDesc();
}
