package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Brand;

public interface BrandDao extends JpaRepository<Brand, Integer>{

}
