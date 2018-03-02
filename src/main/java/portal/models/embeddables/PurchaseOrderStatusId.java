package portal.models.embeddables;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class PurchaseOrderStatusId implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private PurchaseOrderId purchaseOrderId;
	
	@NotNull
	@Column(name = "purchase_order_status")
	private String purchaseOrderStatus;

	public PurchaseOrderId getPurchaseOrderId() {
		return purchaseOrderId;
	}

	public void setPurchaseOrderId(PurchaseOrderId purchaseOrderId) {
		this.purchaseOrderId = purchaseOrderId;
	}

	public String getPurchaseOrderStatus() {
		return purchaseOrderStatus;
	}

	public void setPurchaseOrderStatus(String purchaseOrderStatus) {
		this.purchaseOrderStatus = purchaseOrderStatus;
	}
	
	

}
