package roobits.roobit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import roobits.roobit.entity.Roobit;

@Repository
public interface RoobitRepository extends JpaRepository<Roobit, Long> {

//    @Query(value = "SELECT c FROM Roobit c WHERE c.roobitId = :roobitId")
//    Optional<Roobit> findByRoobit(long roobitId);

}
