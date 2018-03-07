package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;

import portal.models.PurchaseOrder;

@Embeddable
public class OrderDispatchId implements Serializable{

	private static final long serialVersionUID = 1L;
	
	
	@JoinColumns({
		@JoinColumn(name = "purcharse_order_number", referencedColumnName = "purchase_order_number", insertable = false, updatable = false),
		@JoinColumn(name = "site_id", referencedColumnName = "site_id", insertable = false, updatable = false),
		@JoinColumn(name = "company_id", referencedColumnName = "company_id",  insertable = false, updatable = false)
	})
	@ManyToOne
	private PurchaseOrder purchaseOrder;
	
	@GeneratedValue
	@Column(name = "order_dispatch_id")
	private Integer orderDispatchId;
	
	
	public Integer getOrderDispatchId() {
		return orderDispatchId;
	}

	public void setOrderDispatchId(Integer orderDetailsId) {
		this.orderDispatchId = orderDetailsId;
	}

	public String getPurchaseOrderNumber() {
		return purchaseOrder.getPurchaseOrderId().getPurchaseOrderNumber();
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}
	
	
	
}
