package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.StateCodes;

public interface StateCodesDao extends JpaRepository<StateCodes, Integer>{

}
