package portal.models.embeddables;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Digits;

import portal.models.Company;

public class SiteId implements Serializable{
	
	private static final long serialVersionUID = -8336365945204319899L;


	@ManyToOne(optional = false, cascade = CascadeType.ALL)
	@JoinColumn(name = "company_id", referencedColumnName = "company_id", nullable = false, insertable = false)
	private Company company;
	
	@GeneratedValue
	@Column(name = "site_id")
	@Digits(integer=3, fraction=0)
	private Integer siteId;
		

	public Integer getSiteId() {
		return siteId;
	}
	
	public Integer getCompanyId() {
		return company.getCompanyId();
	}
	
	public String getCompanyName() {
		return company.getCompanyName();
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
	
	public Company getCompany() {
		return company;
	}

	@Override
	public String toString() {
		return "SiteId [company=" + company.getCompanyId() + ", siteId=" + siteId + "]";
	}
}
