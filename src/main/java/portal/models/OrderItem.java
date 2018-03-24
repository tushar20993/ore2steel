package portal.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import portal.models.embeddables.OrderItemId;

@Entity
@Table(name = "order_item")
public class OrderItem {

	@EmbeddedId
	private OrderItemId orderItemId;

	@NotNull
	@Column(name = "quantity")
	private Double quantity;

	@NotNull
	@Column(name = "unit_of_measurement")
	private String unitOfMeasurement;

	@NotNull
	@Column(name = "price")
	private Double price;

	public OrderItemId getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(OrderItemId orderItemId) {
		this.orderItemId = orderItemId;
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

}
