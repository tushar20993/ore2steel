package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;

import portal.models.Brand;
import portal.models.Item;
import portal.models.PurchaseOrder;

@Embeddable
public class OrderItemId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumns({
		@JoinColumn(name = "company_id", referencedColumnName = "company_id"),
		@JoinColumn(name = "site_id", referencedColumnName = "site_id"),
		@JoinColumn(name = "purchase_order_number", referencedColumnName = "purchase_order_number"),
	})
	private PurchaseOrder purchaseOrder;
	
	@ManyToOne
	@JoinColumn(name = "item_id", referencedColumnName = "item_id")
	private Item item;
	
	@ManyToOne
	@JoinColumn(name = "brand_id", referencedColumnName = "brand_id")
	private Brand brand;

	public String getPurchaseOrderNumber() {
		return purchaseOrder.getPurchaseOrderId().getPurchaseOrderNumber();
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}
}
