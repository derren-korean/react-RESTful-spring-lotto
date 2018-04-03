package com.derren.tmon.lotto.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional(readOnly = true)
@Resource
public interface WinningLottoRepository extends JpaRepository<WinningLotto, Long> {

    WinningLotto findFirstByActiveIsTrueOrderByIdDesc();

    List<WinningLotto> findWinningLottosByActiveIsTrueOrderByIdDesc(Pageable pageable);
}
