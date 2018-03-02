package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

public class SiteId implements Serializable{
	
	private static final long serialVersionUID = -8336365945204319899L;

	@Column(name = "company_id", insertable = false, updatable = false)
	private Integer companyId;
	
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "site_id")
	private Integer siteId;
	
	
	public boolean equals(SiteId obj) {
		if(this == obj) {
			return true;
		}
		
		if(!(obj instanceof SiteId)) {
			return false;
		}
		
		return  (this.getCompanyId().equals(obj.getCompanyId())) && (this.getSiteId().equals(obj.getSiteId()));
		
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}
	
	
	

}
