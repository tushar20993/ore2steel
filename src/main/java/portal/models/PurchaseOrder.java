package portal.models;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import portal.models.constants.OrderStatuses;
import portal.models.embeddables.PurchaseOrderId;

@Entity
@Table(name = "purchase_order")
@JsonIgnoreProperties(allowSetters = true, allowGetters = false, value = {"items"})
public class PurchaseOrder {

	@EmbeddedId
	private PurchaseOrderId purchaseOrderId;
	
	@NotNull
	@Column
	private Date orderDate;

	@OneToMany(mappedBy = "orderItemId.purchaseOrder", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> items;

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
	
	public String getAdditionalInformation() {
		return additionalInformation;
	}

	public void setAdditionalInformation(String additionalInformation) {
		this.additionalInformation = additionalInformation;
	}

		
	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public boolean isDispatched() {
		return OrderStatuses.isDispatched(orderStatus);
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
	
}
