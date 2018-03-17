package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import portal.models.embeddables.InvoiceItemId;

@Entity
@Table(name = "invoice_item")
public class InvoiceItem {

	@EmbeddedId
	private InvoiceItemId invoiceItemId;

	@NotNull
	@Column(name = "quantity")
	private Double quantity;

	@NotNull
	@Column(name = "unit_of_measurement")
	private String unitOfMeasurement;

	@NotNull
	@Column(name = "price")
	private Double price;

	@Column(name = "additional_information")
	private String additionalInformation;

	public InvoiceItemId getInvoiceItemId() {
		return invoiceItemId;
	}

	public void setInvoiceItemId(InvoiceItemId invoiceItemId) {
		this.invoiceItemId = invoiceItemId;
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

	public String getAdditionalInformation() {
		return additionalInformation;
	}

	public void setAdditionalInformation(String additionalInformation) {
		this.additionalInformation = additionalInformation;
	}

}
