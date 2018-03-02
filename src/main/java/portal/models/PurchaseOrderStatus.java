package portal.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import portal.models.embeddables.PurchaseOrderStatusId;

@Entity
@Table(name = "purchase_order_status")
public class PurchaseOrderStatus {
	
	
	
	@EmbeddedId
	private PurchaseOrderStatusId purchaseOrderStatusId;
	
	
	
	@NotNull
	@Column(name = "purchase_order_status_date")
	private Date purchaseOrderStatusDate;



	public PurchaseOrderStatusId getPurchaseOrderStatusId() {
		return purchaseOrderStatusId;
	}



	public void setPurchaseOrderStatusId(PurchaseOrderStatusId purchaseOrderStatusId) {
		this.purchaseOrderStatusId = purchaseOrderStatusId;
	}



	public Date getPurchaseOrderStatusDate() {
		return purchaseOrderStatusDate;
	}



	public void setPurchaseOrderStatusDate(Date purchaseOrderStatusDate) {
		this.purchaseOrderStatusDate = purchaseOrderStatusDate;
	}

	
	
	
}
