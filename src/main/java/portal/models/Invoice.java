package portal.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import portal.models.constants.InvoiceStatuses;
import portal.models.constants.ItemGroups;

@Entity
@Table(name = "invoice")
@JsonIgnoreProperties(allowSetters = true, allowGetters = false, value = { "items" })
public class Invoice implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "invoice_id")
	private Integer invoiceId;

	@Column(name = "invoice_number")
	private String invoiceNumber;

	@Column(name = "invoice_date")
	private Date invoiceDate;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	private PurchaseOrder purchaseOrder;

	@ManyToOne(fetch = FetchType.LAZY)
	private Site site;

	@OneToOne(cascade = CascadeType.ALL)
	private DispatchDetail dispatchDetail;

	@OneToMany(mappedBy = "invoice", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InvoiceItem> items;

	@Column(name = "invoice_status")
	private String invoiceStatus;

	@Column(name = "invoice_status_date")
	private Date invoiceStatusDate;

	@Column(name = "receipt_number")
	private String receiptNumber;

	@Column(name = "receipt_value")
	private Double receiptValue;

	@Column(name = "comments")
	private String comments;

	public boolean isDelivered() {
		return InvoiceStatuses.isDelivered(invoiceStatus);
	}

	public Integer getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Integer invoiceId) {
		this.invoiceId = invoiceId;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public PurchaseOrder getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public Site getSite() {
		return site;
	}

	public void setSite(Site site) {
		this.site = site;
	}

	public List<InvoiceItem> getItems() {
		return items;
	}

	public void setItems(List<InvoiceItem> items) {
		this.items = items;
	}

	public String getInvoiceStatus() {
		return invoiceStatus;
	}

	public void setInvoiceStatus(String invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	public Date getInvoiceStatusDate() {
		return invoiceStatusDate;
	}

	public void setInvoiceStatusDate(Date invoiceStatusDate) {
		this.invoiceStatusDate = invoiceStatusDate;
	}

	public String getReceiptNumber() {
		return receiptNumber;
	}

	public void setReceiptNumber(String receiptNumber) {
		this.receiptNumber = receiptNumber;
	}

	public Double getReceiptValue() {
		return receiptValue;
	}

	public void setReceiptValue(Double receiptValue) {
		this.receiptValue = receiptValue;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public DispatchDetail getDispatchDetail() {
		return dispatchDetail;
	}

	public void setDispatchDetail(DispatchDetail dispatchDetail) {
		this.dispatchDetail = dispatchDetail;
	}

	@Override
	public String toString() {
		return "Invoice [invoiceId=" + invoiceId + ", invoiceNumber=" + invoiceNumber + ", invoiceDate=" + invoiceDate
				+ ", items=" + items + ", invoiceStatus=" + invoiceStatus + ", invoiceStatusDate=" + invoiceStatusDate
				+ ", receiptNumber=" + receiptNumber + ", receiptValue=" + receiptValue + ", comments=" + comments
				+ "]";
	}

	public Double getInvoiceAmount() {
		Double amount = 0.0D;
		for (InvoiceItem item : this.items) {
			amount += item.getAmount();
		}
		return amount;
	}

	public Double getInvoiceQuantity() {
		Double quantity = 0.0D;
		for (InvoiceItem item : this.items) {
			if (item.getItem().getItemGroup().equals(ItemGroups.ITEM)) {
				quantity += item.getQuantity();
			}
		}
		return quantity;
	}

}
