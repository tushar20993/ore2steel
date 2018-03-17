package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import portal.models.Brand;
import portal.models.Item;
import portal.models.PurchaseOrder;

@Embeddable
public class OrderItemId implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	private PurchaseOrder purchaseOrder;

	@ManyToOne
	private Item item;

	@ManyToOne
	private Brand brand;

	public String getPurchaseOrderNumber() {
		return purchaseOrder.getPurchaseOrderId().getPurchaseOrderNumber();
	}

	public PurchaseOrder getPurchaseOrder() {
		return purchaseOrder;
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
