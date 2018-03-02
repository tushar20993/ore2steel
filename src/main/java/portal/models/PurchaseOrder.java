package portal.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import portal.models.embeddables.PurchaseOrderId;

@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {

	@EmbeddedId
	private PurchaseOrderId purchaseOrderId;
	
	
	@MapsId("siteId")
	@JoinColumns({
		@JoinColumn(name = "company_id"), 
		@JoinColumn(name = "site_id")
		})
	@ManyToOne
	private Site site;
		
	@NotNull
	@Column
	private Date orderDate;
	
	@OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
	private List<PurchaseOrderStatus> purchaseOrderStatuses;

	
	@OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
	private List<OrderDispatch> orderDispatches;
	
	@Column(name = "comments")
	private String comments;
	
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] file;

	public Site getSite() {
		return site;
	}

	public void setSite(Site site) {
		this.site = site;
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

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
	
	
		
}
