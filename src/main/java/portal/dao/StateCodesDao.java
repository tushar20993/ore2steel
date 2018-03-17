package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.StateCode;

public interface StateCodesDao extends JpaRepository<StateCode, Integer> {

}
