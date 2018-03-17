package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vehicle")
public class Vehicle {

	@Id
	@Column(name = "vehicle_number")
	private String vehicleNumber;

	@Column(name = "vehicle_type")
	private String vehicleType;

	@Column(name = "vehicle_capacity")
	private Double vehicleCapacity;

	public String getVehicleNumber() {
		return vehicleNumber.replaceAll("\\s", "");
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber.replaceAll("\\s", "");
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public Double getVehicleCapacity() {
		return vehicleCapacity;
	}

	public void setVehicleCapacity(Double vehicleCapacity) {
		this.vehicleCapacity = vehicleCapacity;
	}

}
