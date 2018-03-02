package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Company;

public interface CompanyDao extends JpaRepository<Company, Integer>{

	
}
