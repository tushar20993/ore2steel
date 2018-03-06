package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import portal.models.constants.VehicleType;
import portal.models.embeddables.OrderDispatchId;

@Entity
@Table(name = "order_dispatch")
public class OrderDispatch {

	@EmbeddedId
	private OrderDispatchId orderDispatchId;
	
	@NotNull
	@Column(name = "invoice_number", unique=true)
	private String invoiceNumber;
	
	@ManyToOne
	@JoinColumn(name = "transporter_id", referencedColumnName = "transporter_id")
	private Transporter transporter;
	
	@Column(name = "vehicle_number")
	private String vehicleNumber;
	
	@Column(name = "driver_number")
	private String driverNumber;
	
	@Column(name = "vehicle_type")
	private String vehicleType;

	public OrderDispatchId getOrderDetailsId() {
		return orderDispatchId;
	}

	public void setOrderDetailsId(OrderDispatchId orderDetailsId) {
		this.orderDispatchId = orderDetailsId;
	}

	
	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	

	public OrderDispatchId getOrderDispatchId() {
		return orderDispatchId;
	}

	public void setOrderDispatchId(OrderDispatchId orderDispatchId) {
		this.orderDispatchId = orderDispatchId;
	}

	public Transporter getTransporter() {
		return transporter;
	}

	public void setTransporter(Transporter transporter) {
		this.transporter = transporter;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}

	public String getDriverNumber() {
		return driverNumber;
	}

	public void setDriverNumber(String driverNumber) {
		this.driverNumber = driverNumber;
	}

	public String getVehicleType() {
		if(vehicleType == null) {
			vehicleType = VehicleType.UNKNOWN;
		}
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	
	
	
}
