package seb15.roobits.roobit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import seb15.roobits.roobit.entity.Roobit;

import java.util.List;

@Repository
public interface RoobitRepository extends JpaRepository<Roobit, Long> {

    @Query("SELECT p FROM Roobits p ORDER BY p.id DESC")   //전체조회
    List<Roobit> findAllDesc();
}