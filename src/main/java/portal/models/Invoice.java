package portal.models;


import javax.persistence.*;

@Entity
@Table(name = "invoice")
public class Invoice {

	@Id
	@Column(name = "invoice_number")
	private String invoiceNumber;
	
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name = "po_company_id", referencedColumnName = "company_id"),
		@JoinColumn(name = "po_site_id", referencedColumnName = "site_id"),
		@JoinColumn(name = "po_purchase_order_number", referencedColumnName = "purchase_order_number"),
	})
	private PurchaseOrder purchaseOrder;
	
	
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name = "site_site_id", referencedColumnName = "site_id", insertable = false, updatable = false),
		@JoinColumn(name = "site_company_id", referencedColumnName = "company_id",  insertable = false, updatable = false)
	})
	private Site site;
	
	
	@ManyToOne
	@JoinColumn(name = "transporter_id", referencedColumnName = "transporter_id")
	private Transporter transporter;
	
	
	@ManyToOne
	@JoinColumn(name = "vehicle_number", referencedColumnName = "vehicle_number")
	private Vehicle vehicle;
	
	@Column(name = "driver_number")
	private String driverNumber;
	
	
	
	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public PurchaseOrder getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public Site getSite() {
		return site;
	}

	public void setSite(Site site) {
		this.site = site;
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

	@PrePersist
	public void prePersist() throws Exception{
		if( (site == null) && (purchaseOrder == null) ) {
			throw new Exception("Invoice needs to have either PO reference, or Site Reference.");
		}
	}
	
	

}
