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
	
}
