package portal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import portal.models.Hsn;

public interface HsnDao extends JpaRepository<Hsn, Integer>{

	public List<Hsn> findByHsnCodeStartingWith(Integer startingWith);

	public List<Hsn> findByHsnCodeGreaterThanAndHsnCodeLessThan(int i, int j);
	
	@Query("SELECT h from Hsn h where CONCAT(h.hsnCode, '') LIKE :startingWith%")
	public List<Hsn> findByHsnThatStartsWith(@Param("startingWith") String startingWith);
	
}
