package portal.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Digits;

@Entity
@Table(name = "dispatch_detail")
public class DispatchDetail {

	@Id
	@GeneratedValue
	@Digits(integer = 3, fraction = 0)
	@Column(name = "dispatch_id", updatable = false)
	private Integer dispatchId;

	@OneToOne
	@JoinColumn(name = "invoice_id", referencedColumnName = "invoice_id", updatable = false, insertable = false)
	private Invoice invoice;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "transporter_id", referencedColumnName = "transporter_id", insertable = true)
	private Transporter transporter;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "vehicle_number", referencedColumnName = "vehicle_number", insertable = true)
	private Vehicle vehicle;

	@Column(name = "driver_number")
	private String driverNumber;

	@Column(name = "eway_bill_number")
	private String eWayBillNumber;

	public Integer getDispatchId() {
		return dispatchId;
	}

	public void setDispatchId(Integer dispatchId) {
		this.dispatchId = dispatchId;
	}

	public Transporter getTransporter() {
		return transporter;
	}

	public void setTransporter(Transporter transporter) {
		this.transporter = transporter;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public String getDriverNumber() {
		return driverNumber;
	}

	public void setDriverNumber(String driverNumber) {
		this.driverNumber = driverNumber;
	}

	public String geteWayBillNumber() {
		return eWayBillNumber;
	}

	public void seteWayBillNumber(String eWayBillNumber) {
		this.eWayBillNumber = eWayBillNumber;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}
	
	

}
