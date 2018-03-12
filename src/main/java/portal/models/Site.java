package portal.models;

import java.util.List;

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
	
	@NotNull
	@Column(name = "pin_code")
	private String pinCode;
	
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "state_name", referencedColumnName = "state_name")
	private StateCode stateCode;

	@Column(name = "contact_person")
	private String contactPerson;
	
	@Column(name = "contact_number")
	private String contactNumber;
	
	@Column(name = "site_pan")
	private String sitePan;
	
	@NotNull
	@Column(name = "registration_status")
	private String registrationStatus;
	
	@Column(name = "gst_number")
	private String gstNumber;
	
	@OneToMany(mappedBy = "purchaseOrderId.site", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PurchaseOrder> purchaseOrders;
	
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

	public String getSitePan() {
		return sitePan;
	}

	public void setSitePan(String sitePan) {
		this.sitePan = sitePan;
	}

	public String getRegistrationStatus() {
		return registrationStatus;
	}

	public void setRegistrationStatus(String registrationStatus) {
		this.registrationStatus = registrationStatus;
	}

	public String getGstNumber() {
		return gstNumber;
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber.toUpperCase();
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
	
	public String getCompanyName() {
		return siteId.getCompanyName();
	}
	
	public boolean isRegistered() {
		return registrationStatus.equals(GSTRegistrationType.REGISTERED);
	}

	public List<PurchaseOrder> getPurchaseOrders() {
		return purchaseOrders;
	}

	public void setPurchaseOrders(List<PurchaseOrder> purchaseOrders) {
		this.purchaseOrders = purchaseOrders;
	}
	
	
	
}
