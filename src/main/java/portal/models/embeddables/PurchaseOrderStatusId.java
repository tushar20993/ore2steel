package portal.models.embeddables;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import portal.models.PurchaseOrder;
import portal.models.constants.OrderStatuses;

import java.io.Serializable;

@Embeddable
public class PurchaseOrderStatusId implements Serializable {
	
	private static final long serialVersionUID = 1L;

	
	@JoinColumns({
		@JoinColumn(name = "company_id", insertable = false, updatable = false),
		@JoinColumn(name = "site_id", insertable = false, updatable = false),
		@JoinColumn(name = "purchase_order_number", insertable = false, updatable = false)
	})
	@ManyToOne
	private PurchaseOrder purchaseOrder;
	
	@NotNull
	@Column(name = "purchase_order_status")
	private String purchaseOrderStatus;

	
	public String getPurchaseOrderStatus() {
		if(OrderStatuses.getPurchaseOrderStatuses().contains(purchaseOrderStatus)) {
			return purchaseOrderStatus;
		}
		return "UNKNOWN";
	}

	public void setPurchaseOrderStatus(String purchaseOrderStatus) {
		this.purchaseOrderStatus = purchaseOrderStatus;
	}
	
	

}
