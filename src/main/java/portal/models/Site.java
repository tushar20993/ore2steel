package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import portal.models.constants.GSTRegistrationType;
import portal.models.embeddables.SiteId;


@Entity
@Table(name = "site")
public class Site {

	@EmbeddedId
	private SiteId siteId;
	
	@NotNull
	@Column(name = "site_name")
	private String siteName;
	
	@Column(name = "site_address")
	private String siteAddress;
	

	@Column(name = "contact_person")
	private String contactPerson;
	
	@Column(name = "contact_number")
	private String contactNumber;
	
	@NotNull
	@Column(name = "registration_status")
	private String registrationStatus;
	
	@Column(name = "gst_number")
	private String gstNumber;
	

	public Company getCompany() {
		return getSiteId().getCompany();
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
