
package portal.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import portal.models.constants.GSTRegistrationType;

@JsonIgnoreProperties(allowSetters = true, allowGetters = false, value = { "sites" })
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

	@NotNull
	@Column(name = "company_address")
	private String companyAddress;

	@ManyToOne(optional = false)
	@JoinColumn(name = "state_name", referencedColumnName = "state_name")
	private StateCode stateCode;

	@NotNull
	@Column(name = "pin_code")
	private String pinCode;

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

	@OneToMany(mappedBy = "siteId.company", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
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

	public String getCompanyAddress() {
		return companyAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	public String getContactPerson() {
		return (contactPerson != null ? contactPerson : "");
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactNumber() {
		return (contactNumber != null ? contactNumber : "");
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber.replaceAll("\\s", "");
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
		if (registrationStatus.equals(GSTRegistrationType.REGISTERED)) {
			return (gstNumber == null ? "" : gstNumber);
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

	public StateCode getStateCode() {
		return stateCode;
	}

	public void setStateCode(StateCode stateCode) {
		this.stateCode = stateCode;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public boolean isRegistered() {
		return (registrationStatus != null && registrationStatus.equals(GSTRegistrationType.REGISTERED));
	}

}
