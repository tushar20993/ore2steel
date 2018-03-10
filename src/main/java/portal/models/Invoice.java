package portal.models;


import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "invoice")
public class Invoice {

	@Id
	@Column(name = "invoice_number")
	private String invoiceNumber;
	
	@Column(name = "invoice_date")
	private Date invoiceDate;
	
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
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "transporter_id", referencedColumnName = "transporter_id", insertable = true)
	private Transporter transporter;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "vehicle_number", referencedColumnName = "vehicle_number", insertable = true)
	private Vehicle vehicle;
	
	@Column(name = "driver_number")
	private String driverNumber;
	
	@OneToMany(mappedBy="invoiceItemId.invoice", cascade = CascadeType.ALL)
	private List<InvoiceItem> items;
	
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

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public List<InvoiceItem> getItems() {
		return items;
	}

	public void setItems(List<InvoiceItem> items) {
		this.items = items;
	}

	@PrePersist
	public void prePersist() throws Exception{
		if( (site == null) && (purchaseOrder == null) ) {
			throw new Exception("Invoice needs to have either PO reference, or Site Reference.");
		}
	}
	
}
