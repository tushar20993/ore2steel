package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Vehicle;

public interface VehicleDao extends JpaRepository<Vehicle, String>{

}
