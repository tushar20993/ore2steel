package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import portal.models.Site;

@Embeddable
public class PurchaseOrderId implements Serializable {
	

	private static final long serialVersionUID = 1L;

	@JoinColumns({
		@JoinColumn(name = "company_id", insertable = false, updatable = false),
		@JoinColumn(name = "site_id", insertable = false, updatable = false)
		})
	@ManyToOne(cascade = CascadeType.ALL)
	private Site site;
	
	@Column(name = "purchase_order_number", length = 20)
	private String purchaseOrderNumber;

	
	public String getPurchaseOrderNumber() {
		return purchaseOrderNumber;
	}

	public void setPurchaseOrderNumber(String purchaseOrderNumber) {
		this.purchaseOrderNumber = purchaseOrderNumber;
	}

	public Site getSite() {
		return site;
	}

	public void setSite(Site site) {
		this.site = site;
	}
	
	public Integer getSiteId() {
		return site.getSiteId().getSiteId();
	}
	
	public Integer getCompanyId() {
		return getSite().getSiteId().getCompanyId();
	}
	
	public String getCompanyName() {
		return site.getSiteId().getCompanyName();
	}	
}
