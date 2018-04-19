package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hsn_code")
public class Hsn {

	@Id
	@Column(name = "hsn_code")
	private Integer hsnCode;

	@Column(name = "description", columnDefinition = "LONGBLOB")
	private String description;

	public Integer getHsnCode() {
		return hsnCode;
	}

	public void setHsnCode(Integer hsnCode) {
		this.hsnCode = hsnCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDesciption(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Hsn [hsnCode=" + hsnCode + ", desciption=" + description + "]";
	}
	
	

}
