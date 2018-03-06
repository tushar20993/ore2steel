package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
	
	@ManyToOne
	@JoinColumn(name = "vehicle_number", referencedColumnName = "vehicle_number")
	private Vehicle vehicle;
	
	@Column(name = "driver_number")
	private String driverNumber;
	
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

	public String getDriverNumber() {
		return driverNumber;
	}

	public void setDriverNumber(String driverNumber) {
		this.driverNumber = driverNumber;
	}	
}
