package portal.models;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "company")
public class Company {
	
	@Id
	@GeneratedValue
	@Digits(integer=3, fraction=0)
	@Column(name = "company_id", updatable = false)
	private Integer companyId;
	
	@NotNull
	@Column(name = "company_name")
	private String companyName;
	
	@NotNull
	@Column(name = "company_pan")
	private String companyPan;

	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
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

	public String getCompanyPan() {
		return companyPan;
	}

	public void setCompanyPan(String companyPan) {
		this.companyPan = companyPan;
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
