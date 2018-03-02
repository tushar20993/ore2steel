package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import portal.models.constants.GSTRegistrationType;
import portal.models.embeddables.SiteId;


@Entity
public class Site {

	@MapsId("companyId")
	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)
	private Company company;
	
	@EmbeddedId
	private SiteId siteId;
	
	@NotNull
	@Column(name = "site_name")
	private String siteName;
	
	@Column(name = "site_address")
	private String siteAddress;
	
	@NotNull
	@Column(name = "registration_status")
	private String registrationStatus;
	
	@Column(name = "gst_number")
	private String gstNumber;

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public SiteId getSiteId() {
		return siteId;
	}

	public void setSiteId(SiteId siteId) {
		this.siteId = siteId;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getSiteAddress() {
		return siteAddress;
	}

	public void setSiteAddress(String siteAddress) {
		this.siteAddress = siteAddress;
	}

	public String getRegistrationStatus() {
		return registrationStatus;
	}

	public void setRegistrationStatus(String registrationStatus) {
		this.registrationStatus = registrationStatus;
	}

	public String getGstNumber() {
		if(registrationStatus.equals(GSTRegistrationType.REGISTERED)) {
			return gstNumber;
		}
		return "UNREGISTERED";
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber;
	}
	
	
}
