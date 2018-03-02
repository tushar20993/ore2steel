package portal.models;

import javax.persistence.*;

import portal.models.constants.VehicleType;
import portal.models.embeddables.OrderDispatchId;

@Entity
public class OrderDispatch {

	@EmbeddedId
	private OrderDispatchId orderDispatchId;
	
	@ManyToOne
	@MapsId("purchaseOrderId")
	@JoinColumns({
		@JoinColumn(name = "company_id"),
		@JoinColumn(name = "site_id"),
		@JoinColumn(name = "purcharse_order_number")
	})
	private PurchaseOrder purchaseOrder;
	
	@Column(name = "invoice_number", unique=true)
	private String invoiceNumber;
	
	@Column(name = "transporter_name")
	private String transporterName;
	
	@Column(name = "transporter_number")
	private String transporterNumber;
	
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

	public String getTransporterName() {
		return transporterName;
	}

	public void setTransporterName(String transporterName) {
		this.transporterName = transporterName;
	}

	public String getTransporterNumber() {
		return transporterNumber;
	}

	public void setTransporterNumber(String transporterNumber) {
		this.transporterNumber = transporterNumber;
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
