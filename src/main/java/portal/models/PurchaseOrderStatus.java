package portal.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import portal.models.embeddables.PurchaseOrderStatusId;

@Entity
@Table(name = "purchase_order_status")
public class PurchaseOrderStatus {
	
	
	
	@EmbeddedId
	private PurchaseOrderStatusId purchaseOrderStatusId;
	
	@MapsId("purchaseOrderId")
	@JoinColumns({
		@JoinColumn(name = "company_id"),
		@JoinColumn(name = "site_id"),
		@JoinColumn(name = "purchase_order_number")
	})
	@ManyToOne
	private PurchaseOrder purchaseOrder;
	
	@NotNull
	@Column(name = "purchase_order_status_date")
	private Date purchaseOrderStatusDate;

}
