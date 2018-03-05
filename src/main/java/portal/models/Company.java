
package portal.models;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import portal.models.constants.GSTRegistrationType;

@Entity
@Table(name = "company")
public class Company {
	
	@Id
	@GeneratedValue
	@Digits(integer = 3, fraction = 0)
	@Column(name = "company_id", updatable = false)
	private Integer companyId;
	
	@NotNull
	@Column(name = "company_name")
	private String companyName;
	
	@Column(name = "company_alias")
	private String companyAlias;
	
	@NotNull
	@Column(name = "company_address")
	private String companyAddress;
	
	@Column(name = "contact_person")
	private String contactPerson;
	
	@Column(name = "contact_number")
	private String contactNumber;
	
	@NotNull
	@Column(name = "company_pan")
	private String companyPan;
	
	@NotNull
	@Column(name = "registration_status")
	private String registrationStatus;
	
	@Column(name = "gst_number")
	private String gstNumber;

	@OneToMany(mappedBy = "siteId.company", fetch = FetchType.LAZY)
	private List<Site> sites;

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}	
	
	
	
	public String getCompanyAlias() {
		return companyAlias;
	}

	public void setCompanyAlias(String companyAlias) {
		this.companyAlias = companyAlias;
	}

	public String getCompanyAddress() {
		return companyAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getCompanyPan() {
		return companyPan;
	}

	public void setCompanyPan(String companyPan) {
		this.companyPan = companyPan.toUpperCase();
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
		return "";
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber.toUpperCase();
	}

	public List<Site> getSites() {
		return sites;
	}

	public void setSites(List<Site> sites) {
		this.sites = sites;
	}
	
	public boolean equals(Company c) {
		return  c.getCompanyId().equals(this.getCompanyId()) 
				&& 
				c.getCompanyName().equals(this.getCompanyName());
	}

	
	
	
}
