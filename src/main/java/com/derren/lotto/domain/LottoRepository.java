package com.derren.lotto.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional(readOnly = true)
@Resource
public interface LottoRepository extends JpaRepository<Lotto, Long> {

    List<Lotto> findLottosByActiveIsTrueOrderByIdDesc(Pageable pageable);

    List<Lotto> findAllByActiveIsTrue();

    List<Lotto> findLottosByActiveIsTrueAndIdIsNotInOrderByIdDesc(List<Long> idList, Pageable pageable);
}
