package portal.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


import portal.models.constants.OrderStatuses;
import portal.models.embeddables.PurchaseOrderId;

@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {

	@EmbeddedId
	private PurchaseOrderId purchaseOrderId;
	
	@NotNull
	@Column
	private Date orderDate;

	
	@OneToMany(mappedBy = "orderItemId.purchaseOrder", cascade = CascadeType.ALL)
	private List<OrderItem> orderItems;
	
	@OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
	private List<Invoice> invoices;
		

	@Column(name = "additional_information")
	private String additionalInformation;
	
	@Column(name = "order_status")
	private String orderStatus;

	@Column(name = "order_status_date")
	private Date orderStatusDate;
	
	
	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public PurchaseOrderId getPurchaseOrderId() {
		return purchaseOrderId;
	}

	public void setPurchaseOrderId(PurchaseOrderId purchaseOrderId) {
		this.purchaseOrderId = purchaseOrderId;
	}
	
	public List<Invoice> getInvoices() {
		return invoices;
	}

	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}

	
	public String getAdditionalInformation() {
		return additionalInformation;
	}

	public void setAdditionalInformation(String additionalInformation) {
		this.additionalInformation = additionalInformation;
	}

	public List<OrderItem> getOrderItems() {
		if(hasItems()) {
			return orderItems;
		}
		return null;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	
	public boolean isDispatched() {
		return OrderStatuses.isDispatched(orderStatus);
	}
	
	public boolean hasItems() {
		if( (orderItems != null) && (orderItems.size() > 0)) {
			return true;
		}
		return false;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Date getOrderStatusDate() {
		return orderStatusDate;
	}

	public void setOrderStatusDate(Date orderStatusDate) {
		this.orderStatusDate = orderStatusDate;
	}
	
	public String getCompanyName() {
		return purchaseOrderId.getCompanyName();
	}
		
	public Site getSite() {
		return getPurchaseOrderId().getSite();
	}
	
	public Integer getSiteId() {
		return getPurchaseOrderId().getSiteId();
	}

	
	
	
}
