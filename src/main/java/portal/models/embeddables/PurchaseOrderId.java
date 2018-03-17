package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;

import portal.models.Company;
import portal.models.Site;

@Embeddable
public class PurchaseOrderId implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumns({ @JoinColumn(name = "company_id", insertable = false, updatable = false),
			@JoinColumn(name = "site_id", insertable = false, updatable = false) })
	private Site site;

	public PurchaseOrderId(String purchaseOrderNumber, Integer siteId, Integer companyId) {
		Site site = new Site();
		SiteId sitePK = new SiteId();
		Company company = new Company();

		company.setCompanyId(companyId);
		sitePK.setSiteId(siteId);
		sitePK.setCompany(company);
		site.setSiteId(sitePK);

		this.setPurchaseOrderNumber(purchaseOrderNumber);
		this.setSite(site);
	}

	public PurchaseOrderId() {

	}

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

	@Override
	public String toString() {
		return "PurchaseOrderId [site=" + site + ", purchaseOrderNumber=" + purchaseOrderNumber + "]";
	}
	
	
}
