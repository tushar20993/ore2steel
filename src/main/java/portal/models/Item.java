package portal.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "item")
public class Item {
	
	@Id
	private Integer itemId;
	
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "hsn_code")
	private String hsnCode;

	@ManyToMany
	@JoinTable(name = "item_brand", joinColumns = @JoinColumn(name = "item_id"), inverseJoinColumns = @JoinColumn(name = "brand_id"))
	private List<Brand> brands;

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getHsnCode() {
		return hsnCode;
	}

	public void setHsnCode(String hsnCode) {
		this.hsnCode = hsnCode;
	}

	public List<Brand> getBrands() {
		return brands;
	}

	public void setBrands(List<Brand> brands) {
		this.brands = brands;
	}
	
	
	

}
