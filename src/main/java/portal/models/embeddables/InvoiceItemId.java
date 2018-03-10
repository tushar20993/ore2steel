package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import portal.models.Brand;
import portal.models.Invoice;
import portal.models.Item;

@Embeddable
public class InvoiceItemId implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManyToOne(optional = false)
	@JoinColumn(name = "invoice_number", referencedColumnName = "invoice_number")
	private Invoice invoice;
	
	@OneToOne(optional = false)
	@JoinColumn(name = "item_id", referencedColumnName = "item_id")
	private Item item;
	
	@ManyToOne
	@JoinColumn(name = "brand_id", referencedColumnName = "brand_id")
	private Brand brand;

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
	
	
	
	
}