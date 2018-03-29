package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import portal.models.constants.ItemGroups;

@Entity
@Table(name = "item")
public class Item {

	@Id
	@Column(name = "item_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer itemId;

	@Column(name = "item_name")
	private String itemName;

	@Column(name = "hsn_code")
	private String hsnCode;

	@Column(name = "item_group")
	private String itemGroup;

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

	public String getItemGroup() {
		return itemGroup;
	}

	public void setItemGroup(String itemGroup) {
		this.itemGroup = itemGroup;
	}
	
	@PrePersist
	@PreUpdate
	public void prePersistAndUpdate() {
		if(this.itemGroup == null) {
			this.itemGroup = ItemGroups.ITEM;
		}
	}
}