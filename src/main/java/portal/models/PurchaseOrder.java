package portal.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import portal.models.embeddables.PurchaseOrderId;

@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {

	@EmbeddedId
	private PurchaseOrderId purchaseOrderId;
	
	@NotNull
	@Column
	private Date orderDate;

	
	@OneToMany(mappedBy = "orderItemId.purchaseOrder", cascade = CascadeType.ALL)
	private List<OrderItem> orderItems;
	
	@OneToMany(mappedBy = "purchaseOrderStatusId.purchaseOrder", cascade = CascadeType.ALL)
	private List<PurchaseOrderStatus> purchaseOrderStatuses;

	
	@OneToMany(mappedBy = "orderDispatchId.purchaseOrder", cascade = CascadeType.ALL)
	private List<OrderDispatch> orderDispatches;
		
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] file;

	@Column(name = "additional_information")
	private String additionalInformation;

	public Site getSite() {
		return getPurchaseOrderId().getSite();
	}
	
	public Integer getSiteId() {
		return getPurchaseOrderId().getSiteId();
	}
	
	public String getCompanyName() {
		return purchaseOrderId.getCompanyName();
	}
	
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
	
	public List<PurchaseOrderStatus> getPurchaseOrderStatuses() {
		return purchaseOrderStatuses;
	}

	public void setPurchaseOrderStatuses(List<PurchaseOrderStatus> purchaseOrderStatuses) {
		this.purchaseOrderStatuses = purchaseOrderStatuses;
	}

	public List<OrderDispatch> getOrderDispatches() {
		return orderDispatches;
	}

	public void setOrderDispatches(List<OrderDispatch> orderDispatches) {
		this.orderDispatches = orderDispatches;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	public String getAdditionalInformation() {
		return additionalInformation;
	}

	public void setAdditionalInformation(String additionalInformation) {
		this.additionalInformation = additionalInformation;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	
	
}
