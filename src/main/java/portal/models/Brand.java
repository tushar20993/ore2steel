package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "brand")
public class Brand {

	@Id
	@GeneratedValue
	@Column(name = "brand_id")
	private Integer brandId;

	@Column(name = "brand_name")
	private String brandName;

	@Column(name = "brand_group")
	private String brandGroup;

	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getBrandGroup() {
		return brandGroup;
	}

	public void setBrandGroup(String brandGroup) {
		this.brandGroup = brandGroup;
	}

}
