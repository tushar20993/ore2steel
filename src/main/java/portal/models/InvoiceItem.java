package portal.models;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "invoice_item")
public class InvoiceItem {

	@Id
	@GeneratedValue
	@Digits(integer = 3, fraction = 0)
	@Column(name = "invoice_item_id")
	private Integer invoiceItemId;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private Invoice invoice;

	@ManyToOne
	@NotNull
	private Item item;

	@ManyToOne(optional = true)
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

	public Integer getInvoiceItemId() {
		return invoiceItemId;
	}

	public void setInvoiceItemId(Integer invoiceItemId) {
		this.invoiceItemId = invoiceItemId;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
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

}