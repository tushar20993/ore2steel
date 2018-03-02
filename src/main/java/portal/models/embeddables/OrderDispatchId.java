package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.GeneratedValue;

@Embeddable
public class OrderDispatchId implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Embedded
	private PurchaseOrderId purchaseOrderId;

	@GeneratedValue
	@Column(name = "order_dispatch_id")
	private Integer orderDispatchId;

	public PurchaseOrderId getPurchaseOrderId() {
		return purchaseOrderId;
	}

	public void setPurchaseOrderId(PurchaseOrderId purchaseOrderId) {
		this.purchaseOrderId = purchaseOrderId;
	}

	public Integer getOrderDispatchId() {
		return orderDispatchId;
	}

	public void setOrderDispatchId(Integer orderDetailsId) {
		this.orderDispatchId = orderDetailsId;
	}
	
	
}
