package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import portal.models.constants.ItemGroups;

@Entity
@Table(name = "purchase_order_item")
public class OrderItem {

	@Id
	@GeneratedValue
	@Digits(integer = 3, fraction = 0)
	@Column(name = "order_item_id")
	private Integer orderItemId;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private PurchaseOrder purchaseOrder;

	@ManyToOne
	@NotNull
	private Item item;

	@ManyToOne
	private Brand brand;

	@NotNull
	@Column(name = "quantity")
	private Double quantity;

	@NotNull
	@Column(name = "unit_of_measurement")
	private String unitOfMeasurement;

	@NotNull
	@Column(name = "price")
	private Double price;

	@NotNull
	@Column(name = "amount")
	private Double amount;

	@Column(name = "additional_information")
	private String additionalInformation;

	public Integer getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(Integer orderItemId) {
		this.orderItemId = orderItemId;
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

	public String getItemGroup() {
		return item.getItemGroup();
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Brand getBrand() {
		return brand;
	}

	public String getBrandGroup() {
		if (brand != null) {
			return brand.getBrandGroup();
		}
		return null;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public String getUnitOfMeasurement() {
		return unitOfMeasurement;
	}

	public void setUnitOfMeasurement(String unitOfMeasurement) {
		this.unitOfMeasurement = unitOfMeasurement;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getAdditionalInformation() {
		return additionalInformation;
	}

	public void setAdditionalInformation(String additionalInformation) {
		this.additionalInformation = additionalInformation;
	}

	@PrePersist
	@PreUpdate
	public void prePersistAndUpdate() {
		if (this.amount == null) {
			if (this.item.getItemGroup().equals(ItemGroups.ITEM)) {
				this.amount = this.price * this.quantity;
			}
		}
	}

}
